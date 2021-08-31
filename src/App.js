import React from "react";
// import Calendar from "./Component/Calendar/Calendar";
// import CombineDropDown from "./Component/CombineDropDown/CombineDropDown";
import MinDatePicker from "./Component/MinDatePicker/mindatepicker";
// import DatePicker from "./Component/DatePicker/datepicker";
const hours = ["12","01","02","03","04","05","06","07","08","09","10","11"];
const minutes = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59"];
const zone = ["AM", "PM"];
function App() {
  return (
    <div style={{display:'inline-flex'}}>
      {/* <DatePicker /> */}
      <MinDatePicker hours={hours} minutes={minutes} zone={zone}/>
      {/* <Calendar />
      <CombineDropDown hours={hours} minutes={minutes} zone={zone}></CombineDropDown> */}
    </div>
  );
}
export default App;