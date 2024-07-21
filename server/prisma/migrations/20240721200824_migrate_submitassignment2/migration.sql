-- DropForeignKey
ALTER TABLE "submitted_assignments_table" DROP CONSTRAINT "submitted_assignments_table_studentId_fkey";

-- AlterTable
ALTER TABLE "submitted_assignments_table" ALTER COLUMN "studentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "submitted_assignments_table" ADD CONSTRAINT "submitted_assignments_table_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students_table"("id") ON DELETE SET NULL ON UPDATE CASCADE;
