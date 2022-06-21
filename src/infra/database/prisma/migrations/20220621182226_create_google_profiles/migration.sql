-- CreateTable
CREATE TABLE "google_profiles" (
    "user_id" TEXT NOT NULL,
    "google_account_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "google_profiles_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "google_profiles_google_account_id_key" ON "google_profiles"("google_account_id");

-- AddForeignKey
ALTER TABLE "google_profiles" ADD CONSTRAINT "google_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
