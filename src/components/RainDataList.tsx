'use client';

import { RainStation, FontSizeSettings } from '@/types/rain';
import { fontSizeClasses } from './FontSizeControl';

interface RainDataListProps {
    data: RainStation[];
    loading: boolean;
    error: string | null;
    fontSize: FontSizeSettings;
    searchQuery: string;
}

export default function RainDataList({ data, loading, error, fontSize, searchQuery }: RainDataListProps) {
    const fontSizeClass = fontSizeClasses[fontSize];

    // 格式化時間
    const formatTime = (timeStr: string) => {
        if (timeStr.length !== 12) return timeStr;
        const year = timeStr.substring(0, 4);
        const month = timeStr.substring(4, 6);
        const day = timeStr.substring(6, 8);
        const hour = timeStr.substring(8, 10);
        const minute = timeStr.substring(10, 12);
        return `${year}/${month}/${day} ${hour}:${minute}`;
    };

    // 獲取雨量等級顏色
    const getRainLevelColor = (rain: number) => {
        if (rain === 0) return 'text-gray-600 bg-gray-50';
        if (rain >= 0.1 && rain <= 9.9) return 'text-green-600 bg-green-50';
        if (rain >= 10.0 && rain <= 24.9) return 'text-yellow-600 bg-yellow-50';
        if (rain >= 25.0 && rain <= 49.9) return 'text-orange-600 bg-orange-50';
        if (rain >= 50.0 && rain <= 99.9) return 'text-red-600 bg-red-50';
        if (rain >= 100.0 && rain <= 249.9) return 'text-purple-600 bg-purple-50';
        if (rain >= 250.0) return 'text-pink-600 bg-pink-50';
        return 'text-gray-600 bg-gray-50';
    };

    // 獲取雨量等級描述
    const getRainLevelText = (rain: number) => {
        if (rain === 0) return '無降雨';
        if (rain >= 0.1 && rain <= 9.9) return '小雨';
        if (rain >= 10.0 && rain <= 24.9) return '中雨';
        if (rain >= 25.0 && rain <= 49.9) return '大雨';
        if (rain >= 50.0 && rain <= 99.9) return '暴雨';
        if (rain >= 100.0 && rain <= 249.9) return '大暴雨';
        if (rain >= 250.0) return '特大暴雨';
        return '未知';
    };

    // 高亮搜索關鍵字
    const highlightText = (text: string, query: string) => {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        const parts = text.split(regex);
        return parts.map((part, index) =>
            regex.test(part) ? (
                <span key={index} className="bg-yellow-200 font-semibold">{part}</span>
            ) : part
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">載入中...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <div className="text-red-600 font-medium">載入數據時發生錯誤</div>
                <div className="text-red-500 text-sm mt-2">{error}</div>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                <div className="text-gray-600">沒有找到符合條件的數據</div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="text-sm text-gray-600 mb-4">
                共找到 {data.length} 個監測站
            </div>

            {/* 桌面版表格 */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left ${fontSizeClass} font-medium text-gray-500 uppercase tracking-wider">
                                站點編號
                            </th>
                            <th className="px-6 py-3 text-left ${fontSizeClass} font-medium text-gray-500 uppercase tracking-wider">
                                站點名稱
                            </th>
                            <th className="px-6 py-3 text-left ${fontSizeClass} font-medium text-gray-500 uppercase tracking-wider">
                                雨量 (mm)
                            </th>
                            <th className="px-6 py-3 text-left ${fontSizeClass} font-medium text-gray-500 uppercase tracking-wider">
                                等級
                            </th>
                            <th className="px-6 py-3 text-left ${fontSizeClass} font-medium text-gray-500 uppercase tracking-wider">
                                記錄時間
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((station) => (
                            <tr key={station.stationNo} className="hover:bg-gray-50">
                                <td className={`px-6 py-4 whitespace-nowrap ${fontSizeClass} font-medium text-gray-900`}>
                                    {station.stationNo}
                                </td>
                                <td className={`px-6 py-4 whitespace-nowrap ${fontSizeClass} text-gray-900`}>
                                    {highlightText(station.stationName, searchQuery)}
                                </td>
                                <td className={`px-6 py-4 whitespace-nowrap ${fontSizeClass} font-semibold text-blue-600`}>
                                    {station.rain}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 ${fontSizeClass} font-semibold rounded-full ${getRainLevelColor(station.rain)}`}>
                                        {getRainLevelText(station.rain)}
                                    </span>
                                </td>
                                <td className={`px-6 py-4 whitespace-nowrap ${fontSizeClass} text-gray-500`}>
                                    {formatTime(station.recTime)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 手機版卡片 */}
            <div className="md:hidden space-y-4">
                {data.map((station) => (
                    <div key={station.stationNo} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`${fontSizeClass} font-medium text-gray-900`}>
                                        {highlightText(station.stationName, searchQuery)}
                                    </span>
                                </div>
                                <div className={`${fontSizeClass} text-gray-500 text-sm`}>
                                    編號: {station.stationNo}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className={`${fontSizeClass} font-bold text-blue-600 text-xl`}>
                                    {station.rain} mm
                                </div>
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRainLevelColor(station.rain)}`}>
                                    {getRainLevelText(station.rain)}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <span className={`${fontSizeClass} text-sm`}>
                                {formatTime(station.recTime)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 