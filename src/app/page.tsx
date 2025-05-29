'use client';

import { useState, useEffect, useMemo } from 'react';
import Header from '@/components/Header';
import RainDataList from '@/components/RainDataList';
import { RainStation, RainApiResponse, FontSizeSettings } from '@/types/rain';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Footer from '@/components/Footer';

export default function Home() {
  const [rainData, setRainData] = useState<RainStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useLocalStorage<FontSizeSettings>('fontSize', 'medium' as FontSizeSettings);


  // 獲取雨量數據
  const fetchRainData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/rain');
      if (!response.ok) {
        throw new Error('網絡請求失敗');
      }

      const data: RainApiResponse = await response.json();
      setRainData(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知錯誤');
    } finally {
      setLoading(false);
    }
  };

  // 初始載入數據
  useEffect(() => {
    fetchRainData();

    // 設置定時刷新（每5分鐘）
    const interval = setInterval(fetchRainData, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // 過濾數據
  const filteredData = useMemo(() => {
    if (!searchQuery) return rainData;

    return rainData.filter(station =>
      station.stationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.stationNo.includes(searchQuery)
    );
  }, [rainData, searchQuery]);

  // 處理搜索
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // 處理字體大小變更
  const handleFontSizeChange = (size: FontSizeSettings) => {
    setFontSize(size);
  };



  const rainStats = useMemo(() => {
    return {
      total: rainData.length,
      noRain: rainData.filter(s => s.rain === 0).length,
      lightRain: rainData.filter(s => s.rain >= 0.1 && s.rain <= 9.9).length,
      moderateRain: rainData.filter(s => s.rain >= 10.0 && s.rain <= 24.9).length,
      heavyRain: rainData.filter(s => s.rain >= 25.0 && s.rain <= 49.9).length,
      rainstorm: rainData.filter(s => s.rain >= 50.0 && s.rain <= 99.9).length,
      heavyRainstorm: rainData.filter(s => s.rain >= 100.0 && s.rain <= 249.9).length,
      extremeRainstorm: rainData.filter(s => s.rain >= 250.0).length,
    };
  }, [rainData]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSearch={handleSearch}
        onFontSizeChange={handleFontSizeChange}
      />

      <main className="container mx-auto px-4 py-8">
        {/* 統計信息 */}
        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="${fontSizeClass} font-bold text-blue-600">{rainStats.total}</div>
              <div className="text-gray-600 text-xs">監測站總數</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-xl font-bold text-gray-500">{rainStats.noRain}</div>
              <div className="text-gray-600 text-xs">無降雨</div>
              <div className="text-gray-400 text-xs">0 mm</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-xl font-bold text-green-600">{rainStats.lightRain}</div>
              <div className="text-gray-600 text-xs">小雨</div>
              <div className="text-gray-400 text-xs">0.1-9.9 mm</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-xl font-bold text-yellow-600">{rainStats.moderateRain}</div>
              <div className="text-gray-600 text-xs">中雨</div>
              <div className="text-gray-400 text-xs">10.0-24.9 mm</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-xl font-bold text-orange-600">{rainStats.heavyRain}</div>
              <div className="text-gray-600 text-xs">大雨</div>
              <div className="text-gray-400 text-xs">25.0-49.9 mm</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-xl font-bold text-red-600">{rainStats.rainstorm}</div>
              <div className="text-gray-600 text-xs">暴雨</div>
              <div className="text-gray-400 text-xs">50.0-99.9 mm</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-xl font-bold text-purple-600">{rainStats.heavyRainstorm + rainStats.extremeRainstorm}</div>
              <div className="text-gray-600 text-xs">大暴雨+</div>
              <div className="text-gray-400 text-xs">≥100.0 mm</div>
            </div>
          </div>
        )}

        {/* 數據列表 */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">雨量監測數據</h2>
            <button
              onClick={fetchRainData}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? '刷新中...' : '刷新數據'}
            </button>
          </div>

          <RainDataList
            data={filteredData}
            loading={loading}
            error={error}
            fontSize={fontSize}
            searchQuery={searchQuery}
          />
        </div>
      </main>

      {/* 頁腳 */}
      <Footer />
    </div>
  );
}
