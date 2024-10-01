/*
  Warnings:

  - You are about to drop the column `slektbelegg` on the `Slektsnavn` table. All the data in the column will be lost.
  - You are about to drop the column `slutnot` on the `Slektsnavn` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Slektsnavn" (
    "indeks" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "forstaAar" TEXT,
    "sistaAar" TEXT,
    "finskSlekt" TEXT,
    "fornamn" TEXT,
    "patronym" TEXT,
    "slektbelaegg" TEXT,
    "ort" TEXT,
    "nuvarandeSocken" TEXT,
    "laen" TEXT,
    "arkivkaella" TEXT,
    "kaellspecifikation" TEXT,
    "andrekaella" TEXT,
    "uppgiftslaemnare" TEXT,
    "kommentarer" TEXT
);
INSERT INTO "new_Slektsnavn" ("andrekaella", "arkivkaella", "finskSlekt", "fornamn", "forstaAar", "indeks", "kaellspecifikation", "laen", "nuvarandeSocken", "ort", "patronym", "sistaAar", "uppgiftslaemnare") SELECT "andrekaella", "arkivkaella", "finskSlekt", "fornamn", "forstaAar", "indeks", "kaellspecifikation", "laen", "nuvarandeSocken", "ort", "patronym", "sistaAar", "uppgiftslaemnare" FROM "Slektsnavn";
DROP TABLE "Slektsnavn";
ALTER TABLE "new_Slektsnavn" RENAME TO "Slektsnavn";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
