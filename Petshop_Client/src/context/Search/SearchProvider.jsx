import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [showSearch, setShowSearch] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(() => {
        const savedUser = localStorage.getItem('user');

        return savedUser ? JSON.parse(savedUser) : null;
    });

    const openUserMenu = (userData) => {
        setShowUserMenu(userData);
    };

    const closeUserMenu = () => {
        setShowUserMenu(null);
        localStorage.removeItem('user'); 
    };

    return (
        <SearchContext.Provider value={{
            showSearch,
            openSearch: () => setShowSearch(true),
            closeSearch: () => setShowSearch(false),

            showUserMenu,
            openUserMenu,
            closeUserMenu,
        }}>
            {children}
        </SearchContext.Provider>
    );

};

export const useSearchContext = () => useContext(SearchContext); 
