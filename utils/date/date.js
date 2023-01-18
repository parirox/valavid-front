import moment from "jalali-moment";
import {isEmpty} from "@/utils/general";

export function dateFormat(date) {
  if(isEmpty(date)) return "-"
  return moment(date, "YYYY/MM/DD")
    .locale("fa")
    .format("YYYY/MM/DD")
}