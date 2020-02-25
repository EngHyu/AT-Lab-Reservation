import sqlite from 'sqlite3'
// import crypto from 'crypto'
import { scheduleJob } from 'node-schedule'

scheduleJob('0 0 * * *', resetReservation)

export function initDB() {
  const sqlite3 = sqlite.verbose()
  const db = new sqlite3.Database('db.db')

  db.serialize(() => {
    db.run(`
      CREATE TABLE user (
        studentID INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        count INTEGER DEFAULT 0
      )
    `)
    db.run(`
      CREATE TABLE seat (
        roomNum INTEGER NOT NULL,
        seatNum INTEGER NOT NULL,
        available INTEGER DEFAULT 0,
        PRIMARY KEY(roomNum, seatNum)
      )
    `)
    db.run(`
      CREATE TABLE reservation(
        studentID INTEGER PRIMARY KEY,
        roomNum INTEGER NOT NULL,
        seatNum INTEGER NOT NULL,
        startTime TIME,
        endTime TIME,
        CONSTRAINT user_fk FOREIGN KEY(studentID) REFERENCES user(studentID),
        CONSTRAINT seat_fk FOREIGN KEY(roomNum, seatNum) REFERENCES seat(roomNum, seatNum),
        UNIQUE(roomNum, seatNum)
      )
    `)
    db.run(`
      CREATE TABLE log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created DATETIME DEFAULT (DATETIME('now', 'localtime')),
        tableName TEXT NOT NULL,
        action TEXT NOT NULL,
        log TEXT NOT NULL
      );
    `)

    db.run(`
      CREATE TRIGGER insertUser
        AFTER INSERT ON
        user
      BEGIN
        INSERT INTO log(tableName, action, log)
        VALUES(
          'user',
          'insert',
          'user=' || NEW.studentID || ', ' ||
          'name=' || NEW.name || ', ' ||
          'count=' || NEW.count
        );
      END;
    `)
    db.run(`
      CREATE TRIGGER updateUser
        AFTER UPDATE ON
        user
      BEGIN
        INSERT INTO log(tableName, action, log)
        VALUES(
          'user',
          'update',
          'user from=' || OLD.studentID || ', ' ||
          'to=' || NEW.studentID || ', ' ||
          'name from=' || OLD.name || ', ' ||
          'to=' || NEW.name || ', ' ||
          'count from=' || OLD.count || ', ' ||
          'to=' || NEW.count
        );
      END;
    `)
    db.run(`
      CREATE TRIGGER deleteUser
        AFTER DELETE ON
        user
      BEGIN
        INSERT INTO log(tableName, action, log)
        VALUES(
          'user',
          'delete',
          'user=' || OLD.studentID || ', ' ||
          'name=' || OLD.name || ', ' ||
          'count=' || OLD.count
        );
      END;
    `)

    db.run(`
      CREATE TRIGGER insertSeat
        AFTER INSERT ON
        seat
      BEGIN
        INSERT INTO log(tableName, action, log)
        VALUES(
          'seat',
          'insert',
          'room number=' || NEW.roomNum || ', ' ||
          'seat number=' || NEW.seatNum || ', ' ||
          'available=' || NEW.available
        );
      END;
    `)
    db.run(`
      CREATE TRIGGER updateSeat
        AFTER UPDATE ON
        seat
      BEGIN
        INSERT INTO log(tableName, action, log)
        VALUES(
          'seat',
          'update',
          'room number from=' || OLD.roomNum || ', ' ||
          'to=' || NEW.roomNum || ', ' ||
          'seat number from=' || OLD.seatNum || ', ' ||
          'to=' || NEW.seatNum || ', ' ||
          'available from=' || OLD.available || ', ' ||
          'to=' || NEW.available
        );
      END;
    `)
    db.run(`
      CREATE TRIGGER deleteSeat
        AFTER DELETE ON
        seat
      BEGIN
        INSERT INTO log(tableName, action, log)
        VALUES(
          'seat',
          'delete',
          'room number=' || OLD.roomNum || ', ' ||
          'seat number=' || OLD.seatNum || ', ' ||
          'available=' || OLD.available
        );
      END;
    `)

    db.run(`
      CREATE TRIGGER insertReservation
        AFTER INSERT ON
        reservation
      BEGIN
        UPDATE user SET count=count+1 where studentID=NEW.studentID;
        UPDATE seat SET available=1 where roomNum=NEW.roomNum AND seatNum=NEW.seatNum;
        INSERT INTO log(tableName, action, log)
        VALUES(
          'reservation',
          'insert',
          'user=' || NEW.studentID || ', ' ||
          'room number=' || NEW.roomNum || ', ' ||
          'seat number=' || NEW.seatNum
        );
      END;
    `)
    db.run(`
      CREATE TRIGGER updateReservation
        AFTER UPDATE ON
        reservation
      BEGIN
        UPDATE seat SET available=1 where roomNum=NEW.roomNum AND seatNum=NEW.seatNum;
        UPDATE seat SET available=0 where roomNum=OLD.roomNum AND seatNum=OLD.seatNum;
        INSERT INTO log(tableName, action, log)
        VALUES(
          'reservation',
          'update',
          'user=' || NEW.studentID || ', ' ||
          'room number from=' || OLD.roomNum || ', ' ||
          'to=' || NEW.roomNum || ', ' ||
          'seat number from=' || OLD.seatNum || ', ' ||
          'to=' || NEW.seatNum
        );
      END;
    `)
    db.run(`
      CREATE TRIGGER deleteReservation
        AFTER DELETE ON
        reservation
      BEGIN
        UPDATE seat SET available=0 where roomNum=OLD.roomNum AND seatNum=OLD.seatNum;
        INSERT INTO log(tableName, action, log)
        VALUES(
          'reservation',
          'delete',
          'user=' || OLD.studentID || ', ' ||
          'room number=' || OLD.roomNum || ', ' ||
          'seat number=' || OLD.seatNum
        );
      END;
    `)

    // insert dummy data
    for (let i=0; i<=1000; i++) {
      db.run(`
        INSERT INTO user(
          studentID, name
        ) VALUES(?, ?)`,
        [20161000+i, `user_${i}`]
      )
    }
    for (let i=1; i<49; i++) {
      db.run(`
        INSERT INTO seat(
          roomNum, seatNum
        ) VALUES(?, ?)`,
        [513, i]
      )
    }
  })
  db.close()
}

function resetReservation() {
  const sqlite3 = sqlite.verbose()
  const db = new sqlite3.Database('db.db')
  db.get('DELETE FROM reservation')
  db.close()
}

export function resetAllTable() {
  const sqlite3 = sqlite.verbose()
  const db = new sqlite3.Database('db.db')
  db.serialize(() => {
    db.get('DELETE FROM reservation')
    db.get('UPDATE user SET count=0')
  })
  db.close()
}

export function getSeat(roomNum, handler) {
  const sqlite3 = sqlite.verbose()
  const db = new sqlite3.Database('db.db')
  db.all(`
    SELECT seatNum, available
    FROM   seat
    WHERE  roomNum=(?)`,
    [roomNum],
    (err, rows) => handler({ seat: rows })
  )
}

export function getPattern(handler) {
  const sqlite3 = sqlite.verbose()
  const db = new sqlite3.Database('db.db')
  db.all('SELECT studentID FROM user', (err, rows) => {
    rows = rows.map(row => row.studentID)
    rows = rows.join('|')
    handler({ pattern: rows })
  })
  db.close()
}

export function reserve({ studentID, roomNum, seatNum, start, end }, handler) {
  const sqlite3 = sqlite.verbose()
  const db = new sqlite3.Database('db.db')

  if (start === undefined) {
    start = ""
    end = ""
  }
  
  db.run(`
    INSERT INTO reservation(
      studentID, roomNum, seatNum, startTime, endTime
    ) VALUES (?, ?, ?, ?, ?)`,
    [studentID, roomNum, seatNum, start, end],
    (err) => {
      const state = {
        type: 'invalid',
      }

      if (!err) {
        state.type = 'valid'
        state.name = 'reserveSuccess'
        getSeat(roomNum, handler)
      }
      
      else if (err.stack.match('studentID')) {
        state.name = 'reserveFailedStudentID'
      }

      else if (err.stack.match('seatNum')) {
        state.name = 'reserveFailedSeatNum'
      }

      else {
        console.error(err)
        return
      }
      
      handler(state)
    }
  )
  db.close()
}

export function getReservation(studentID, handler) {
  const sqlite3 = sqlite.verbose()
  const db = new sqlite3.Database('db.db')
  db.get(`
    SELECT studentID, roomNum, seatNum, startTime, endTime
    FROM   reservation
    WHERE  studentID=(?)`,
    studentID,
    (err, row) => {
      if (row === undefined) {
        row = {
          studentID: '',
          roomNum: '',
          seatNum: '',
          startTime: '',
          endTime: '',
          type: 'invalid',
          name: 'selectFailed',
        }
      }
      else {
        row.type = 'valid'
        row.name = 'selectSuccess'
      }
      handler(row)
    }
  )
  db.close()
}

export function preprocess(form) {
  const formData = Object.values(form)
    .reduce((acc, ele) => {
      if (!["", undefined, form.name].includes(ele.name))
        acc[ele.name] = form[ele.name].value

      return acc
    }, {})

  return formData
}

// function encrypt({ studentID, password }) {
//   const hash = crypto.createHmac('sha256', studentID)
//     .update(password)
//     .digest('hex')
//   return hash
// }

function updateDB({ seatNum, start, end, studentID }, handler) {
  const sqlite3 = sqlite.verbose()
  const db = new sqlite3.Database('db.db')
  db.run(`
      UPDATE reservation
      SET seatNum=(?), startTime=(?), endTime=(?)
      WHERE studentID=(?)
    `,
    [seatNum, start, end, studentID],
    function (err) {
      if (err)
        console.error(err.message)

      else if (this.changes === 1) {
        handler({
          type: 'valid',
          name: 'modifySuccess',
        })
      }

      else {
        handler({
          type: 'invalid',
          name: 'verifyFailed',
        })
      }
    }
  )
  db.close()
}

export function deleteDB({ studentID }, handler, isCancel=false) {
  const sqlite3 = sqlite.verbose()
  const db = new sqlite3.Database('db.db')
  db.run(`
      DELETE FROM reservation
      WHERE studentID=(?)
    `,
    studentID,
    function (err) {
      if (err)
        console.error(err.message)

      else if (this.changes === 1) {
        handler({
          type: 'valid',
          name: 'deleteSuccess',
        })

        if (isCancel === false)
          return

        db.get(`
          UPDATE user SET count=count-1
          WHERE studentID=(?);
        `,
        [studentID],
        function (err) {
          if (err)
            console.error(err)
        })
      }

      else {
        handler({
          type: 'invalid',
          name: 'verifyFailed',
        })
      }
    }
  )
  db.close()
}

export function modify(formData, handler) {
  const {
    action
  } = formData

  if (action === 'modify') {
    updateDB(formData, handler)
  } else if (action === 'cancel') {
    deleteDB(formData, handler, true)
  } else {
    console.error('something wrong!')
  }
}

export function getTable(type, handler) {
  let query = `SELECT * FROM ${type}`
  let order

  if (type === 'user') {
    query += " ORDER BY count DESC"
    order = (rows) => rows.map(
      (row, idx, arr) => {
        if (idx === 0)
          row.id = 1
        else if (arr[idx-1].count === row.count)
          row.id = arr[idx-1].id
        else
          row.id = arr[idx-1].id + 1
        return row
      }
    )
  } else if (type === 'log') {
    query += " ORDER BY id DESC"
    order = (rows) => rows
  } else if (type === 'reservation') {
    order = (rows) => rows.map(
      (row, id)=>({
        id: 1+id,
        ...row,
      })
    )
  } else {
    console.error("type error! type not found")
  }

  const sqlite3 = sqlite.verbose()
  const db = new sqlite3.Database('db.db')
  db.all(
    query,
    (err, rows) => {
      if (err)
        console.error(err)
      
      handler({
        data: order(rows)
      })
    }
  )
  db.close()
}

export function updateTable(type, newValue, row, col) {
  const row_copy = { ...row }
  delete row_copy.id
  delete row_copy[col.dataField]

  let value = `${col.dataField}="${newValue}"`
  if (type === 'user') {
    //
  } else if (type === 'log') {
    console.error("you can't modify log")
  } else if (type === 'reservation') {
    // to change password
  } else {
    console.error("type error! type not found")
  }

  const where = Object.entries(row_copy).map(ele => `${ele[0]}="${ele[1]}"`).join(' and ')
  const query = `UPDATE ${type} SET ${value} WHERE ${where}`

  const sqlite3 = sqlite.verbose()
  const db = new sqlite3.Database('db.db')
  db.run(
    query,
    function (err) {
      if (err)
        console.error(err.message)
    }
  )
  db.close()
}