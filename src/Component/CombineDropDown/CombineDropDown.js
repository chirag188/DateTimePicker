import { useState } from "react";
import "./CombineDropDown.css";
const CombineDropDown = (props) => {
  const [selectedHours, setSelectedHours] = useState("02");
  const [selectedMinutes, setSelectedMinutes] = useState("04");
  const [selectedZone, setSelectedZone] = useState("PM");

  return (
    <div className="CombineDropDown">
      <div className="hours">
        {props.hours.map((hour) => {
          return <div className={"option " + (hour===selectedHours?"selected":"")} onClick={() => setSelectedHours(hour)}>{hour}</div>;
        })}
      </div>
      <div className="minutes">
        {props.minutes.map((minute) => {
          return <div className={"option " + (minute===selectedMinutes?"selected":"")} onClick={() => setSelectedMinutes(minute)}>{minute}</div>;
        })}
      </div>
      <div className="zone">
        {props.zone.map((zone) => {
          return <div className={"option " + (zone===selectedZone?"selected":"")} onClick={() => setSelectedZone(zone)}>{zone}</div>;
        })}
      </div>
    </div>
  );
};
export default CombineDropDown;