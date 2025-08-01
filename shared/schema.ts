import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const interns = pgTable("interns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  referralCode: text("referral_code").notNull().unique(),
  totalRaised: integer("total_raised").notNull().default(0),
  referrals: integer("referrals").notNull().default(0),
  donationsCount: integer("donations_count").notNull().default(0),
  rank: integer("rank").notNull().default(0),
  goalPercentage: integer("goal_percentage").notNull().default(0),
  badge: text("badge").notNull().default("Starter"),
  joinedAt: timestamp("joined_at").notNull().default(sql`now()`),
});

export const activities = pgTable("activities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  internId: varchar("intern_id").notNull().references(() => interns.id),
  type: text("type").notNull(), // "donation", "referral", "achievement"
  title: text("title").notNull(),
  description: text("description").notNull(),
  amount: integer("amount"), // for donations
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const achievements = pgTable("achievements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  internId: varchar("intern_id").notNull().references(() => interns.id),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  earned: timestamp("earned").notNull().default(sql`now()`),
});

export const insertInternSchema = createInsertSchema(interns).omit({
  id: true,
  joinedAt: true,
});

export const insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
  createdAt: true,
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
  earned: true,
});

export type InsertIntern = z.infer<typeof insertInternSchema>;
export type Intern = typeof interns.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type Achievement = typeof achievements.$inferSelect;
