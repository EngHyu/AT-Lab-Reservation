import sqlite from 'sqlite3';

export function init() {
  const sqlite3 = sqlite.verbose();
  const db = new sqlite3.Database('db.db');

  // user table
  db.run(`
    CREATE TABLE user (
      st_id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      count DEFAULT 0,
      created TEXT DEFAULT (datetime('now')),
      modified TEXT DEFAULT (datetime('now'))
    );
  `);

  // trigger tracks user is modified
  db.run(`
    CREATE TRIGGER track_user
      AFTER UPDATE ON
      user
    BEGIN
      UPDATE user SET modified=datetime('now') where st_id=OLD.st_id;
    END;
  `);

  // reservation table
  /* primary면 안 되는데.. 날짜 + 학번이 primary */
  db.run(`
    CREATE TABLE reservation(
      st_id INTEGER,
      seat_num INTEGER NOT NULL,
      start_time TIME,
      end_time TIME,
      password BLOB NOT NULL,
      created TEXT DEFAULT(date('now', 'localtime')),
      modified TEXT DEFAULT(datetime('now', 'localtime')),
      PRIMARY KEY(st_id, created)
    );
  `);

  // trigger tracks reservation is modified
  db.run(`
    CREATE TRIGGER track_reservation
      AFTER UPDATE ON
      reservation
    BEGIN
      UPDATE reservation SET modified=datetime('now') where st_id=OLD.st_id;
    END;
  `);
  db.close();
}

export function getPattern(handler) {
  const sqlite3 = sqlite.verbose();
  const db = new sqlite3.Database('db.db');
  db.all('SELECT st_id FROM user', (err, rows) => {
    rows = rows.map(row => row.st_id);
    rows = rows.join('|');
    handler({ pattern: rows });
  });
  db.close();
}

export function reserve({ st_id, seat_num, start, end, password }) {
  const sqlite3 = sqlite.verbose();
  const db = new sqlite3.Database('db.db');
  db.run(`
    INSERT INTO reservation(
      st_id, seat_num, start_time, end_time, password
    ) VALUES(?, ?, ?, ?, ?);`,
    st_id, seat_num, start, end, password
  );
  db.close();
}