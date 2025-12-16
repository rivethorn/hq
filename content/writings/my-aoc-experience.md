---
title: How Python made me feel like an idiot, and how Rust came to the rescue
tag: Programming Languages
ttr: 7 min read
description: Exploring how two different schools of thought on programming can make a great difference in creating a unique developer experience
date: 2025-11-15
---

## How it started

After a long time, I finally decided to try tackling Advent of Code. It seemed like I've known it forever, but never really taken the time to get close to it, befriend it. Well, better late than never. So I got on and went to create the project, but wait. Which language do I use?

I guess some background info would be nice right about now.  
I started learning programming about four years ago, and I dipped my toe in almost every language and framework I came across; C#, JS and TS, C, C++, Go, Python, Kotlin, Swift, V, Odin, Zig, Rust, Dart, Flutter, React, Vue.JS, Gin, Django, Flask, WinUI, WinRT, Jetpack Compose, SwiftUI, you get the idea.  
I tried way too many things and if you ask me... it was a big mistake, kinda. But that's a topic for another time. Suffice to say, it can easily turn into a "jack of all trades, master of none" situation.  
I've mostly done Flutter development, and I also spent a lot of time with C# on Windows and Go and Python for web dev and little tiny CLIs here and there.

## Python is simple, they said...

So, going in I thought: "I'll use Python to get the language out of the way and just focus on problem solving."  
Well, it didn't last long.

The first few days didn't seem **that** difficult. Sure, there were a few hiccups here and there, but nothing too unmanageable. Of course, I didn't know the \_how_s, I mostly tried to understand the \_what_s, and then search my way through.  
Years of simple mobile and web development with no proper teacher or mentor can do that to you.  
But it's not something to be ashamed of.  
I didn't have proper exposure to the "outside world", and I was learning. I was having fun doing that, until Python did its thing.

I have to say though, this is _my_ problem with Python. It makes _me_ feel like an idiot. From what I’ve seen, people do extraordinary things with the language and its features. Skill issue you said? Yeah, it could be.

My problem came when I tried to write a function, and using my Dart/C# brain I would come up with something along the lines of:

```python [snippet_1.py]
lines: list[str] = read_lines("input.txt")

for line_index in range(0, len(lines)):
    line: str = lines[line_index]

    prefix: str = line[0 : len(line) - 1]
    indexed_prefix = list(enumerate(prefix))

    max_prefix_entry = max(
        indexed_prefix,
        key=lambda entry: entry[1]
    )

    first_index: int = max_prefix_entry[0]

    suffix_start: int = first_index + 1
    suffix: str = line[suffix_start : len(line)]
    indexed_suffix = list(enumerate(suffix))

    max_suffix_entry = max(
        indexed_suffix,
        key=lambda entry: entry[1]
    )

    second_index: int = max_suffix_entry[0] + suffix_start

    first_char: str = line[first_index]
    second_char: str = line[second_index]

    combined_value: str = first_char + second_char
    value: int = int(combined_value)

    total = total + value
```

I mean, it works, but it feels clumsy and heavier than it should.

Well I searched and looked and tried to make it more "correct", more "Pythonic".  
I tried AI, I looked at other people's codes, and I kept seeing these weird soup of characters in a bowl, things like:

```python [snippet_2.py]
lines = read_lines("input.txt")

for line in lines:
    i, _ = max(enumerate(line[:-1]), key=lambda t: t[1])
    j, _ = max(enumerate(line[i + 1:]), key=lambda t: t[1])

    total += int(line[i] + line[j + i + 1])
```

Okay, granted—if I read the function docs, with a bit of staring I can almost see what's going on. And then, just when I thought I could handle what's happening, it struck again:

```python [snippet_3.py]
total += sum(
    int(
        (m := max(enumerate(l[:-1]), key=lambda x: x[1]))[1]
        + max(enumerate(l[m[0] + 1:]), key=lambda x: x[1])[1]
    )
    for l in read_lines("input.txt")
)
```

I mean, it looks cool, sure. But why would you do this to yourself? Even looking at it makes me feel pain in my spine.

This was when I realized:  
I couldn't find a middle-ground version I'm happy with. It's either too Pythonic to the extent it makes me fart under its weight, or it’s too C#-ish, that it would fart itself. That's not gonna cut it for me.

## Rust to the rescue!!

I was familiar with Rust for a rather long time. I just didn't take the time to **actually** get into it. I built a few CLIs with it, tested its waters, and it seemed fine, just not necessary at the time.  
I saw how Rust became "The most-admired programming language" [year after year](https://survey.stackoverflow.co/2024/technology#2-programming-scripting-and-markup-languages).  
I was also a fan of [No Boilerplate](https://www.youtube.com/@NoBoilerplate)'s videos, especially his [Rust Talks](https://www.youtube.com/playlist?list=PLZaoyhMXgBzoM9bfb5pyUOT3zjnaDdSEP), his hype and joy when he talks about Rust is on another level.

So I decided why not? I'll give it a shot. I have nothing better to do.  
And guess what? It made a bit more sense to me. Granted, I already knew about the **Ownership** system and the **Borrow Checker**, so I didn't have to fight in an entirely new battle just to be able to walk.

What I love about Rust, in this case at least, is how it logically **pipes** methods, not passing them around as arguments all the time. so a fairly idiomatic Rust version of our code snippet would look something like this:

```rust [snippet_1.rs]
fn extract_value(line: &str) -> i32 {
    let chars: Vec<char> = line.chars().collect();

    let first_index = chars[..chars.len() - 1]
        .iter()
        .enumerate()
        .max_by_key(|(_, c)| *c)
        .unwrap()
        .0;

    let second = chars[first_index + 1..]
        .iter()
        .max()
        .unwrap();

    let first = chars[first_index];

    format!("{}{}", first, second)
        .parse()
        .unwrap()
}

fn main() {
    let total: i32 = read_lines("input.txt")
        .map(|line| extract_value(&line))
        .sum();

    println!("{total}");
}
```

It may look a lot more intimidating to you than the Python code, well I'm sorry, probably skill issues ;)

And yes, I understand that even comparing these languages may not seem feasible. They're designed for different use cases from the ground up. What seem interesting to me though, is that Python is known to be a "scripting language" among other things, and I was trying to script, but it made it so... maze-like to do "correctly" for lack of a better word.  
Rust didn't do that.  
I mean sure, it takes a longer time to get the basics of the language, it also take more lines of code and an entirely different style of coding to get the same result, but it does NOT leave everything up to me to ruin everything. It tries to help me.

Does it mean I can't ruin the code if I tried? Hell no:

```rust [snippet_2.rs]
fn main() {
    let lines: Vec<String> = read_lines("input.txt").collect();

    let mut total: i32 = 0;

    for line_index in 0..lines.len() {
        let line: &String = &lines[line_index];

        let characters: Vec<char> = line.chars().collect();

        let mut first_max_index: usize = 0;
        let mut first_max_char: char = characters[0];

        let mut i: usize = 0;
        while i < characters.len() - 1 {
            let current_char: char = characters[i];

            if current_char > first_max_char {
                first_max_char = current_char;
                first_max_index = i;
            }

            i = i + 1;
        }

        let mut second_max_index: usize = first_max_index + 1;
        let mut second_max_char: char = characters[second_max_index];

        let mut j: usize = first_max_index + 1;
        while j < characters.len() {
            let current_char: char = characters[j];

            if current_char > second_max_char {
                second_max_char = current_char;
                second_max_index = j;
            }

            j = j + 1;
        }

        let mut combined_string: String = String::new();
        combined_string.push(first_max_char);
        combined_string.push(second_max_char);

        let value: i32 = combined_string.parse::<i32>().unwrap();

        total = total + value;
    }

    println!("{}", total);
}
```

I can do it, but the language and the compiler actively fight me over doing so.

And also yes, you can write a Rust code that's on the other end of the scale:

```rust [snippet_3.rs]
let total: i32 = read_lines("input.txt")
    .map(|line| {
        line.chars()
            .enumerate()
            .fold(None, |best, (i, c)| match best {
                None => Some((i, c)),
                Some((j, d)) if c > d && i + 1 < line.len() => Some((i, c)),
                _ => best,
            })
            .map(|(i, a)| {
                line.chars()
                    .skip(i + 1)
                    .max()
                    .map(|b| format!("{a}{b}").parse::<i32>().unwrap())
                    .unwrap()
            })
            .unwrap()
    })
    .sum();
```

This also looks gibberish to me.  
See? I don't discriminate. I'm nice.

## So, what does it all mean?

Honestly? _Nothing—and everything at the same time._

This isn’t a manifesto against Python, nor is it an attempt to crown Rust as the One True Language™. Languages are tools, and tools interact differently with different brains, backgrounds, and expectations.

Python is incredibly powerful, expressive, and productive—especially in the hands of people who think fluently in its idioms. For me, though, the gap between “works,” “idiomatic,” and “readable” felt uncomfortably wide. I often found myself choosing between code that felt verbose and foreign, or code that felt clever at the cost of clarity.

Rust, despite its steeper learning curve, gave me something I didn’t realize I was missing: constraints that guide instead of surprise. The compiler pushes back, the types tell a story, and the structure nudges me toward code I can reason about weeks later. That trade‑off—more upfront friction for long‑term clarity—is one I’ve learned to appreciate.

So choose your language the way you’d choose a long‑term collaborator. Understand its strengths, accept its flaws, and pay attention to how it shapes your thinking. The best language isn’t the fastest, the trendiest, or the most admired—it’s the one that helps _you_ think clearly and enjoy the work along the way.
