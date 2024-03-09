 "use client";
// App.tsx
import React from "react";
import Chart from "./CandlestickChart";
import { CandlestickData } from "./ChartData";

const candlestickData: CandlestickData[] = [
	{
		date: "2023-01-01",
		open: 4792.01,
		high: 4805.25,
		low: 4780.0,
		close: 4797.8,
	},
	{
		date: "2023-01-02",
		open: 4797.8,
		high: 4800.1,
		low: 4795.5,
		close: 4798.25,
	},
	{
		date: "2023-01-03",
		open: 4798.25,
		high: 4802.35,
		low: 4797.0,
		close: 4801.7,
	},
	{
		date: "2023-01-04",
		open: 4801.7,
		high: 4804.5,
		low: 4800.0,
		close: 4803.25,
	},
	{
		date: "2023-01-05",
		open: 4803.25,
		high: 4806.0,
		low: 4802.25,
		close: 4805.7,
	},{
		date: "2023-01-06",
		open: 4792.01,
		high: 4805.25,
		low: 4780.0,
		close: 4797.8,
	},
	{
		date: "2023-01-07",
		open: 4797.8,
		high: 4800.1,
		low: 4795.5,
		close: 4798.25,
	},
	{
		date: "2023-01-08",
		open: 4798.25,
		high: 4802.35,
		low: 4797.0,
		close: 4801.7,
	},
	{
		date: "2023-01-09",
		open: 4801.7,
		high: 4804.5,
		low: 4800.0,
		close: 4803.25,
	},
	{
		date: "2023-01-10",
		open: 4803.25,
		high: 4806.0,
		low: 4802.25,
		close: 4805.7,
	},{
		date: "2023-01-11",
		open: 4792.01,
		high: 4805.25,
		low: 4780.0,
		close: 4797.8,
	},
	{
		date: "2023-01-12",
		open: 4797.8,
		high: 4800.1,
		low: 4795.5,
		close: 4798.25,
	},
	{
		date: "2023-01-13",
		open: 4798.25,
		high: 4802.35,
		low: 4797.0,
		close: 4801.7,
	},
	{
		date: "2023-01-14",
		open: 4801.7,
		high: 4804.5,
		low: 4800.0,
		close: 4803.25,
	},
	{
		date: "2023-01-15",
		open: 4803.25,
		high: 4806.0,
		low: 4802.25,
		close: 4805.7,
	},
	{
		date: "2024-03-01",
		open: 4380.25,
		high: 4382.25,
		low: 4377.75,
		close: 4381.75,
	},
	{
		date: "2024-03-02",
		open: 4381.75,
		high: 4383.25,
		low: 4381.25,
		close: 4382.75,
	},
	{
		date: "2024-03-03",
		open: 4382.75,
		high: 4384.25,
		low: 4382.25,
		close: 4383.75,
	},
	{
		date: "2024-03-04",
		open: 4380.25,
		high: 4382.25,
		low: 4377.75,
		close: 4381.75,
	},
	{
		date: "2024-03-05",
		open: 4381.75,
		high: 4383.25,
		low: 4381.25,
		close: 4382.75,
	},
	{
		date: "2024-03-06",
		open: 4382.75,
		high: 4384.25,
		low: 4382.25,
		close: 4383.75,
	},
	{
		date: "2024-03-07",
		open: 4380.25,
		high: 4382.25,
		low: 4377.75,
		close: 4381.75,
	},
	{
		date: "2024-03-08",
		open: 4381.75,
		high: 4383.25,
		low: 4381.25,
		close: 4382.75,
	},
	{
		date: "2024-03-09",
		open: 4382.75,
		high: 4384.25,
		low: 4382.25,
		close: 4383.75,
	},
	{
		date: "2024-03-10",
		open: 4380.25,
		high: 4382.25,
		low: 4377.75,
		close: 4381.75,
	},
	{
		date: "2024-03-11",
		open: 4381.75,
		high: 4383.25,
		low: 4381.25,
		close: 4382.75,
	},
	{
		date: "2024-03-12",
		open: 4382.75,
		high: 4384.25,
		low: 4382.25,
		close: 4383.75,
	},
	{
		date: "2024-03-13",
		open: 4380.25,
		high: 4382.25,
		low: 4377.75,
		close: 4381.75,
	},
	{
		date: "2024-03-14",
		open: 4381.75,
		high: 4383.25,
		low: 4381.25,
		close: 4382.75,
	},
	{
		date: "2024-03-15",
		open: 4382.75,
		high: 4384.25,
		low: 4382.25,
		close: 4383.75,
	},
	// ... داده های بیشتر
];

const App: React.FC = () => {
	return (
		<div>
			<h1>S&P500 Candlestick Chart</h1>
			<Chart data={candlestickData} />
		</div>
	);
};

export default App;