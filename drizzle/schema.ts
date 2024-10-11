import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

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
