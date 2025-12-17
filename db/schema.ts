import { pgTable, text, uuid, boolean } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";

export const blogTable = pgTable("blog", {
  id: uuid().defaultRandom().primaryKey(),
  author: text().notNull(),
  title: text().notNull(),
  content: text().notNull(),
  url: text().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  //done: boolean().default(false).notNull(),
});

export const usersTable = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  email: text().notNull().unique(),
  password: text().notNull(),
});
