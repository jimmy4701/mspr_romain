-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "country_name" TEXT NOT NULL,
    "province_state" TEXT NOT NULL,
    "iso_code" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "who_region" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PandemicStat" (
    "id" SERIAL NOT NULL,
    "cumulative_cases" INTEGER NOT NULL,
    "daily_new_cases" INTEGER NOT NULL,
    "active_cases" INTEGER NOT NULL,
    "cumulative_deaths" INTEGER NOT NULL,
    "daily_new_deaths" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location_id" INTEGER NOT NULL,
    "source_id" INTEGER NOT NULL,

    CONSTRAINT "PandemicStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disease" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Disease_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Source" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DiseaseToPandemicStat" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_DiseaseToPandemicStat_AB_unique" ON "_DiseaseToPandemicStat"("A", "B");

-- CreateIndex
CREATE INDEX "_DiseaseToPandemicStat_B_index" ON "_DiseaseToPandemicStat"("B");

-- AddForeignKey
ALTER TABLE "PandemicStat" ADD CONSTRAINT "PandemicStat_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PandemicStat" ADD CONSTRAINT "PandemicStat_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiseaseToPandemicStat" ADD CONSTRAINT "_DiseaseToPandemicStat_A_fkey" FOREIGN KEY ("A") REFERENCES "Disease"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiseaseToPandemicStat" ADD CONSTRAINT "_DiseaseToPandemicStat_B_fkey" FOREIGN KEY ("B") REFERENCES "PandemicStat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
