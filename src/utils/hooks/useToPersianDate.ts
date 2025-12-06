import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export const useToPersianDate = (date: string) =>
  new DateObject({
    date: new Date(date),
    calendar: persian,
    locale: persian_fa,
  }).format("YYYY/MM/DD  HH:mm");
