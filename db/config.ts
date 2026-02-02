import { column, defineDb, defineTable } from "astro:db";

const Client = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    age: column.number(),
    isActive: column.boolean({ default: true }),
  },
});

const Posts = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    title: column.text(),
    likes: column.number(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    Client,
    Posts,
  },
});
