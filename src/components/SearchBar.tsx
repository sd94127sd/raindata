'use client';

import { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "搜尋站點名稱..." }: SearchBarProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        onSearch(searchQuery.trim());
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        onSearch('');
    };

    return (
        <div className="flex items-center gap-2 w-full max-w-md">
            <div className="relative flex-1">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="
            block w-full px-4 py-2 border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            placeholder-gray-400 text-sm
          "
                    placeholder={placeholder}
                />
                {searchQuery && (
                    <button
                        onClick={clearSearch}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        title="清除搜索"
                    >
                        ✕
                    </button>
                )}
            </div>

            <button
                onClick={handleSearch}
                className="
          px-4 py-2 bg-blue-600 text-white rounded-lg
          hover:bg-blue-700 focus:ring-2 focus:ring-blue-500
          transition-colors text-sm font-medium
          whitespace-nowrap
        "
            >
                搜尋
            </button>
        </div>
    );
} 