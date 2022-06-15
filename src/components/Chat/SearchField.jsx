import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchMessages } from "../../store/reducers/messagesSlice.js";

const SearchField = (props) => {
  const dispatch = useDispatch();
  const inputValue = useSelector((state) => state.messages.inputSearch);
  const flag = props.flag;

  const changeFunc = (e) => {
    const targetValue = e.target.value;
    dispatch(searchMessages({ targetValue, flag }));
  };

  return (
    <div>
      <input
        value={inputValue.body}
        type="text"
        onChange={changeFunc}
        placeholder={inputValue.placeholder}
      />
    </div>
  );
};

export default SearchField;
