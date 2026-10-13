---
title: How to talk to GitHub with no HTTP client
date: 2026-10-13
description: How a missing piece in Odin's standard library turned into OctOdin — a GitHub REST API client I actually enjoy using.
navigation:
  title: How to talk to GitHub with no HTTP client
  description: How a missing piece in Odin's standard library turned into OctOdin — a GitHub REST API client I actually enjoy using.
tag: Development
ttr: 5 min read
---

## A small recap

I've been spending time with [Odin](https://odin-lang.org/) lately, a language that feels like it was designed by someone who got tired of C's nonsense but refused to give up C's honesty. No hidden allocations, no garbage collector pausing your program to take out the trash, no twenty layers of abstraction between you and the machine.

I like that. I'm a difficult man about these things.

Alongside it, I've been building **[Mimir](https://github.com/rivethorn/mimir)**, a little toolchain to make Odin projects pleasant to manage; `mimir run`, `mimir build`, the basics, done right. And at some point, as these things go, I needed a side project to *use* the toolchain on. Something real enough to expose rough edges, small enough to finish.

A GitHub API client seemed perfect. Every ecosystem has its Octokit. Odin didn't have one.

That should have been a weekend project. It was not a weekend project.

## The gap

Here's the thing nobody tells you when you arrive in Odin-land: **there is no HTTP client in core**. No `net/http`. No TLS stack. The `core:net` package gives you sockets and DNS, and `core:crypto` gives you primitives; but if you want to `GET https://api.github.com`, you are on your own.

My first thought was something along the lines of: *"Alright… where's the challenge?"*

The realistic options were:

1. **Write HTTPS from scratch**: sockets + TLS by hand. Educational, character-building, and completely insane for a side project.
2. **Shell out to** `curl`: pragmatic, ugly, and a process spawn per request. No.
3. **Use** `vendor:curl`: Odin ships bindings to libcurl, which is already on every macOS and Linux machine. HTTPS, redirects, timeouts, all solved by battle-tested C code.

I went with option three. It felt like the high road: own the design, rent the transport.

## The transport

If you've never driven libcurl's "easy" interface from a language with explicit allocators, it's a small adventure. You hand C a function pointer and a `void*`, and C calls you back with chunks of bytes. The catch: Odin's dynamic arrays allocate through `context.allocator`, and inside a `"c"` callback there *is* no context. The fix is a small ritual: stash a copy of the caller's context in the buffer struct, restore it inside the callback:

```odin
write_cb :: proc "c" (ptr: rawptr, size, nmemb: c.size_t, userdata: rawptr) -> c.size_t {
    buf := (^Curl_Buffer)(userdata)
    context = buf.ctx
    ...
}
```

It's five lines of code and it took me an embarrassingly long time to be *sure* about. That's Odin in a nutshell: nothing is magic, so everything is understandable; but you do have to actually understand it.

Once bytes flow, the rest is plumbing with opinions: `Accept: application/vnd.github+json` and the API-version header on every request, `Authorization: Bearer` when a token is present, redirect following, per-request timeouts, and rate-limit headers (`X-RateLimit-Remaining`, `Retry-After`, the lot) parsed off every response. GitHub practically begs you to respect its quotas, so the client makes it hard not to. Every response carries its quota state with it.

## The design

I wanted the library to feel like Odin, not like a Go library wearing an Odin costume. They do tend to look alike.

That meant a few deliberate choices:

- **Every endpoint returns**`(value, Response, Error)`**.** The `Response` stays yours even when decoding fails, so you can always inspect the status, headers, and rate limits. The `Error` is a union: `Transport_Error` for the network, `Api_Error` for the API's own complaints, `Codec_Error` for JSON, with helpers like `is_not_found` and `is_rate_limited` for the branches you actually write.
- **Timestamps are strings.** GitHub returns RFC 3339; parsing them is *your* decision, not the library's tax on every call. This is the kind of restraint I wish more libraries had.
- `Maybe(T)` **+** `omitempty` **turned out to be the perfect PATCH semantics.** This was my favorite discovery. Odin's JSON marshaller omits nil`Maybe `values, so an update struct with all-`Maybe`fields serializes *exactly* the fields you set, including an explicit`false`. No builder pattern, no pointer soup, no "was this field set?" bookkeeping. The language just… had the feature. I tested the round-trip to be sure, and it was one of those moments where the tool earns your trust.
- **Memory is explicit.** Every decoded type has a matching destructor: `destroy_repository`, `destroy_issues`, `destroy_search_users`. Nothing is freed behind your back, and if you back the client with an arena allocator, you can skip the destructors entirely. It reads as boilerplate until the first time you run with a tracking allocator and watch everything balance to zero. Then it reads as craftsmanship.

## The library-ification

The project started life as a binary with the library hiding in `pkgs/`. But Mimir recently grew a `-lib` flag (`mimir new -lib`), so I converted OctOdin into a proper library: sources at the root, `package octodin`, and the demo as a nested example project under `example/`.

That conversion caught real toolchain gaps, by the way. Mimir's project check wants `src/` and `ols.json` in the working directory, so a pure library root isn't directly buildable yet, and neither is `mimir run example` from the root. The example runs from its own directory, and `odin build . -build-mode:obj` type-checks the lib. Eating your own dogfood works: Mimir has a small backlog now.

The example also loads its token from an `.env` file via my [dotenv-odin](https://github.com/rivethorn/dotenv-odin) library; one call at startup, `GITHUB_TOKEN` appears in the environment, missing file silently ignored. Small tools composing with small tools. That's the whole philosophy.

## And so… OctOdin was born

[OctOdin](https://github.com/rivethorn/octodin) covers repositories, issues, pull requests, users, releases (including asset uploads), Actions, search, and the system endpoints; with a generic layer (`do_request`, `get_into`, `send_json`) for everything it doesn't cover yet. The demo hits entirely public endpoints, so it runs with no token at all:

```shell
cd example
mimir run               # repository overview
mimir run -- extended   # issues, search, contents, errors
```

## What using it looks like

Enough about the plumbing. The point of all that restraint is that call sites stay small. A basic fetch is one call, one error branch, and a row of defers:

```odin
import "pkgs:octodin"

client := octodin.client_make(octodin.Config{token = os.get_env("GITHUB_TOKEN", context.temp_allocator)})
defer octodin.client_destroy(&client)

repo, resp, err := octodin.get_repo(&client, "odin-lang", "Odin")
if err != nil {
    msg := octodin.error_message(err)
    defer delete(msg)
    fmt.eprintfln("failed: %s", msg)
    return
}
defer octodin.response_destroy(&resp)
defer octodin.destroy_repository(&repo)

fmt.println(repo.full_name, repo.stargazers_count)
fmt.println("rate:", resp.rate.remaining, "/", resp.rate.limit)
```

That triple `(value, Response, Error)` is the whole library in miniature. The value is yours to destroy, the response is yours to inspect, and the error is a union you can actually branch on instead of string-matching:

```odin
repo, resp, err := octodin.get_repo(&client, owner, name)
if err != nil {
    if octodin.is_not_found(err) {
        fmt.println("no such repo — check the name")
    } else if octodin.is_rate_limited(err) {
        fmt.println("slow down; the quota says so")
    }
    octodin.destroy_error(&err)
    return
}
```

And pagination respects the protocol instead of hiding it. List endpoints take option structs, and the `Link` header comes back parsed, so walking pages is just a loop over `next_page_path`:

```odin
issues, resp, err := octodin.list_repo_issues(
    &client, "odin-lang", "Odin",
    {per_page = 50, state = "open"},
)
// ... use issues, then destroy both ...

// More pages? The next path drops straight back into the generic layer:
for octodin.page_info(resp).has_next {
    next := octodin.next_page_path(&client, resp)
    defer delete(next)
    page, page_resp, page_err := octodin.get_into(&client, next, []octodin.Issue)
    // ... use page, then destroy all three ...
}
```

My favorite one-liner is search, because the query builder keeps GitHub's qualifier syntax readable instead of percent-encoded:

```odin
query := octodin.search_terms({"language:odin", "stars:>100"}, context.temp_allocator)
results, resp, err := octodin.search_repositories(&client, {q = query, per_page = 5})
```

Nothing clever. That's the compliment.

## Epilogue

Like most tools, this one exists because the ecosystem had a hole shaped exactly like my curiosity.

If you're an Odin developer or just curious what deliberate, magic-free API design feels like, I'd love to hear your [suggestions](https://github.com/rivethorn/octodin/issues/new) or [general thoughts](mailto:hassanak813@outlook.com) about OctOdin.

Build slowly, and own your stack.
