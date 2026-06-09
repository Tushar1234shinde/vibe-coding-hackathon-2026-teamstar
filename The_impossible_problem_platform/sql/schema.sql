-- PostgreSQL schema for The Impossible Problem Platform

CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL,
    expertise_areas TEXT,
    bio TEXT,
    avatar_url TEXT,
    hashed_password TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS problem (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT,
    geographic_scope TEXT,
    impact_level TEXT,
    existing_solutions TEXT,
    supporting_documents TEXT,
    status TEXT NOT NULL DEFAULT 'intake',
    urgency TEXT NOT NULL DEFAULT 'high',
    stakeholders TEXT,
    success_metrics TEXT,
    ai_summary TEXT,
    owner_id INTEGER REFERENCES "user"(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
