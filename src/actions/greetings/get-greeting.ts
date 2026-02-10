import { defineAction } from "astro:actions";
import z from "astro/zod";

export const getGreeting = defineAction({
  input: z.object({
    name: z.string(),
    age: z.number(),
    isActive: z.boolean(),
  }),
  handler: async ({ name, age, isActive }) => {
    console.log(`User Info - Name: ${name}, Age: ${age}, Active: ${isActive}`);
    return `Hello, ${name}!`;
  },
});
