import React, { useState, useMemo, useEffect } from "react";

const SearchField = (props) => {
  const [inputSearch, setInputSearch] = useState("");

  const filterMessages = useMemo(() => {
    return props.disputeMessages.filter((obj) =>
      obj.text.includes(inputSearch)
    );
  }, [inputSearch]);

  const test = useMemo(() => {
    return props.searchMessages(filterMessages);
  }, [filterMessages]);

  // props.showMessages(filterMessages);

  return (
    <div>
      <input
        value={inputSearch}
        type="text"
        onChange={(e) => setInputSearch(e.target.value)}
        placeholder="Поиск"
      />
    </div>
  );
};

export default SearchField;
