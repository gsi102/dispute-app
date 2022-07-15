import React from "react";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { searchMessages } from "../../store/reducers/messagesSlice";
import { FlagAsProps } from "../../types/types";

const SearchField: React.FC<FlagAsProps> = (props) => {
  const [searchText, setSearchText] = useState<string>("");
  const dispatch = useAppDispatch();
  const flag = props.flag;

  const funcQueue = (e: any): void => {
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
