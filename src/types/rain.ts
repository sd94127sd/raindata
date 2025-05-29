export interface RainStation {
  stationNo: string;
  stationName: string;
  recTime: string;
  rain: number;
}

export interface RainApiResponse {
  count: number;
  data: RainStation[];
  statistic_count: number;
  statistic_data: unknown[];
}

export type FontSizeSettings = 'small' | 'medium' | 'large'; 