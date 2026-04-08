-- ═══════════════════════════════════════════════════════════════
-- LAPLAND WORD WALL — SUPABASE SETUP
-- Paste this entire file into Supabase > SQL Editor > New Query
-- ═══════════════════════════════════════════════════════════════

-- 1. WORDS TABLE
CREATE TABLE IF NOT EXISTS lapland_words (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  word TEXT NOT NULL CHECK (char_length(trim(word)) BETWEEN 2 AND 40),
  vote_count INTEGER DEFAULT 0,
  approved BOOLEAN DEFAULT FALSE,
  language TEXT DEFAULT 'unknown',
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS lapland_words_word_unique_idx
ON lapland_words (lower(word));

-- 2. SITE STATS TABLE (for total voter count)
CREATE TABLE IF NOT EXISTS lapland_site_stats (
  id INTEGER PRIMARY KEY DEFAULT 1,
  total_voters INTEGER DEFAULT 0
);

INSERT INTO lapland_site_stats (id, total_voters)
VALUES (1, 0)
ON CONFLICT (id) DO NOTHING;

-- 3. DISABLE ROW LEVEL SECURITY (safe for this public community feature)
ALTER TABLE lapland_words DISABLE ROW LEVEL SECURITY;
ALTER TABLE lapland_site_stats DISABLE ROW LEVEL SECURITY;

-- 4. RPC FUNCTION — safely increment a word's vote count
CREATE OR REPLACE FUNCTION increment_word_vote(word_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE lapland_words
  SET vote_count = vote_count + 1
  WHERE id = word_id AND approved = TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. RPC FUNCTION — increment total voter count
CREATE OR REPLACE FUNCTION increment_voter_count()
RETURNS VOID AS $$
BEGIN
  UPDATE lapland_site_stats
  SET total_voters = total_voters + 1
  WHERE id = 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. SEED WORDS — starter wall so it looks alive from day one
INSERT INTO lapland_words (word, vote_count, approved, language) VALUES
('Magical', 47, true, 'en'),
('Wild', 38, true, 'en'),
('Peaceful', 54, true, 'en'),
('Breathless', 29, true, 'en'),
('Transformed', 18, true, 'en'),
('Alive', 63, true, 'en'),
('Humbled', 22, true, 'en'),
('Infinite', 15, true, 'en'),
('Silent', 41, true, 'en'),
('Free', 71, true, 'en'),
('Wonder', 33, true, 'en'),
('Pure', 28, true, 'en'),
('Present', 19, true, 'en'),
('Raw', 24, true, 'en'),
('Speechless', 44, true, 'en'),
('Grateful', 37, true, 'en'),
('Connected', 16, true, 'en'),
('Tiny', 21, true, 'en'),
('Home', 31, true, 'en'),
('Overwhelmed', 26, true, 'en'),
('Like a child again', 18, true, 'en'),
('Part of something bigger', 14, true, 'en'),
('Completely at peace', 23, true, 'en'),
('Époustouflant', 9, true, 'fr'),
('Magisch', 12, true, 'de'),
('Luminen', 8, true, 'fi'),
('Taianomainen', 7, true, 'fi'),
('Mágico', 11, true, 'es'),
('Unsterblich', 6, true, 'de'),
('Oneiric', 5, true, 'en')
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- DONE. Run the query, then open word-wall-admin.html to manage.
-- Admin password: lapland2026
-- ═══════════════════════════════════════════════════════════════
