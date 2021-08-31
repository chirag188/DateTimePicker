import "./mindatepicker.css";
import adr from "../../angle-double-right-solid.svg";
import adl from "../../angle-double-left-solid.svg";
import als from "../../angle-left-solid.svg";
import ars from "../../angle-right-solid.svg";
import { useState } from "react";
const monthList = [
  "Jan",
  "Fab",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Nov",
  "Oct",
  "Dec",
];
const MinDatePicker = (props) => {
  var now = new Date();
  const [selectedDate, setSelectedDate] = useState({
    day: now.getDate(),
    month: now.getMonth(),
    year: now.getFullYear(),
    hours: "12",
    minutes: "00",
    zone: "AM",
  });
  var dt = new Date(selectedDate.year, selectedDate.month, selectedDate.day);
  var currentMonth =
    dt.getMonth() === now.getMonth() && dt.getFullYear() === now.getFullYear();
  console.log(currentMonth);
  var month = dt.getMonth();
  var year = dt.getFullYear();
  var daysInMonth = new Date(year, month + 1, 0).getDate();
  const skip = new Date(year, month, 1).getDay();
  const week = skip === 0 && daysInMonth === 28 ? 4 : 5;
  const days = Array(week)
    .fill(0)
    .map((row) => new Array(7).fill(1));
  let ele = 1;
  for (var i = 0; i < week; i++) {
    for (var j = 0; j < 7; j++) {
      if ((j < skip && i === 0) || daysInMonth < ele) {
        days[i][j] = "";
      } else {
        days[i][j] = ele;
        ele += 1;
      }
    }
  }
  const changeMonth = (op) => {
    if (op === "dec") {
      if (
        selectedDate.month - 1 < now.getMonth() &&
        selectedDate.year === now.getFullYear()
      ) {
        return;
      }
      selectedDate.month - 1 < 0
        ? setSelectedDate({
            ...selectedDate,
            month: 11,
            year: selectedDate.year - 1,
          })
        : setSelectedDate({ ...selectedDate, month: selectedDate.month - 1 });
    } else if (op === "inc")
      selectedDate.month + 1 > 11
        ? setSelectedDate({
            ...selectedDate,
            month: 0,
            year: selectedDate.year + 1,
          })
        : setSelectedDate({ ...selectedDate, month: selectedDate.month + 1 });
  };
  return (
    <>
      <div className="Calendar">
        <div className="header">
          <div
            className={
              "calendar-image adl" +
              (selectedDate.year === now.getFullYear() ? " imgdisable" : " ")
            }
            onClick={() => {
              if (selectedDate.year !== now.getFullYear())
                setSelectedDate({
                  ...selectedDate,
                  year: selectedDate.year - 1,
                });
            }}
          >
            <img src={adl} alt="adl" />
          </div>
          <div
            className={
              "calendar-image adl " +
              (selectedDate.month - 1 < now.getMonth() &&
              selectedDate.year === now.getFullYear()
                ? " imgdisable"
                : " ")
            }
            onClick={() => changeMonth("dec")}
          >
            <img src={als} alt="als" />
          </div>
          <div className="month-year">
            {monthList[selectedDate.month]} {selectedDate.year}
          </div>
          <div
            className="calendar-image adl"
            onClick={() => changeMonth("inc")}
          >
            <img src={ars} alt="ars" />
          </div>
          <div
            className="calendar-image adl"
            onClick={() =>
              setSelectedDate({ ...selectedDate, year: selectedDate.year + 1 })
            }
          >
            <img src={adr} alt="adr" />
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Su</th>
              <th>Mo</th>
              <th>Tu</th>
              <th>We</th>
              <th>Th</th>
              <th>Fr</th>
              <th>Sa</th>
            </tr>
          </thead>
          <tbody>
            {days.map((items, index) => {
              return (
                <tr key={index}>
                  {items.map((subItems, sIndex) => {
                    return (
                      <td
                        key={sIndex}
                        onClick={() =>
                          setSelectedDate({ ...selectedDate, day: subItems })
                        }
                        className={
                          // subItems === selectedDate.day ? "selected" : ""
                          currentMonth
                            ? subItems < now.getDate()
                              ? "disabled"
                              : ""
                            : ""
                        }
                      >
                        {subItems}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="CombineDropDown">
        <div className="hours">
          {props.hours.map((hour) => {
            return (
              <div
                className={
                  "option " + (hour === selectedDate.hours ? "selected" : "")
                }
                onClick={() =>
                  setSelectedDate({ ...selectedDate, hours: hour })
                }
              >
                {hour}
              </div>
            );
          })}
        </div>
        <div className="minutes">
          {props.minutes.map((minute) => {
            return (
              <div
                className={
                  "option " +
                  (minute === selectedDate.minutes ? "selected" : "")
                }
                onClick={() =>
                  setSelectedDate({ ...selectedDate, minutes: minute })
                }
              >
                {minute}
              </div>
            );
          })}
        </div>
        <div className="zone">
          {props.zone.map((zone) => {
            return (
              <div
                className={
                  "option " + (zone === selectedDate.zone ? "selected" : "")
                }
                onClick={() => setSelectedDate({ ...selectedDate, zone: zone })}
              >
                {zone}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default MinDatePicker;
