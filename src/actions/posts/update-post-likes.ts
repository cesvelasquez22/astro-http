import { actions, defineAction } from "astro:actions";
import z from "astro/zod";
import { db, Posts, eq } from "astro:db";

export const updatePostLikes = defineAction({
  accept: "json",
  input: z.object({ postId: z.string(), likes: z.number() }),
  handler: async ({ postId, likes: increment }) => {
    // const posts = await db.select().from(Posts).where(eq(Posts.id, postId));
    const { data, error } = await actions.getPostLikes(postId);

    if (error) {
      console.log(error);
      throw new Error("Something went wrong");
    }

    const { likes, exists } = data;
    if (!exists) {
      const newPost = {
        id: postId,
        title: "Untitled",
        likes: 0,
      };
      await db.insert(Posts).values(newPost);
    }
    await db
      .update(Posts)
      .set({ likes: likes + increment })
      .where(eq(Posts.id, postId));
    return true;
  },
});
