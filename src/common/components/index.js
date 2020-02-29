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
import Info from "./info"
import Seat from "./seat"
import Title from "./title"
import SeatID from "./seatID"
import Caution from "./caution"
import Feedback from "./feedback"
import Password from "./password"
import StudentID from "./studentID"
import Navigation from "./navigation"
import SelectSeat from "./selectSeat"
import EndUsePopup from "./endUsePopup"
import { list, strings } from "./loadStrings"

export {
  Info,
  Seat,
  Title,
  SeatID,
  Caution,
  Feedback,
  Password,
  StudentID,
  Navigation,
  SelectSeat,
  EndUsePopup,

  list,
  strings,
}