import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const prerender = false; 

export const GET: APIRoute = async ({url}) => {
    console.log('API Route: GET /api/posts');
    const slug = url.searchParams.get('slug');
    
    // const posts = await getCollection('blog', (post) => post.id === slug || !slug);

    if (slug) {
        const post = await getEntry('blog', slug);
        if (post) {
            return new Response(JSON.stringify(post), {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } else {
            return new Response(JSON.stringify({ error: 'Post not found' }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
    }

    const posts = await getCollection('blog');
    return new Response(JSON.stringify(posts), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
};