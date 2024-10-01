/*
  Warnings:

  - You are about to drop the column `andreKilde` on the `Slektsnavn` table. All the data in the column will be lost.
  - Added the required column `andrekilde` to the `Slektsnavn` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Slektsnavn" (
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
    "andrekilde" TEXT NOT NULL,
    "opplysningsgiver" TEXT NOT NULL,
    "kommentarer" TEXT NOT NULL
);
INSERT INTO "new_Slektsnavn" ("arkivkilde", "etternavn", "finskSlekt", "fornavn", "forsteAar", "fylke", "indeks", "kildespesifikasjon", "kommentarer", "naavaerendeSokn", "opplysningsgiver", "sisteAar", "slektbelegg", "tettsted") SELECT "arkivkilde", "etternavn", "finskSlekt", "fornavn", "forsteAar", "fylke", "indeks", "kildespesifikasjon", "kommentarer", "naavaerendeSokn", "opplysningsgiver", "sisteAar", "slektbelegg", "tettsted" FROM "Slektsnavn";
DROP TABLE "Slektsnavn";
ALTER TABLE "new_Slektsnavn" RENAME TO "Slektsnavn";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
