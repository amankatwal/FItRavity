-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Owner', 'Trainer', 'User', 'Fitrainer');

-- CreateEnum
CREATE TYPE "MemberRole" AS ENUM ('Owner', 'Trainer');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'User',
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,
    "activeOrganizationId" TEXT,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "issuer" TEXT,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainerApplication" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" TEXT,
    "dob" TIMESTAMP(3),
    "specialization" TEXT NOT NULL,
    "experience" TEXT,
    "certifications" TEXT[],
    "bio" TEXT NOT NULL,
    "panNumber" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "social" TEXT,
    "profileImage" TEXT NOT NULL,
    "dryRun" BOOLEAN NOT NULL DEFAULT false,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "adminId" TEXT,
    "adminComment" TEXT,
    "dryRunMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrainerApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "metadata" TEXT,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "member" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "MemberRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "dob" TIMESTAMP(3),
    "specialization" TEXT NOT NULL,
    "experience" TEXT,
    "certifications" TEXT[],
    "bio" TEXT NOT NULL,
    "panNumber" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "social" TEXT,
    "profileImage" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invitation" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inviterId" TEXT NOT NULL,

    CONSTRAINT "invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "actualPrice" INTEGER NOT NULL,
    "offerPrice" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "level" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "planLogo" TEXT NOT NULL,
    "shortInfo" TEXT NOT NULL,
    "blogspotAccess" BOOLEAN NOT NULL DEFAULT false,
    "trainingSchedule" BOOLEAN NOT NULL DEFAULT false,
    "progressTracking" BOOLEAN NOT NULL DEFAULT false,
    "chatAccess" BOOLEAN NOT NULL DEFAULT false,
    "dietInstructions" BOOLEAN NOT NULL DEFAULT false,
    "trainingVideos" BOOLEAN NOT NULL DEFAULT false,
    "privateSession" BOOLEAN NOT NULL DEFAULT false,
    "equipment" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "achievements" TEXT[],
    "programType" TEXT NOT NULL,
    "restDays" TEXT NOT NULL,
    "recomendedFor" TEXT NOT NULL,
    "focusArea" TEXT NOT NULL,
    "duration1" TEXT NOT NULL,
    "duration1Info" TEXT NOT NULL,
    "duration2" TEXT NOT NULL,
    "duration2Info" TEXT NOT NULL,
    "duration3" TEXT NOT NULL,
    "duration3Info" TEXT NOT NULL,
    "programStructure" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE EXTENSION IF NOT EXISTS vector;
CREATE TABLE "plan_vector" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "chunkIndex" INTEGER NOT NULL,
    "embedding" vector(1536) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "plan_vector_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "account_issuer_accountId_uidx" ON "account"("issuer", "accountId");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "TrainerApplication_userId_key" ON "TrainerApplication"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TrainerApplication_panNumber_key" ON "TrainerApplication"("panNumber");

-- CreateIndex
CREATE UNIQUE INDEX "organization_logo_key" ON "organization"("logo");

-- CreateIndex
CREATE UNIQUE INDEX "organization_ownerId_key" ON "organization"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "organization_slug_key" ON "organization"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "member_panNumber_key" ON "member"("panNumber");

-- CreateIndex
CREATE INDEX "member_organizationId_idx" ON "member"("organizationId");

-- CreateIndex
CREATE INDEX "member_userId_idx" ON "member"("userId");

-- CreateIndex
CREATE INDEX "invitation_organizationId_idx" ON "invitation"("organizationId");

-- CreateIndex
CREATE INDEX "invitation_email_idx" ON "invitation"("email");

-- CreateIndex
CREATE INDEX "plan_organizationId_idx" ON "plan"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "plan_organizationId_name_key" ON "plan"("organizationId", "name");

-- CreateIndex
CREATE INDEX "plan_vector_planId_idx" ON "plan_vector"("planId");

-- CreateIndex
CREATE UNIQUE INDEX "plan_vector_planId_chunkIndex_key" ON "plan_vector"("planId", "chunkIndex");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerApplication" ADD CONSTRAINT "TrainerApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerApplication" ADD CONSTRAINT "TrainerApplication_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization" ADD CONSTRAINT "organization_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan" ADD CONSTRAINT "plan_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_vector" ADD CONSTRAINT "plan_vector_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
