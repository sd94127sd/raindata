export default function Footer() {
    return (
        <footer className="stormy-bg border-t mt-12">
            <div className="container mx-auto px-4 py-6">
                <div className="text-center text-white text-sm">
                    <p>台北市雨量監測系統 - 數據來源：台北市政府開放數據平台</p>
                    <p className="mt-1">數據每5分鐘自動更新</p>
                    <div className="mt-2 text-xs text-white">
                        <span>雨量等級：無降雨(0) | 小雨(0.1-9.9) | 中雨(10.0-24.9) | 大雨(25.0-49.9) | 暴雨(50.0-99.9) | 大暴雨(100.0-249.9) | 特大暴雨(≥250.0) mm</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}