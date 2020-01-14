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
  db.run(`
    CREATE TABLE reservation(
      st_id INTEGER NOT NULL,
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

export function reserve({ st_id, seat_num, start, end, password }, handler) {
  const sqlite3 = sqlite.verbose();
  const db = new sqlite3.Database('db.db');
  db.run(`
    INSERT INTO reservation(
      st_id, seat_num, start_time, end_time, password
    ) VALUES(?, ?, ?, ?, ?);`,
    [st_id, seat_num, start, end, password],
    (err) => handler({
      status: (err === null) ? "success" : "failed"
    })
  );
  db.close();
}

export function getReservation({ st_id }, handler) {
  const sqlite3 = sqlite.verbose();
  const db = new sqlite3.Database('db.db');
  db.get(`
    SELECT
    seat_num, start_time, end_time
    FROM reservation
    WHERE st_id=(?) AND created=date('now')`,
    st_id.value,
    (err, row) => handler(row)
  );
  db.close();
}

export function getReservationList({ seat_num }, handler) {
  const sqlite3 = sqlite.verbose();
  const db = new sqlite3.Database('db.db');
  db.all(`
    SELECT
    st_id, start_time, end_time
    FROM reservation
    WHERE seat_num=(?)`,
    [seat_num],
    (err, rows) => {
      console.log(rows);
      rows = rows.map(row => row.st_id);
      rows = rows.join('|');
      handler({ pattern: rows });
    }
  );
  db.close();
}
// To - Do
// -. reservation function test
// 2. decorator
// -. required 등 반응, 그러나 submit redirection 안 되게
// -. 시간 min, max 체크가 안된다
// 5. 탭 자동 넘어가게
// 5-1. 분에서 다 지우면 시로 넘어가게
// -. 메시지? 피드백? 띄우기
// -. focus 시 select
// -. 아이콘 띄우기: react-icons
// -. 비밀번호 표시