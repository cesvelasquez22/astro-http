import { Client, db } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Client).values([
    { id: 1, name: "Kasim", age: 28, isActive: true },
    { id: 2, name: "Mina", age: 34, isActive: false },
    { id: 3, name: "Liam", age: 22, isActive: true },
    { id: 4, name: "Sophia", age: 29, isActive: true },
  ]);
}
