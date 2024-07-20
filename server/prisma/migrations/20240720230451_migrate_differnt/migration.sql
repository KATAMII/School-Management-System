/*
  Warnings:

  - You are about to drop the `anouncements_table` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "students_table" ADD COLUMN     "teacherId" TEXT;

-- DropTable
DROP TABLE "anouncements_table";

-- CreateTable
CREATE TABLE "grades_table" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "marks" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "grades_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "announcements_table" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "announcements_table_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "students_table" ADD CONSTRAINT "students_table_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers_table"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades_table" ADD CONSTRAINT "grades_table_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades_table" ADD CONSTRAINT "grades_table_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
