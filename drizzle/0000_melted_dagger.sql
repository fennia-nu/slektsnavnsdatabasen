-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `_prisma_migrations` (
	`id` text PRIMARY KEY NOT NULL,
	`checksum` text NOT NULL,
	`finished_at` numeric,
	`migration_name` text NOT NULL,
	`logs` text,
	`rolled_back_at` numeric,
	`started_at` numeric DEFAULT (current_timestamp) NOT NULL,
	`applied_steps_count` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Slektsnavn` (
	`indeks` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`forstaAar` text,
	`sistaAar` text,
	`finskSlekt` text,
	`fornamn` text,
	`patronym` text,
	`slektbelaegg` text,
	`ort` text,
	`nuvarandeSocken` text,
	`laen` text,
	`arkivkaella` text,
	`kaellspecifikation` text,
	`andrekaella` text,
	`uppgiftslaemnare` text,
	`kommentarer` text
);

*/