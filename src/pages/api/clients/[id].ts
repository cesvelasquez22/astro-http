import type { APIRoute } from "astro";
import { Client, db, eq } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  try {
    const [client] = await db
      .select()
      .from(Client)
      .where(eq(Client.id, Number(params.id)));

    if (!client) {
      return new Response(JSON.stringify({ message: "Client not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    return new Response(JSON.stringify(client), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error retrieving client" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};

export const PATCH: APIRoute = async ({ request, params }) => {
  try {
    const { id, ...body } = await request.json();

    const results = await db
      .update(Client)
      .set(body)
      .where(eq(Client.id, Number(params.id)));
    return new Response(
      JSON.stringify({
        id,
        ...body,
      }),
      {
        status: 200,
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

export const DELETE: APIRoute = async ({ params }) => {
  const result = await db
    .delete(Client)
    .where(eq(Client.id, Number(params.id)));

  console.log(JSON.stringify(result));
  return new Response(null, {
    status: 204,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
