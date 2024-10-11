import { Prisma, PrismaClient } from "@prisma/client";

const raw = Bun.file(
  new URL(`${import.meta.url}/../../slektsnavnsbasen-20120726.csv`),
);

const prisma = new PrismaClient();
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
          }) as const satisfies Prisma.SlektsnavnCreateInput,
      )
      .forEach(async (slektsnavn, i) => {
        await prisma.slektsnavn.upsert({
          where: { indeks: slektsnavn.indeks },
          update: { ...slektsnavn },
          create: { ...slektsnavn },
        });
      });
  })
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
