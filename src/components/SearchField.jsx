import React, { useState } from "react";

const SearchField = (props) => {
  const [inputSearch, setInputSearch] = useState("");

  const changeFunc = (e) => {
    setInputSearch(e.target.value);
    props.searchFunc(e.target.value);
  };

  return (
    <div>
      <input
        value={inputSearch}
        type="text"
        onChange={changeFunc}
        placeholder="Поиск"
      />
    </div>
  );
};

export default SearchField;
