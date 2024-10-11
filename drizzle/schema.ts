import {
  sqliteTable,
  AnySQLiteColumn,
  text,
  numeric,
  integer,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const prismaMigrations = sqliteTable("_prisma_migrations", {
  id: text("id").primaryKey().notNull(),
  checksum: text("checksum").notNull(),
  finishedAt: numeric("finished_at"),
  migrationName: text("migration_name").notNull(),
  logs: text("logs"),
  rolledBackAt: numeric("rolled_back_at"),
  startedAt: numeric("started_at")
    .default(sql`(current_timestamp)`)
    .notNull(),
  appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const slektsnavn = sqliteTable("Slektsnavn", {
  indeks: integer("indeks").primaryKey({ autoIncrement: true }).notNull(),
  forstaAar: text("forstaAar"),
  sistaAar: text("sistaAar"),
  finskSlekt: text("finskSlekt"),
  fornamn: text("fornamn"),
  patronym: text("patronym"),
  slektbelaegg: text("slektbelaegg"),
  ort: text("ort"),
  nuvarandeSocken: text("nuvarandeSocken"),
  laen: text("laen"),
  arkivkaella: text("arkivkaella"),
  kaellspecifikation: text("kaellspecifikation"),
  andrekaella: text("andrekaella"),
  uppgiftslaemnare: text("uppgiftslaemnare"),
  kommentarer: text("kommentarer"),
});
