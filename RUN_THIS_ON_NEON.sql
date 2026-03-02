-- ========================================
-- RUN THIS ON YOUR NEON DATABASE
-- ========================================
-- This adds the platformUrl column to the Settings table
-- Run this in your Neon SQL Editor to fix the registration error
-- ========================================

-- Add platformUrl column if it doesn't exist
ALTER TABLE "Settings" ADD COLUMN IF NOT EXISTS "platformUrl" TEXT NOT NULL DEFAULT '';

-- Verify the column was added
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'Settings' AND column_name = 'platformUrl';

-- Expected output:
-- column_name | data_type | is_nullable | column_default
-- platformUrl | text      | NO          | ''::text
