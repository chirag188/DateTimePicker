import { useState, useEffect } from "react";
import "./datepicker.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
const hours = ["12","01","02","03","04","05","06","07","08","09","10","11"];
const minutes = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59"];
const zone = ["AM", "PM"];
const DatePicker = (props) => {
  const now = new Date();
  const getTwoDigit = (value) => (value > 9 ? value.toString() : `0${value}`);
  const min =
    now.getFullYear() +
    "-" +
    getTwoDigit(now.getMonth() + 1) +
    "-" +
    getTwoDigit(now.getDate());
  const timeConversionZone = (hours,zone) => {
    if(hours === 12)
      return zone === "AM"?0:12
    else if(zone === "AM")
      return hours
    else
      return hours + 12
  }
  const today = (checkDate) => {
    const date = new Date();
    const selected = new Date(checkDate);
    if(
    date.getFullYear() === selected.getFullYear() &&
    date.getMonth() === selected.getMonth() &&
    date.getDate() === selected.getDate())
      return true
    return false
  }
  const [selectedDate, setSelectedDate] = useState({
    date: min,
    hours: getTwoDigit(
      now.getHours() > 12 ? now.getHours() - 12 : now.getHours()
    ),
    minutes: getTwoDigit(now.getMinutes()),
    zone: now.getHours() > 12 ? "PM" : "AM",
  });
  const [insideHours, setInsideHours] = useState(hours);
  const [insideMinutes, setInsideMinutes] = useState(minutes);
  const [insideZone, setInsideZone] = useState(zone);
  const dateHandler = () => {
    const date = new Date(selectedDate.date);
    date.setHours(timeConversionZone(+selectedDate.hours,selectedDate.zone))
    date.setMinutes(selectedDate.minutes);
    console.log(date);
  };
  useEffect(() => {
    const date = new Date();
    if (
      today(selectedDate.date)
    ) {
      document.getElementById("datepicker").value = min;
      let currentHours =
        date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
      currentHours = currentHours === 12 ? 0 : currentHours;
      const currentZone = date.getHours() > 12 ? 1 : 0;
      const currentMinutes = date.getMinutes();
      setInsideHours(hours.slice(currentHours, hours.length));
      +selectedDate.hours === currentHours
        ? setInsideMinutes(minutes.slice(currentMinutes, minutes.length))
        : setInsideMinutes(minutes);
      setInsideZone(zone.slice(currentZone, zone.length));
    } else {
      setInsideHours(hours);
      setInsideMinutes(minutes);
      setInsideZone(zone);
    }
    dateHandler();
  }, [selectedDate]);
  return (
    <div className="DatePicker">
      <input
        id="datepicker"
        type="date"
        min={min}
        onChange={(event) => {
          const date = new Date();
          if (
            today(event.target.value)
          ) {
            setSelectedDate({
              ...selectedDate,
              hours:
                timeConversionZone(+selectedDate.hours,selectedDate.zone) < date.getHours()
                  ? getTwoDigit(
                      date.getHours() > 12
                        ? date.getHours() - 12
                        : date.getHours()
                    )
                  : selectedDate.hours,
              minutes:
                +selectedDate.minutes < date.getMinutes()
                  ? getTwoDigit(date.getMinutes())
                  : selectedDate.minutes,
              date: event.target.value,
              zone:date.getHours() > 12 ? "PM" : "AM",
            });
          } else {
            setSelectedDate({ ...selectedDate, date: event.target.value });
          }
        }}
      />
      <Dropdown
        options={insideHours}
        value={selectedDate.hours}
        onChange={(event) =>
          setSelectedDate({ ...selectedDate, hours: event.value })
        }
      />
      <Dropdown
        options={insideMinutes}
        value={selectedDate.minutes}
        onChange={(event) =>
          setSelectedDate({ ...selectedDate, minutes: event.value })
        }
      />
      <Dropdown
        options={insideZone}
        value={selectedDate.zone}
        onChange={(event) =>
          setSelectedDate({ ...selectedDate, zone: event.value })
        }
      />
    </div>
  );
};
export default DatePicker;