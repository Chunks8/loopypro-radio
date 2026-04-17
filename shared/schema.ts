import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tracks = sqliteTable("tracks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  songTitle: text("song_title").notNull(),
  artistName: text("artist_name").notNull(),
  forumMember: text("forum_member").notNull(),
  mediaUrl: text("media_url").notNull(),
  mediaType: text("media_type").notNull(), // soundcloud | youtube | hearthis | other
  threadUrl: text("thread_url").notNull(),
  embedCode: text("embed_code"),
  fetchedAt: text("fetched_at").notNull(),
});

export const insertTrackSchema = createInsertSchema(tracks).omit({ id: true });
export type InsertTrack = z.infer<typeof insertTrackSchema>;
export type Track = typeof tracks.$inferSelect;
