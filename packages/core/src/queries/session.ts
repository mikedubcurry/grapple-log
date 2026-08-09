import { getDb } from "../db";
import { v4 as uuidv4 } from 'uuid';

export interface Session {
  id: string;
  user_id: string;
  art: 'bjj' | 'muay_thai' | 'capoeira';
  duration_minutes: number;
  rounds: number;
  body_state: 1 | 2 | 3 | 4 | 5;
  notes: string | null;
  session_date: string;
  created_at: string;
}

export type CreateSessionInput = Omit<Session, 'id' | 'created_at'>;
export type UpdateSessionInput = Partial<Omit<Session, 'id' | 'user_id' | 'created_at'>>;

export async function listSessions(userId: string): Promise<Session[]> {
  const db = await getDb();
  const [rows] = await db.execute(
    'SELECT * FROM sessions WHERE user_id = ? ORDER BY session_date DESC',
    [userId]
  );
  return rows as Session[];
}

export async function getSession(id: string, userId: string): Promise<Session | null> {
  const db = await getDb();
  const [rows] = await db.execute(
    'SELECT * FROM sessions WHERE id = ? AND user_id = ?',
    [id, userId]
  );
  const sessions = rows as Session[];
  return sessions[0] ?? null;
}

export async function createSession(input: CreateSessionInput): Promise<Session> {
  const db = await getDb();
  const id = uuidv4();
  await db.execute(
    `INSERT INTO sessions (id, user_id, art, duration_minutes, rounds, body_state, notes, session_date)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, input.user_id, input.art, input.duration_minutes, input.rounds, input.body_state, input.notes ?? null, input.session_date]
  );
  return (await getSession(id, input.user_id))!;
}

export async function updateSession(id: string, userId: string, input: UpdateSessionInput): Promise<Session | null> {
  const db = await getDb();
  const fields = Object.keys(input) as (keyof UpdateSessionInput)[];
  if (fields.length === 0) return getSession(id, userId);

  const setClauses = fields.map(f => `${f} = ?`).join(', ');
  const values = fields.map(f => input[f]);

  await db.execute(
    `UPDATE sessions SET ${setClauses} WHERE id = ? AND user_id = ?`,
    [...values, id, userId]
  );
  return getSession(id, userId);
}

export async function deleteSession(id: string, userId: string): Promise<void> {
  const db = await getDb();
  await db.execute(
    'DELETE FROM sessions WHERE id = ? AND user_id = ?',
    [id, userId]
  );
}
