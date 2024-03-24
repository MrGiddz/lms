-- CreateTable
CREATE TABLE "LMSCourse" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "price" REAL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "LMSCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "LMSAttachment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "url" TEXT,
    "courseId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "LMSChapter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "videoUrl" TEXT,
    "position" INTEGER NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "isFree" BOOLEAN NOT NULL DEFAULT false,
    "courseId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "LMSMuxData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chapterId" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "playbackId" TEXT
);

-- CreateTable
CREATE TABLE "LMSUserProgress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "LMSPurchase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "LMSStripeCustomer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "stripeCustomerid" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "LMSCourse_categoryId_idx" ON "LMSCourse"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "LMSCategory_name_key" ON "LMSCategory"("name");

-- CreateIndex
CREATE INDEX "LMSAttachment_courseId_idx" ON "LMSAttachment"("courseId");

-- CreateIndex
CREATE INDEX "LMSChapter_courseId_idx" ON "LMSChapter"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "LMSMuxData_chapterId_key" ON "LMSMuxData"("chapterId");

-- CreateIndex
CREATE INDEX "LMSUserProgress_chapterId_idx" ON "LMSUserProgress"("chapterId");

-- CreateIndex
CREATE UNIQUE INDEX "LMSUserProgress_userId_chapterId_key" ON "LMSUserProgress"("userId", "chapterId");

-- CreateIndex
CREATE INDEX "LMSPurchase_courseId_idx" ON "LMSPurchase"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "LMSPurchase_userId_courseId_key" ON "LMSPurchase"("userId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "LMSStripeCustomer_userId_key" ON "LMSStripeCustomer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LMSStripeCustomer_stripeCustomerid_key" ON "LMSStripeCustomer"("stripeCustomerid");
