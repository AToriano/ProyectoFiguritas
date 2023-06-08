import React, { useState } from "react";
import "./SelectionList.css";

function SelectionList(props) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="divSelectionListContainer">
      <select
        value={selectedOption}
        onChange={handleChange}
        className="selectSelectionList"
      >
        <option value="" disabled selected>
          {props.text}
        </option>
        <option value="option1">{props.filter1}</option>
        <option value="option2" disabled selected>{props.filter2}</option>
        <option value="option3" disabled selected>{props.filter3}</option>
        <option value="option4" disabled selected>{props.filter4}</option>
        <option value="option5" disabled selected>{props.filter5}</option>
        <option value="option6" disabled selected>{props.filter6}</option>
        <option value="option7" disabled selected>{props.filter7}</option>
        <option value="option8" disabled selected>{props.filter8}</option>
        <option value="option9" disabled selected>{props.filter9}</option>
      </select>
    </div>
  );
}

export default SelectionList;
