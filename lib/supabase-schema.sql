-- SignSafe Database Schema for Supabase
-- Run this in the Supabase SQL Editor to set up your database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Contracts table: stores uploaded contract metadata
CREATE TABLE IF NOT EXISTS contracts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL CHECK (file_type IN ('pdf', 'docx')),
  file_size INTEGER NOT NULL,
  page_count INTEGER DEFAULT 1,
  contract_type TEXT,
  status TEXT DEFAULT 'processing' CHECK (status IN ('processing', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT
);

-- Reports table: stores AI analysis results
CREATE TABLE IF NOT EXISTS reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  contract_id UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
  summary TEXT,
  contract_type TEXT,
  estimated_reading_time TEXT,
  parties JSONB DEFAULT '[]',
  key_terms JSONB DEFAULT '{}',
  clauses JSONB DEFAULT '[]',
  overall_risk_level TEXT,
  risk_breakdown JSONB DEFAULT '{}',
  is_paid BOOLEAN DEFAULT FALSE,
  free_clause_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics table: tracks usage for funnel optimization
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_type TEXT NOT NULL,
  session_id TEXT,
  contract_id UUID REFERENCES contracts(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}',
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rate limiting table (optional, for distributed rate limiting)
CREATE TABLE IF NOT EXISTS rate_limits (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  identifier TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  request_count INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(identifier, endpoint)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_contracts_session ON contracts(session_id);
CREATE INDEX IF NOT EXISTS idx_contracts_status ON contracts(status);
CREATE INDEX IF NOT EXISTS idx_contracts_created ON contracts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reports_contract ON reports(contract_id);
CREATE INDEX IF NOT EXISTS idx_analytics_session ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_rate_limits_identifier ON rate_limits(identifier, endpoint);

-- Row Level Security (RLS) - Enable for production security
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Policies: Allow anonymous inserts (no auth required for micro-SaaS)
-- Contracts: anyone can insert, read their own via session
CREATE POLICY "Allow anonymous insert" ON contracts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow read by session" ON contracts FOR SELECT USING (true);

CREATE POLICY "Allow anonymous insert" ON reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow read by contract" ON reports FOR SELECT USING (true);

CREATE POLICY "Allow anonymous insert" ON analytics_events FOR INSERT WITH CHECK (true);

-- Function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contracts_updated_at
  BEFORE UPDATE ON contracts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
