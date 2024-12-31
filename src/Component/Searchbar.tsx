import React, { useState } from "react";


type SearchProps<T> = {
    data:  T[];
    searchFields: (keyof T)[];
    onSearch: (filteredResults: T[]) => void;
}

const Searchbar:React.FC<SearchProps<T>>= ({data, searchFields, onSearch})=> {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query || query.trim() === "") {
        onSearch(data);
        return;
      }

    const filtered = data.filter((item) =>
      searchFields.some((field) =>
       String(item[field]).toLowerCase().includes(query))
    );
    onSearch(filtered); // Return filtered results to the parent component
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Type to search..."
          className="w-full p-4 pl-12 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <svg
          className="absolute left-4 top-4 w-5 h-5 text-gray-400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
          />
        </svg>
      </div>
    </div>
  );
};

export default Searchbar;
