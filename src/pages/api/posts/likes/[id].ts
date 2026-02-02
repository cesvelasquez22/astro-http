import type { APIRoute } from "astro";
import { db, eq, Posts } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ request, params }) => {
  const id = params.id || "";

  const posts = await db.select().from(Posts).where(eq(Posts.id, id));
  if (posts.length === 0) {
    const newPost = {
      id: id,
      title: "Untitled",
      likes: 0,
    };
    return new Response(JSON.stringify(newPost), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const post = posts[0];
  return new Response(JSON.stringify(post), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const PUT: APIRoute = async ({ request, params }) => {
  const id = params.id || "";
  const { likes = 0 } = await request.json();
  const posts = await db.select().from(Posts).where(eq(Posts.id, id));

  if (posts.length === 0) {
    const newPost = {
      id: id,
      title: "Untitled",
      likes: 0,
    };

    await db.insert(Posts).values(newPost);
    posts.push(newPost);
  }
  const post = posts[0];
  post.likes = post.likes + likes;
  await db.update(Posts).set({ likes: post.likes }).where(eq(Posts.id, id));
  return new Response(JSON.stringify(post), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
