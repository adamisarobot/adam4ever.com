-- Migration number: 0001 	 2026-05-07T10:42:00.000Z

CREATE TABLE IF NOT EXISTS dictionary_entries (
    word TEXT PRIMARY KEY,
    data JSON NOT NULL,
    audio_data TEXT, -- Base64 encoded audio or data URI
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
