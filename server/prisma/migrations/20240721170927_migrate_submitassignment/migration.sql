-- CreateTable
CREATE TABLE "submitted_assignments_table" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "submitted_assignments_table_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "submitted_assignments_table" ADD CONSTRAINT "submitted_assignments_table_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
