import React from "react";

const SearchField = (props) => {
  const changeFunc = (e) => {
    props.setSearchInput(e.target.value);
    props.searchFunc(e.target.value);
  };

  return (
    <div>
      <input
        value={props.searchInput}
        type="text"
        onChange={changeFunc}
        placeholder="Поиск"
      />
    </div>
  );
};

export default SearchField;
