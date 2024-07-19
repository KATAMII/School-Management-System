/*
  Warnings:

  - You are about to drop the column `class` on the `teachers_table` table. All the data in the column will be lost.
  - Added the required column `teachersclass` to the `teachers_table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "teachers_table" DROP COLUMN "class",
ADD COLUMN     "teachersclass" TEXT NOT NULL;
