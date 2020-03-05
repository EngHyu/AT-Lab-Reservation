/* eslint-disable no-undef */
import sqlite from 'sqlite3'
const dbPath = [__static, 'db.db'].join('/')

// 테스트 용도로 사용하거나, 초기 db 만들 때 사용합니다.
export function initDB() {
  const sqlite3 = sqlite.verbose()
  const db = new sqlite3.Database(dbPath)

  db.serialize(() => {
    /*
    studentID: 학번
    name: 이름
    count: 예약 횟수 (다음 학기 고정 좌석 배치 시 사용)
    available: 하루에 여러 번 예약해도 카운트는 1만 오르도록. 매일 1로 초기화
    이름이 공백인지 확인합니다.
    */
    db.run(`
      CREATE TABLE user (
        studentID INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        count INTEGER DEFAULT 0,
        available BOOL DEFAULT 1
        CHECK(name <> '')
      );
    `)
    /*
    roomNum: 실습실 번호
    seatNum: 좌석 번호
    type: 좌석 타입 (0: 일반석 & 1인석, 1: 모니터석, 2: 신티크, 3: 공용 공간 (예약 필요 없음))
    reservable: 좌석 상태 (0: 예약 가능, 1: 예약 중, 2: 고장)

    left: px 하드코딩
    top: px 하드코딩
    isVertical: 가로 세로 길쭉 방향
    isDouble: 일인석 여부 확인
    info: 기기 사양
    */
    db.run(`
      CREATE TABLE seat (
        roomNum INTEGER NOT NULL,
        seatNum INTEGER NOT NULL,
        type INTEGER DEFAULT 0,
        reservable INTEGER DEFAULT 0,

        left INTEGER DEFAULT 0,
        top INTEGER DEFAULT 0,
        isVertical INTEGER DEFAULT 0,
        isDouble INTEGER DEFAULT 0,
        info TEXT DEFAULT '',
        
        PRIMARY KEY(roomNum, seatNum, type)
      );
    `)
    /*
    studentID: 학번
    roomNum: 실습실 번호
    seatNum: 좌석 번호
    type: 좌석 타입
    studentID와 seatNum, roomNum이 외래키임을 표시
    roomNum & seatNum & type이 유일해야 합니다.
    좌석 번호가 공백인지 확인합니다.
    */
    db.run(`
      CREATE TABLE reservation(
        studentID INTEGER PRIMARY KEY,
        roomNum INTEGER NOT NULL,
        seatNum INTEGER NOT NULL,
        type INTEGER NOT NULL,
        CONSTRAINT user_fk FOREIGN KEY(studentID) REFERENCES user(studentID),
        CONSTRAINT seat_fk FOREIGN KEY(roomNum, seatNum, type) REFERENCES seat(roomNum, seatNum, type),
        UNIQUE(roomNum, seatNum, type),
        CHECK(seatNum <> '')
      );
    `)
    /*
    id: 실행 번호 (몇 번째로 실행된 명령인지)
    created: 실행 시점
    tableName: 조작된 테이블 이름
    action: 행동
    log: 구체적인 내용
    */
    db.run(`
      CREATE TABLE log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created DATETIME DEFAULT (DATETIME('now', 'localtime')),
        tableName TEXT NOT NULL,
        action TEXT NOT NULL,
        log TEXT NOT NULL
      );
    `)
    /*
    사용자가 추가될 때 로그가 자동으로 추가됩니다.
    */
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
    /*
    사용자가 수정될 때 로그가 자동으로 추가됩니다.
    */
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
    /*
    사용자가 삭제될 때 로그가 자동으로 추가됩니다.
    */
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
    /*
    좌석이 추가될 때 로그가 자동으로 추가됩니다.
    */
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
          'type=' || NEW.type || ', ' ||
          'reservable=' || NEW.reservable || ', ' ||
          'left=' || NEW.left || ', ' ||
          'top=' || NEW.top || ', ' ||
          'isVertical=' || NEW.isVertical || ', ' ||
          'isDouble=' || NEW.isDouble || ', ' ||
          'info=' || NEW.info
        );
      END;
    `)
    /*
    좌석이 수정될 때 로그가 자동으로 추가됩니다.
    */
    db.run(`
      CREATE TRIGGER updateSeat
        AFTER UPDATE ON
        seat
      BEGIN
        INSERT INTO log(tableName, action, log)
        VALUES(
          'seat',
          'update',
          'room number from=' || OLD.roomNum || ', ' || 'to=' || NEW.roomNum || ', ' ||
          'seat number from=' || OLD.seatNum || ', ' || 'to=' || NEW.seatNum || ', ' ||
          'type from=' || OLD.type || ', ' || 'to=' || NEW.type || ', ' ||
          'reservable from=' || OLD.reservable || ', ' || 'to=' || NEW.reservable || ', ' ||
          'left from=' || OLD.left || ', ' || 'to=' || NEW.left || ', ' ||
          'top from=' || OLD.top || ', ' || 'to=' || NEW.top || ', ' ||
          'isVertical from=' || OLD.isVertical || ', ' || 'to=' || NEW.isVertical || ', ' ||
          'isDouble from=' || OLD.isDouble || ', ' || 'to=' || NEW.isDouble || ', ' ||
          'info from=' || OLD.info || ', ' || 'to=' || NEW.info
        );
      END;
    `)
    /*
    좌석이 삭제될 때 로그가 자동으로 추가됩니다.
    */
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
          'type=' || OLD.type || ', ' ||
          'reservable=' || OLD.reservable || ', ' ||
          'left=' || OLD.left || ', ' ||
          'top=' || OLD.top || ', ' ||
          'isVertical=' || OLD.isVertical || ', ' ||
          'isDouble=' || OLD.isDouble || ', ' ||
          'info=' || OLD.info
        );
      END;
    `)
    /*
    예약 정보가 추가될 때
    사용자 예약 횟수가 가능한 만큼(available 값만큼) 오르고, available을 0으로 설정합니다.
    좌석 타입을 1(=reserved)로 바꿉니다.
    로그가 자동으로 추가됩니다.
    */
    db.run(`
      CREATE TRIGGER insertReservation
        AFTER INSERT ON
        reservation
      BEGIN
        UPDATE user SET count=count+available, available=0 where studentID=NEW.studentID;
        UPDATE seat SET reservable=1 where roomNum=NEW.roomNum AND seatNum=NEW.seatNum AND type=NEW.type;
        INSERT INTO log(tableName, action, log)
        VALUES(
          'reservation',
          'insert',
          'user=' || NEW.studentID || ', ' ||
          'room number=' || NEW.roomNum || ', ' ||
          'seat number=' || NEW.seatNum ||
          'type=' || NEW.type
        );
      END;
    `)
    /*
    예약 정보가 삭제될 때
    좌석을 reservable로 바꿉니다.
    로그를 추가합니다.
    */
    db.run(`
      CREATE TRIGGER deleteReservation
        AFTER DELETE ON
        reservation
      BEGIN
        UPDATE seat SET reservable=0 where roomNum=OLD.roomNum AND seatNum=OLD.seatNum AND type=OLD.type;
        INSERT INTO log(tableName, action, log)
        VALUES(
          'reservation',
          'delete',
          'user=' || OLD.studentID || ', ' ||
          'room number=' || OLD.roomNum || ', ' ||
          'seat number=' || OLD.seatNum ||
          'type=' || OLD.type
        );
      END;
    `)
  })
  db.close()
}

// 초기 더미 데이터 (테스트 용)
export function insertDummyUser() {
  const sqlite3 = sqlite.verbose()
  const db = new sqlite3.Database(dbPath)

  db.serialize(() => {
    for (let i=0; i<=1000; i++) {
      db.run(`
        INSERT INTO user(
          studentID, name
        ) VALUES(?, ?);`,
        [20161000+i, `user_${i}`]
      )
    }
  })
  db.close()
}

// roomNum에 해당하는 방 좌석 배치를 가져옵니다.
export function getSeat(roomNum, handler) {
  const sqlite3 = sqlite.verbose()
  const db = new sqlite3.Database(dbPath)
  db.all(`
    SELECT *
    FROM   seat
    WHERE  roomNum=(?);`,
    [roomNum],
    (err, rows) => handler({
      seat: rows,
      roomNum,
    })
  )
}

// 학생 목록을 가져옵니다. studentID에서 pattern으로 사용됩니다.
export function getPattern(handler) {
  const sqlite3 = sqlite.verbose()
  const db = new sqlite3.Database(dbPath)
  
  db.all('SELECT studentID FROM user;', (err, rows) => {
    rows = rows.map(row => row.studentID)
    rows = rows.join('|')
    handler({ pattern: rows })
  })
  db.close()
}

// 해당 학생이 해당 좌석을 예약합니다.
// SelectSeat에서 사용합니다.
export function reserve({ studentID, roomNum, type, seatNum }, handler) {
  const sqlite3 = sqlite.verbose()
  const db = new sqlite3.Database(dbPath)
  
  db.run(`
    INSERT INTO reservation(
      studentID, roomNum, type, seatNum
    ) VALUES (?, ?, ?, ?);`,
    [studentID, roomNum, type, seatNum],
    (err) => {
      const state = {
        infoFeedback: {
          type: 'invalid',
        }
      }

      if (!err) {
        state.infoFeedback = {
          type: 'valid',
          name: 'reserveSuccess',
        }
        getSeat(roomNum, handler)
      }
      
      else if (err.stack.match('studentID')) {
        state.infoFeedback.name = 'reserveFailedStudentID'
      }

      else if (err.stack.match('seatNum')) {
        state.infoFeedback.name = 'reserveFailedSeatNum'
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

// formData를 사용하기 쉽게 JSON 형태로 바꿉니다.
export function preprocess(form) {
  const formData = Object.values(form)
    .reduce((acc, ele) => {
      if (!["", undefined, form.name].includes(ele.name))
        acc[ele.name] = parseInt(form[ele.name].value)
      return acc
    }, {})

  return formData
}

// db에서 예약 정보를 삭제합니다.
// endUsePopup에서 사용합니다.
export function deleteDB(studentID, { seatNum, roomNum }, handler) {
  const sqlite3 = sqlite.verbose()
  const db = new sqlite3.Database(dbPath)
  db.run(`
      DELETE FROM reservation
      WHERE studentID=(?) and seatNum=(?);
    `,
    [studentID, seatNum],
    function (err) {
      if (err)
        console.error(err.message)

      else if (this.changes === 1) {
        getSeat(roomNum, handler)
        handler({
          infoFeedback: {
            type: 'valid',
            name: 'deleteSuccess',
          }
        })
      }

      else {
        handler({
          infoFeedback: {
            type: 'invalid',
            name: 'verifyFailed',
          }
        })
      }
    }
  )
  db.close()
}