const settings = {
  "floor": 4,
  "dbPath": "db.db",
  "lang": [
    "ko",
    "en"
  ],
  "cssName": [
    "popup",
    "feedback",
    "selectSeat"
  ],
  "moduleName": [
    "info",
    "seat",
    "title",
    "seatID",
    "caution",
    "feedback",
    "password",
    "studentID",
    "navigation",
    "selectSeat",
    "endUsePopup"
  ],
  "columnFields": {
    "user": [
      {
        "field": "id",
        "width": "7%"
      },
      {
        "field": "studentID",
        "width": "31%"
      },
      {
        "field": "name",
        "width": "31%"
      },
      {
        "field": "count",
        "width": "31%"
      }
    ],
    "log": [
      {
        "field": "id",
        "width": "7%"
      },
      {
        "field": "created",
        "width": "23%"
      },
      {
        "field": "tableName",
        "width": "10%"
      },
      {
        "field": "action",
        "width": "10%"
      },
      {
        "field": "log",
        "width": 0
      }
    ],
    "reservation": [
      {
        "field": "id",
        "width": "7%"
      },
      {
        "field": "studentID",
        "width": "20%"
      },
      {
        "field": "roomNum",
        "width": "13%"
      },
      {
        "field": "seatNum",
        "width": "13%"
      },
      {
        "field": "startTime",
        "width": "24%"
      },
      {
        "field": "endTime",
        "width": 0
      }
    ]
  }
}

module.exports = {}
for (const [k, v] of Object.entries(settings)) {
  module.exports[k] = v
}