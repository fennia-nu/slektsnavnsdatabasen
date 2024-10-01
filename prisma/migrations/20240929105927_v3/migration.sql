/*
  Warnings:

  - You are about to drop the column `andrekilde` on the `Slektsnavn` table. All the data in the column will be lost.
  - You are about to drop the column `arkivkilde` on the `Slektsnavn` table. All the data in the column will be lost.
  - You are about to drop the column `etternavn` on the `Slektsnavn` table. All the data in the column will be lost.
  - You are about to drop the column `fornavn` on the `Slektsnavn` table. All the data in the column will be lost.
  - You are about to drop the column `forsteAar` on the `Slektsnavn` table. All the data in the column will be lost.
  - You are about to drop the column `fylke` on the `Slektsnavn` table. All the data in the column will be lost.
  - You are about to drop the column `kildespesifikasjon` on the `Slektsnavn` table. All the data in the column will be lost.
  - You are about to drop the column `kommentarer` on the `Slektsnavn` table. All the data in the column will be lost.
  - You are about to drop the column `naavaerendeSokn` on the `Slektsnavn` table. All the data in the column will be lost.
  - You are about to drop the column `opplysningsgiver` on the `Slektsnavn` table. All the data in the column will be lost.
  - You are about to drop the column `sisteAar` on the `Slektsnavn` table. All the data in the column will be lost.
  - You are about to drop the column `tettsted` on the `Slektsnavn` table. All the data in the column will be lost.
  - Added the required column `andrekaella` to the `Slektsnavn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `arkivkaella` to the `Slektsnavn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fornamn` to the `Slektsnavn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forstaAar` to the `Slektsnavn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kaellspecifikation` to the `Slektsnavn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `laen` to the `Slektsnavn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nuvarandeSocken` to the `Slektsnavn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ort` to the `Slektsnavn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patronym` to the `Slektsnavn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sistaAar` to the `Slektsnavn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slutnot` to the `Slektsnavn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uppgiftslaemnare` to the `Slektsnavn` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Slektsnavn" (
    "indeks" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "forstaAar" TEXT NOT NULL,
    "sistaAar" TEXT NOT NULL,
    "finskSlekt" TEXT NOT NULL,
    "fornamn" TEXT NOT NULL,
    "patronym" TEXT NOT NULL,
    "slektbelegg" TEXT NOT NULL,
    "ort" TEXT NOT NULL,
    "nuvarandeSocken" TEXT NOT NULL,
    "laen" TEXT NOT NULL,
    "arkivkaella" TEXT NOT NULL,
    "kaellspecifikation" TEXT NOT NULL,
    "andrekaella" TEXT NOT NULL,
    "uppgiftslaemnare" TEXT NOT NULL,
    "slutnot" TEXT NOT NULL
);
INSERT INTO "new_Slektsnavn" ("finskSlekt", "indeks", "slektbelegg") SELECT "finskSlekt", "indeks", "slektbelegg" FROM "Slektsnavn";
DROP TABLE "Slektsnavn";
ALTER TABLE "new_Slektsnavn" RENAME TO "Slektsnavn";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
