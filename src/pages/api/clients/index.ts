import type { APIRoute } from "astro";
import { Client, db } from "astro:db";

export const prerender = false;

export const POST: APIRoute = async ({ request, params }) => {
  try {
    const { id, ...body } = await request.json();

    const { lastInsertRowid } = await db.insert(Client).values(body);
    return new Response(
      JSON.stringify({
        id: `${lastInsertRowid}`,
        ...body,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Invalid JSON body" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
export const GET: APIRoute = async ({ params }) => {
  const users = await db.select().from(Client).all();
  return new Response(JSON.stringify(users), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
