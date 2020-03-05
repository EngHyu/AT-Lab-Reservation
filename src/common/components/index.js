// 각각의 파일에서 export한 모든 클래스 import한 다음 export 해줍니다.
/*
Before:
import Info from "common/components/info"
import Seat from "common/components/seat"
*/

/*
After:
import { Info, Seat } from "common/components"
*/
import Help from "./help"
import Info from "./info"
import Seat from "./seat"
import Device from "./device"
import SeatID from "./seatID"
import Caution from "./caution"
import Password from "./password"
import StudentID from "./studentID"
import Navigation from "./navigation"
import SelectSeat from "./selectSeat"
import EndUsePopup from "./endUsePopup"
import { langs, strings, settings } from "./loadStrings"
import { Title, FeedbackTitle } from "./title"

export {
  Help,
  Info,
  Seat,
  Title,
  Device,
  SeatID,
  Caution,
  Password,
  StudentID,
  Navigation,
  SelectSeat,
  EndUsePopup,
  FeedbackTitle,

  langs,
  strings,
  settings,
}