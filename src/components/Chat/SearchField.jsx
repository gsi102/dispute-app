import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchMessages } from "../../store/reducers/messagesSlice.js";

const SearchField = (props) => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const flag = props.flag;

  const funcQueue = (e) => {
    const targetValue = e.target.value;
    setSearchText(targetValue);
    dispatch(searchMessages({ targetValue, flag }));
  };

  return (
    <div>
      <input
        value={searchText}
        className="input-search-message"
        type="text"
        placeholder="Find..."
        onChange={funcQueue}
      />
    </div>
  );
};

export default SearchField;
