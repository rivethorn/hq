import RSS from "rss";

export default defineEventHandler(async (event) => {
  const BASE_URL = "https://rivethorn.is-a.dev";

  const feed = new RSS({
    title: "Rivethorn's HQ",
    description: "Thoughts on programming, systems, and technology.",
    site_url: BASE_URL,
    feed_url: `${BASE_URL}/rss.xml`,
    image_url: `${BASE_URL}/favicon.ico`,
  });

  const posts = await queryCollection(event, "writing")
    .order("date", "DESC")
    .all();

  posts.forEach((post: any) => {
    feed.item({
      title: post.title ?? "-",
      url: `${BASE_URL}${post.path}`,
      date: post.date,
      description: post.description,
    });
  });

  setHeader(event, "content-type", "text/xml");
  return feed.xml({ indent: true });
});
