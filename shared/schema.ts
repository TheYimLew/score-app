import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define the Team type
export const teamSchema = z.object({
  name: z.string(),
  score: z.number().int().nonnegative()
});

// Define the Game state type
export const gameStateSchema = z.object({
  teams: z.object({
    home: teamSchema,
    away: teamSchema
  }),
  timeInSeconds: z.number().int().nonnegative(),
  timerRunning: z.boolean().optional()
});

export type Team = z.infer<typeof teamSchema>;
export type GameState = z.infer<typeof gameStateSchema>;

// Database schema (in case we decide to add server-side storage later)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
