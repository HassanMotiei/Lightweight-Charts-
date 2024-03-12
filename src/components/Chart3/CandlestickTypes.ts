// ChartData.ts
export interface CandlestickTypes {
	[x: string]: any;
	time: TimeType;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	numberOfTrades: number;
	bidVolume: number;
	askVolume: number;
}
