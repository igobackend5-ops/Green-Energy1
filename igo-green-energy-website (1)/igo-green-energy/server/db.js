// SQLite database layer. Plain SQL only, so moving to MySQL/PostgreSQL later means
// replacing this file's `db` helpers (all queries live in index.js / routes below).
import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const DATA_DIR = process.env.DATA_DIR || path.join(here, 'data');
export const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(here, 'uploads');
fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

export const db = new Database(path.join(DATA_DIR, 'greenenergy.db'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
CREATE TABLE IF NOT EXISTS admins (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  email         TEXT NOT NULL UNIQUE,
  name          TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'editor',          -- admin | editor
  password_hash TEXT NOT NULL,
  active        INTEGER NOT NULL DEFAULT 1,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  last_login    TEXT
);
CREATE TABLE IF NOT EXISTS content_docs (
  doc_key     TEXT PRIMARY KEY,
  json        TEXT NOT NULL,
  updated_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_by  TEXT
);
CREATE TABLE IF NOT EXISTS enquiries (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  type        TEXT NOT NULL,                              -- quote | contact | newsletter | callback | career
  name        TEXT,
  email       TEXT,
  phone       TEXT,
  company     TEXT,
  subject     TEXT,
  message     TEXT,
  extra       TEXT,                                       -- JSON (service, capacity, city, ...)
  source      TEXT,                                       -- page the visitor was on
  status      TEXT NOT NULL DEFAULT 'new',                -- new | contacted | qualified | closed | spam
  notes       TEXT,
  ip          TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_enq_created ON enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enq_status  ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enq_type    ON enquiries(type);
CREATE TABLE IF NOT EXISTS uploads (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  filename    TEXT NOT NULL UNIQUE,
  original    TEXT,
  mime        TEXT NOT NULL,
  size        INTEGER NOT NULL,
  uploaded_by TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS activity (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  what       TEXT NOT NULL,
  status     TEXT NOT NULL DEFAULT 'Saved',
  admin      TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`);
