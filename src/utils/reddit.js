/**
 * Fetches a image or video URL from a specified subreddit hot feed.
 * @param {string} subreddit - The name of the subreddit
 * @returns {Promise<string>} A Promise that resolves to a URL
 * @throws {Error} If there is an error.
 */
export async function getHotUrl(subreddit) {
  const redditUrl = `https://www.reddit.com/r/${subreddit}/hot.json`;
  const response = await fetch(redditUrl, {
    headers: {
      "User-Agent": "awwbot:v1.0.0",
    },
  });

  if (!response.ok) {
    const errorText = `Error fetching ${response.url}: ${response.status} ${response.statusText}`;
    throw new Error(errorText);
  }

  const { data } = await response.json();

  const posts = data.children
    .map(({ data: post }) => (
      !post.is_gallery &&
      (post.post_hint === "image" ||
        post.post_hint === "hosted:video") &&
      (post.media?.reddit_video?.fallback_url ??
        post.secure_media?.reddit_video?.fallback_url ??
        post.url)
    ))
    .filter(Boolean);

  const randomIndex = Math.floor(Math.random() * posts.length);
  return posts[randomIndex];
}