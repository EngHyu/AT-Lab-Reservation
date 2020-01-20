import sqlite from 'sqlite3';
import crypto from 'crypto';

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
      status: (err === null) ? "reserve_success" : "reserve_failed"
    })
  );
  db.close();
}

export function getReservation({ st_id }, handler) {
  const sqlite3 = sqlite.verbose();
  const db = new sqlite3.Database('db.db');
  db.get(`
    SELECT st_id, seat_num, start_time, end_time
    FROM   reservation
    WHERE  st_id=(?) AND created=date('now')`,
    st_id.value,
    (err, row) => {
      if (row === undefined) {
        handler({
          status: "select_failed",
          seat_num: st_id.value,
          seat_num: "",
          start_time: {
            hour: "09",
            minute: "00",
          },
          end_time: {
            hour: "09",
            minute: "00",
          },
        })
        return;
      }

      const start_time = row.start_time.split(":");
      const end_time = row.end_time.split(":");
      row.start_time = {
        hour: start_time[0],
        minute: start_time[1]
      }
      row.end_time = {
        hour: end_time[0],
        minute: end_time[1]
      }
      row.status = "select_success";
      handler(row);
    }
  );
  db.close();
}

export function getReservationList(seat_num, handler) {
  const sqlite3 = sqlite.verbose();
  const db = new sqlite3.Database('db.db');
  db.all(`
    SELECT st_id, start_time, end_time
    FROM   reservation
    WHERE  seat_num=(?) AND created=date('now', 'localtime')`,
    [seat_num],
    (err, rows) => {
      handler({ st_list: rows });
    }
  );
  db.close();
}

export function validate(form) {
  const formData = Object.values(form)
    .reduce((arr, ele) => {
      try {
        arr[ele.name] = form[ele.name].value;
      } catch {}
      return arr
    }, {});

  formData.password = encrypt(formData);
  return formData;
}

export function encrypt({ st_id, password }) {
  const hash = crypto.createHmac('sha256', st_id)
    .update(password)
    .digest('hex');
  return hash;
}

function updateDB({ seat_num, start, end, st_id, password }, handler) {
  const sqlite3 = sqlite.verbose();
  const db = new sqlite3.Database('db.db');
  db.run(`
      UPDATE reservation
      SET seat_num=(?), start_time=(?), end_time=(?)
      WHERE st_id=(?) AND password=(?) AND created=date('now', 'localtime');
    `,
    [seat_num, start, end, st_id, password],
    function (err) {
      if (err)
        console.error(err.message);

      handler({
        status: (this.changes === 1) ? "modify_success" : "verify_failed"
      })
    }
  );
  db.close();
}

function deleteDB({ st_id, password }, handler) {
  const sqlite3 = sqlite.verbose();
  const db = new sqlite3.Database('db.db');
  db.run(`
      DELETE FROM reservation
      WHERE st_id=(?) AND password=(?) AND created=date('now', 'localtime');
    `,
    [st_id, password],
    function (err) {
      if (err)
        console.error(err.message);

      handler({
        status: (this.changes === 1) ? "delete_success" : "verify_failed"
      })
    }
  );
  db.close();
}

export function modify(formData, handler) {
  const {
    action
  } = formData;

  if (action === "modify") {
    updateDB(formData, handler);
  } else if (action === "cancel") {
    deleteDB(formData, handler);
  } else {
    console.error("something wrong!");
  }
}