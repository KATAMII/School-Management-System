/*
  Warnings:

  - You are about to drop the column `class` on the `students_table` table. All the data in the column will be lost.
  - Added the required column `studentclass` to the `students_table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "students_table" DROP COLUMN "class",
ADD COLUMN     "studentclass" TEXT NOT NULL;
