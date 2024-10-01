-- CreateTable
CREATE TABLE "Slektsnavn" (
    "indeks" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "forsteAar" TEXT NOT NULL,
    "sisteAar" TEXT NOT NULL,
    "finskSlekt" TEXT NOT NULL,
    "fornavn" TEXT NOT NULL,
    "etternavn" TEXT NOT NULL,
    "slektbelegg" TEXT NOT NULL,
    "tettsted" TEXT NOT NULL,
    "naavaerendeSokn" TEXT NOT NULL,
    "fylke" TEXT NOT NULL,
    "arkivkilde" TEXT NOT NULL,
    "kildespesifikasjon" TEXT NOT NULL,
    "andreKilde" TEXT NOT NULL,
    "opplysningsgiver" TEXT NOT NULL,
    "kommentarer" TEXT NOT NULL
);
