import { date, pgTable, integer, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	email: text('email').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	role: text('role').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull(),
	lastLogin: timestamp('last_login', { withTimezone: true, mode: 'date' }).notNull()
});

// Setup table for OIDC connection information, add field to users

export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const settings = pgTable('settings', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	lastModifiedBy: text('last_modified_by')
		.notNull()
		.references(() => users.id),
	lastModified: timestamp('last_modified', { withTimezone: true, mode: 'date' }).notNull()
});

export const categories = pgTable('categories', {
	id: text('id').primaryKey(),
	type: text('category'),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const userCategories = pgTable('user_categories', {
	id: text('id').primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => users.id),
	category: text('category')
		.notNull()
		.references(() => categories.id),
	name: text('name'),
	ratingLimit: integer('rating_limit'),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const entries = pgTable('entries', {
	id: text('id').primaryKey(),
	userCategoryId: text('user_category_id')
		.notNull()
		.references(() => userCategories.id),
	name: text('name'),
	length: integer('length'),
	completed: boolean('completed'),
	rating: integer('rating'),
	startDate: date('start_date'),
	endDate: date('end_date'),
	autoComplete: boolean('auto_complete'),
	imageId: text('image_id').references(() => images.id)
});

export const progress = pgTable('progress', {
	id: text('id').primaryKey(),
	entryId: text('entry_id')
		.notNull()
		.references(() => entries.id),
	progress: integer('progress').notNull(),
	date: date('date')
});

export const tiers = pgTable('tiers', {
	id: text('id').primaryKey(),
	userCategoryId: text('user_category_id')
		.notNull()
		.references(() => userCategories.id),
	name: text('name').notNull(),
	maximum: integer('maximum'),
	minimum: integer('minimum')
});

export const images = pgTable('images', {
	id: text('id').primaryKey(),
	name: text('name'),
	width: integer('width'),
	height: integer('height'),
	altText: text('alt_text')
});

export const usersRelations = relations(users, ({ many, one }) => ({
	userCategories: many(userCategories),
	session: one(sessions)
}));

export const settingsRelations = relations(settings, ({ one }) => ({
	users: one(users)
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
	userCategories: many(userCategories)
}));

export const userCategoriesRelations = relations(userCategories, ({ many, one }) => ({
	entries: many(entries),
	tiers: many(tiers),
	user: one(users),
	category: one(categories)
}));

export const entriesRelations = relations(entries, ({ many, one }) => ({
	progress: many(progress),
	image: one(images),
	userCategory: one(userCategories)
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users)
}));

export const tiersRelations = relations(tiers, ({ one }) => ({
	userCategory: one(userCategories)
}));

export const imagesRelations = relations(images, ({ one }) => ({
	entry: one(entries)
}));

export const progressRelations = relations(progress, ({ one }) => ({
	entry: one(entries)
}));

export type Session = typeof sessions.$inferSelect;
export type User = typeof users.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type UserCategory = typeof userCategories.$inferSelect;
export type Entry = typeof entries.$inferSelect;
export type Progress = typeof progress.$inferSelect;
export type Tier = typeof tiers.$inferSelect;
export type Image = typeof images.$inferSelect;
