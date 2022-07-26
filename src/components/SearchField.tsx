import React from "react";
import { useState } from "react";

import { FlagAsProps } from "../types/types";
import Input from "./UI/inputs/Input";

type searchCallbackType = {
  searchCallback: (val: string) => void;
};

const SearchField: React.FC<searchCallbackType> = (props) => {
  const [searchText, setSearchText] = useState<string>("");

  const funcQueue = (e: any): void => {
    const searchByText = e.target.value;
    setSearchText(searchByText);
    props.searchCallback(searchByText);
  };

  return (
    <div>
      <Input
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
