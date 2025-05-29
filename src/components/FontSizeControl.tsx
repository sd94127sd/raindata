'use client';

import { useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FontSizeSettings } from '@/types/rain';

export const fontSizeClasses: Record<FontSizeSettings, string> = {
  small: 'text-base',
  medium: 'text-lg',
  large: 'text-2xl'
};

interface FontSizeControlProps {
  onFontSizeChange: (size: FontSizeSettings) => void;
}

export default function FontSizeControl({ onFontSizeChange }: FontSizeControlProps) {
  const [fontSize, setFontSize, isLocalStorageReady] = useLocalStorage<FontSizeSettings>('fontSize', 'medium' as FontSizeSettings);

  useEffect(() => {
    if (isLocalStorageReady) {
      onFontSizeChange(fontSize);
    }
  }, [fontSize, onFontSizeChange, isLocalStorageReady]);

  const handleFontSizeChange = (size: FontSizeSettings) => {
    setFontSize(size);
    onFontSizeChange(size);
  };

  const fontSizeOptions: Array<{ value: FontSizeSettings; label: string; class: string }> = [
    { value: 'small', label: '小', class: 'text-base' },
    { value: 'medium', label: '中', class: 'text-lg' },
    { value: 'large', label: '大', class: 'text-2xl' },
  ];

  // 在 localStorage 準備好之前顯示默認狀態
  if (!isLocalStorageReady) {
    return (
      <div className="flex flex-col items-start gap-2 p-2 bg-white rounded-lg shadow-sm border">
        <span className="text-sm text-gray-600 font-medium">字體大小：</span>
        <div className="flex gap-1">
          {fontSizeOptions.map((option) => (
            <button
              key={option.value}
              className={`
                px-3 py-1 rounded-md text-sm font-medium transition-colors
                ${option.value === 'medium'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700'
                }
              `}
              disabled
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 p-2 bg-white rounded-lg shadow-sm border w-full sm:w-auto">
      <span className="text-sm text-gray-600 font-medium">字體大小：</span>
      <div className="flex gap-1">
        {fontSizeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleFontSizeChange(option.value)}
            className={`
              px-3 py-1 rounded-md text-sm font-medium transition-colors
              ${fontSize === option.value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}