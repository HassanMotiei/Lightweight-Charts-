"use client";
// App.tsx
import React, { useState, useEffect } from "react";
import CandleChart from "./CandleChart";

interface CandlestickTypes {
	Date: string;
	Time: string;
	Open: number;
	High: number;
	Low: number;
	Last: number;
	Volume: number;
	NumberOfTrades: number;
	BidVolume: number;
	AskVolume: number;
}

const Chart: React.FC<CandlestickTypes> = () => {
	const [candlestickData, setCandlestickData] = useState<CandlestickTypes[]>(
		[]
	);

	useEffect(() => {
		const fetchDataAndMap = async () => {
			try {
				const response = await fetch("/data.json");
				if (!response.ok) {
					throw new Error("Failed to fetch data");
				}
				const rawData = await response.json();

				// بررسی ساختار داده و قطعیت دریافت داده
				if (!Array.isArray(rawData)) {
					throw new Error("Invalid data structure");
				}

				// تنظیم داده‌های دریافتی به عنوان candlestickData
				setCandlestickData(rawData);
			} catch (error) {
				console.error("Error fetching or processing data:", error);
			}
		};

		fetchDataAndMap();
	}, []);

	// تابع time
	const time = (DateProp: string, TimeProp: string) => {
		// تاریخ و زمان مورد نظر
		let dateStr = DateProp;
		let timeStr = TimeProp;

		// تبدیل تاریخ و زمان به شیوه Date object در جاوااسکریپت
		let dateTimeStr = dateStr + " " + timeStr;
		let dateTime = new Date(dateTimeStr);

		// تبدیل Date object به زمان Epoch (میلی‌ثانیه)
		let epochTime = dateTime.getTime();
		// console.log(epochTime);
		return epochTime; // بازگشت مقدار زمان Epoch
	};

	// ایجاد initialCandleData با استفاده از داده‌های دریافتی و تابع time
	const initialCandleData = candlestickData.map((data) => ({
		time: time(data.Date, data.Time), // استفاده از مقدار زمان Epoch
		open: data.Open,
		high: data.High,
		low: data.Low,
		close: data.Last,
		volume: data.Volume,
		numberOfTrades: data.NumberOfTrades,
		bidVolume: data.BidVolume,
		askVolume: data.AskVolume,
	}));

	const [highestHigh, setHighestHigh] = useState(0);
	const [lowestLow, setLowestLow] = useState(0);
	const [highestHighTime, setHighestHighTime] = useState(0);
	const [lowestLowTime, setLowestLowTime] = useState(0);

	useEffect(() => {
		async function processData() {
			const highValues = candlestickData.map((item) => item.High);
			const lowValues = candlestickData.map((item) => item.Low);

			const [highestHighValue, lowestLowValue] = await Promise.all([
				Math.max(...highValues),
				Math.min(...lowValues),
			]);

			setHighestHigh(highestHighValue);
			setLowestLow(lowestLowValue);
		}

		processData();
	}, [candlestickData]);

	useEffect(() => {
		const highestHighItem = candlestickData.find(
			(item) => item.High === highestHigh
		);

		if (highestHighItem) {
			const highestHighTimeValue = time(
				highestHighItem.Date,
				highestHighItem.Time
			);

			setHighestHighTime(highestHighTimeValue);
		}
	}, [candlestickData, highestHigh]);

	useEffect(() => {
		const lowestLowItem = candlestickData.find(
			(item) => item.Low === lowestLow
		);

		if (lowestLowItem) {
			const lowestLowTimeValue = time(
				lowestLowItem.Date,
				lowestLowItem.Time
			);

			setLowestLowTime(lowestLowTimeValue);
		}
	}, [candlestickData, lowestLow]);

	return (
		<div>
			{highestHighTime !== 0 && lowestLowTime !== 0 && (
				<CandleChart
					initialCandleData={initialCandleData}
					highestHighTime={highestHighTime}
					lowestLowTime={lowestLowTime}
				/>
			)}
		</div>
	);
};

export default Chart;
