-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PUBLISHED', 'HOLD', 'PENDING', 'REMOVED', 'CANCELED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "trim(name)" VARCHAR(30) NOT NULL,
    "trim(email)" VARCHAR(30) NOT NULL,
    "trim(password)" VARCHAR(25) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "image" JSON,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "trim(title)" VARCHAR(100) NOT NULL,
    "trim(content)" VARCHAR(500) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PUBLISHED',
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "trim(content)" VARCHAR(500) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PUBLISHED',
    "authorId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_trim(email)_key" ON "users"("trim(email)");

-- CreateIndex
CREATE INDEX "users_trim(email)_updatedAt_idx" ON "users"("trim(email)", "updatedAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "users_trim(name)_trim(email)_key" ON "users"("trim(name)", "trim(email)");

-- CreateIndex
CREATE INDEX "posts_authorId_updatedAt_idx" ON "posts"("authorId", "updatedAt" DESC);

-- CreateIndex
CREATE INDEX "comments_authorId_postId_updatedAt_idx" ON "comments"("authorId", "postId", "updatedAt" DESC);

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
