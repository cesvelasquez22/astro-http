import { getGreeting } from "./greetings/get-greeting";
import { getPostLikes } from "./posts/get-post-likes";
import { updatePostLikes } from "./posts/update-post-likes";

export const server = {
  getGreeting,
  getPostLikes,
  updatePostLikes,
};
