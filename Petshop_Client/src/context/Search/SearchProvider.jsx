import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [showSearch, setShowSearch] = useState(false);

    return (
        <SearchContext.Provider value={{
            showSearch,
            openSearch: () => setShowSearch(true),
            closeSearch: () => setShowSearch(false)
        }}>
            {children}
        </SearchContext.Provider>
    );

};

export const useSearchContext = () => useContext(SearchContext); 
