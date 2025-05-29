'use client';

import FontSizeControl from './FontSizeControl';
import SearchBar from './SearchBar';
import RainAnimation from './RainAnimation';

type FontSize = 'small' | 'medium' | 'large';

interface HeaderProps {
    onSearch: (query: string) => void;
    onFontSizeChange: (size: FontSize) => void;
}

export default function Header({ onSearch, onFontSizeChange }: HeaderProps) {
    return (
        <header className="stormy-bg text-white shadow-lg relative overflow-hidden">
            {/* 背景雨天動畫 */}
            <RainAnimation />

            <div className="container mx-auto px-4 py-4 md:py-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 items-center">

                    {/* 標題區：手機置中、桌面靠左 */}
                    <div className="flex justify-center md:justify-start">
                        <div className="flex items-center gap-3 text-center md:text-left">
                            <div className="text-2xl md:text-3xl">🌧️</div>
                            <div>
                                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold drop-shadow-lg">
                                    台北市雨量監測
                                </h1>
                                <p className="text-blue-100 text-xs md:text-sm drop-shadow">
                                    即時雨量數據監控系統
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center md:justify-end gap-4">
                        <div className="w-full sm:w-auto md:max-w-md">
                            <SearchBar onSearch={onSearch} />
                        </div>
                        <FontSizeControl onFontSizeChange={onFontSizeChange} />
                    </div>

                </div>
            </div>
        </header>
    );
}
