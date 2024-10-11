import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import * as schema from "./schema";

const raw = Bun.file(
  new URL(`${import.meta.url}/../../slektsnavnsbasen-20120726.csv`),
);

const sqlite = new Database(process.env.DB_FILE_NAME);
const db = drizzle(sqlite, { schema });
const decoder = new TextDecoder("latin1");
raw
  .bytes()
  .then((bytes) => {
    decoder
      .decode(bytes)
      .split("\n")
      .slice(1, -2)
      .map((line) => line.split(";"))
      .map(
        (columns) =>
          ({
            indeks: Number(columns[0]),
            forstaAar: columns[1],
            sistaAar: columns[2],
            finskSlekt: columns[3],
            fornamn: columns[4],
            patronym: columns[5],
            slektbelaegg: columns[6],
            ort: columns[7],
            nuvarandeSocken: columns[8],
            laen: columns[9],
            arkivkaella: columns[10],
            kaellspecifikation: columns[11],
            andrekaella: columns[12],
            uppgiftslaemnare: columns[13],
            kommentarer: columns[14],
          }) as const satisfies typeof schema.slektsnavn.$inferInsert,
      )
      .forEach(
        async (slektsnavn) =>
          await db
            .insert(schema.slektsnavn)
            .values(slektsnavn)
            .onConflictDoUpdate({
              target: schema.slektsnavn.indeks,
              set: slektsnavn,
            }),
      );
  })
  .then(async () => sqlite.close())
  .catch(async (e) => {
    console.error(e);
    sqlite.close();
    process.exit(1);
  });
