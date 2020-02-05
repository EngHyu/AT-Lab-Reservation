import sqlite from 'sqlite3'
import crypto from 'crypto'
import { ko as lang } from '../strings'

export function initDB() {
  const sqlite3 = sqlite.verbose()
  const db = new sqlite3.Database('db.db')

  db.serialize(() => {
    // create table user
    db.run(`
      CREATE TABLE user (
        studentID INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        available BOOLEAN DEFAULT 1
      )
    `)

    // insert dummy data into user
    for (let i=0; i<=20000; i++) {
      db.run(`
        INSERT INTO user(
          studentID, name
        ) VALUES(?, ?)`,
        [20161000+i, `user_${i}`]
      )
    }

    // create table seat
    db.run(`
      CREATE TABLE seat (
        roomNum INTEGER NOT NULL,
        seatNum INTEGER NOT NULL,
        available BOOLEAN DEFAULT 1,
        PRIMARY KEY(roomNum, seatNum)
      )
    `)

    // insert dummy data into seat
    for (let i=1; i<49; i++) {
      db.run(`
        INSERT INTO seat(
          roomNum, seatNum
        ) VALUES(?, ?)`,
        [513, i]
      )
    }

    // create table reservation
    db.run(`
      CREATE TABLE reservation(
        studentID INTEGER PRIMARY KEY,
        roomNum INTEGER NOT NULL,
        seatNum INTEGER NOT NULL,
        startTime TIME,
        endTime TIME,
        password BLOB NOT NULL,
        CONSTRAINT user_fk FOREIGN KEY(studentID) REFERENCES user(studentID),
        CONSTRAINT seat_fk FOREIGN KEY(roomNum, seatNum) REFERENCES seat(roomNum, seatNum),
        UNIQUE(roomNum, seatNum)
      )
    `)

    // create trigger controls available
    db.run(`
      CREATE TRIGGER trackInsertReservation
        AFTER INSERT ON
        reservation
      BEGIN
        UPDATE user SET available=0 where studentID=NEW.studentID;
        UPDATE seat SET available=0 where roomNum=NEW.roomNum AND seatNum=NEW.seatNum;
      END;
    `)
    db.run(`
      CREATE TRIGGER trackUpdateReservation
        AFTER UPDATE ON
        reservation
      BEGIN
        UPDATE seat SET available=0 where roomNum=NEW.roomNum AND seatNum=NEW.seatNum;
        UPDATE seat SET available=1 where roomNum=OLD.roomNum AND seatNum=OLD.seatNum;
      END;
    `)
    db.run(`
      CREATE TRIGGER trackDeleteReservation
        AFTER DELETE ON
        reservation
      BEGIN
        UPDATE user SET available=1 where studentID=OLD.studentID;
        UPDATE seat SET available=1 where roomNum=OLD.roomNum AND seatNum=OLD.seatNum;
      END;
    `)
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

export function reserve({ studentID, roomNum, seatNum, start, end, password }, handler) {
  const sqlite3 = sqlite.verbose()
  const db = new sqlite3.Database('db.db')

  if (start === undefined) {
    start = ""
    end = ""
  }
  
  db.run(`
    INSERT INTO reservation(
      studentID, roomNum, seatNum, startTime, endTime, password
    ) VALUES (?, ?, ?, ?, ?, ?)`,
    [studentID, roomNum, seatNum, start, end, password],
    (err) => {
      const state = {
        type: 'invalid',
      }

      if (!err) {
        state.type = 'valid'
        state.name = 'reserveSuccess'
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

export function getReservationList(seatNum, handler) {
  const sqlite3 = sqlite.verbose()
  const db = new sqlite3.Database('db.db')
  db.all(`
    SELECT studentID, startTime, endTime
    FROM   reservation
    WHERE  seatNum=(?)`,
    [seatNum],
    (err, rows) => {
      handler({ studentList: rows })
    }
  )
  db.close()
}

export function preprocess(form) {
  const formData = Object.values(form)
    .reduce((arr, ele) => {
      if (!["", undefined, form.name].includes(ele.name))
        arr[ele.name] = form[ele.name].value

      return arr
    }, {})

  formData.password = encrypt(formData)
  return formData
}

function encrypt({ studentID, password }) {
  const hash = crypto.createHmac('sha256', studentID)
    .update(password)
    .digest('hex')
  return hash
}

function updateDB({ seatNum, start, end, studentID, password }, handler) {
  const sqlite3 = sqlite.verbose()
  const db = new sqlite3.Database('db.db')
  db.run(`
      UPDATE reservation
      SET seatNum=(?), startTime=(?), endTime=(?)
      WHERE studentID=(?) AND password=(?)
    `,
    [seatNum, start, end, studentID, password],
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

export function deleteDB({ studentID, password }, handler) {
  const sqlite3 = sqlite.verbose()
  const db = new sqlite3.Database('db.db')
  db.run(`
      DELETE FROM reservation
      WHERE studentID=(?) AND password=(?)
    `,
    [studentID, password],
    function (err) {
      if (err)
        console.error(err.message)

      else if (this.changes === 1) {
        handler({
          type: 'valid',
          name: 'deleteSuccess',
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
    deleteDB(formData, handler)
  } else {
    console.error('something wrong!')
  }
}