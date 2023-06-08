import React, { useEffect, useState } from "react";
import "./Input.css";
import Data from "../../../resources";

function Input(props) {
  // const [searchTerm, setSearchTerm] = useState("");

  // function handleSearchChange(event) {
  //   setSearchTerm(event.target.value);
  // }

  // useEffect(() => {
  //   const searchResults = Data.filter((songs) =>
  //     // pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     songs.algo.toString().includes(searchTerm.toLowerCase())
  //   );
  //   // props.setPokeList(searchResults);
  // }, [searchTerm]);
  // console.log(searchTerm);

  return (
    <div>
      <input
        type={`${props.type}`}
        /* placeholder={`${props.placeHolder}` }*/
        className="inputSearchBar"
        onChange={props.onChange}
        // value={searchTerm}
        // onChange={handleSearchChange}
      />
    </div>
  );
}

export default Input;
