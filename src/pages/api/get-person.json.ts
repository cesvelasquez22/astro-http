import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
    return new Response(JSON.stringify({ hello: "World" }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
};