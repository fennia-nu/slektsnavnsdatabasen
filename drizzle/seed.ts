import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import * as schema from "./schema";

if (import.meta.main) main();

function main() {
  const csv = Bun.file(
    `${import.meta.dir}/../database/slektsnavnsbasen-20120726.csv`,
  );

  const sqlite = new Database(import.meta.env.DB_FILE_NAME);
  const db = drizzle(sqlite, { schema });
  const decoder = new TextDecoder("latin1");
  let totalInserted = 0;

  console.log(`Seeding database with ${csv.name}.`);

  csv
    .bytes()
    .then(async (bytes) => {
      const slektsnavn = decoder
        .decode(bytes)
        .split("\n")
        .slice(1, -2)
        .map((line) => line.split(";"))
        .map((cols) => cols.map((col) => col.trim() || undefined))
        .map(
          (columns) =>
            ({
              indeks: numberOrUndefined(columns[0]),
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
        );

      for (const navn of slektsnavn) {
        await db.insert(schema.slektsnavn).values(navn).onConflictDoUpdate({
          target: schema.slektsnavn.indeks,
          set: navn,
        });
        totalInserted++;
      }
    })
    .then(() => {
      sqlite.close();
      console.log("Seeding successful.");
      console.log(`Inserted ${totalInserted}.`);
    })
    .catch((e) => {
      console.error(e);
      sqlite.close();
      console.log("Seeding failed.");
      process.exit(1);
    });
}

function numberOrUndefined(maybeNumber?: string) {
  const parsed = Number(maybeNumber);
  if (Number.isNaN(parsed)) return undefined;
  return parsed;
}
