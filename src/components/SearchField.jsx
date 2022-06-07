import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchMessages } from "../store/reducers/messagesSlice.js";

const SearchField = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const changeFunc = (e) => {
    setInputValue(e.target.value);
    const targetValue = e.target.value;
    dispatch(searchMessages({ targetValue }));
  };

  return (
    <div>
      <input
        value={inputValue}
        type="text"
        onChange={changeFunc}
        placeholder="Поиск"
      />
    </div>
  );
};

export default SearchField;
