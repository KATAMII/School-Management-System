-- CreateTable
CREATE TABLE "classes_table" (
    "id" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "classTeacher" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "classes_table_pkey" PRIMARY KEY ("id")
);
