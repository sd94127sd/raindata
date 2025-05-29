#  雨量監測系統

##  雨量等級分類

| 雨量範圍 | 等級 | 顏色標識 |
|----------|------|----------|
| 0mm | 無降雨 | 灰色 |
| 0.1-9.9mm | 小雨 | 綠色 |
| 10.0-24.9mm | 中雨 | 黃色 |
| 25.0-49.9mm | 大雨 | 橙色 |
| 50.0-99.9mm | 暴雨 | 紅色 |
| 100.0-249.9mm | 大暴雨 | 紫色 |
| ≥250mm | 特大暴雨 | 粉色 |

## 🛠️ 技術棧

- **前端框架**：Next.js 14 (App Router)
- **開發語言**：TypeScript
- **樣式框架**：Tailwind CSS
- **部署平台**：Google Cloud Run
- **容器化**：Docker
- **數據來源**：政府開放數據 API


## 專案結構

```
raindata/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API 路由
│   │   |    ├──health      # 偵測api好壞 路由
│   │   |    └──rain        # 政府資料 路由
│   │   └── page.tsx           # 主頁面
│   ├── components/            # React 組件
│   │   ├── FontSizeControl.tsx    # 字體大小控制
│   │   ├── RainDataList.tsx       # 雨量數據列表
│   │   ├── SearchBar.tsx          # 搜索欄
│   │   ├── Footer.tsx         # Footer
│   │   ├── Header.tsx         # Header
│   │   └── RainAnimation.tsx  #雨天動畫
│   ├── hooks/                 # 自定義 Hooks
│   │   └── useLocalStorage.ts     # localStorage Hook
│   └── types/                 # TypeScript 類型定義
│       └── rain.ts
├── public/                    # 靜態資源
├── Dockerfile                 # Docker 配置
├── next.config.ts            # Next.js 配置
└── package.json              # 專案依賴 
```