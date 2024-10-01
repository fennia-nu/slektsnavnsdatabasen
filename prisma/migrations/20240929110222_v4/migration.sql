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
    "slektbelegg" TEXT,
    "ort" TEXT,
    "nuvarandeSocken" TEXT,
    "laen" TEXT,
    "arkivkaella" TEXT,
    "kaellspecifikation" TEXT,
    "andrekaella" TEXT,
    "uppgiftslaemnare" TEXT,
    "slutnot" TEXT
);
INSERT INTO "new_Slektsnavn" ("andrekaella", "arkivkaella", "finskSlekt", "fornamn", "forstaAar", "indeks", "kaellspecifikation", "laen", "nuvarandeSocken", "ort", "patronym", "sistaAar", "slektbelegg", "slutnot", "uppgiftslaemnare") SELECT "andrekaella", "arkivkaella", "finskSlekt", "fornamn", "forstaAar", "indeks", "kaellspecifikation", "laen", "nuvarandeSocken", "ort", "patronym", "sistaAar", "slektbelegg", "slutnot", "uppgiftslaemnare" FROM "Slektsnavn";
DROP TABLE "Slektsnavn";
ALTER TABLE "new_Slektsnavn" RENAME TO "Slektsnavn";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
