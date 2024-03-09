"use client";
import React, { useEffect, useRef } from "react";
import { createChart, LineStyle } from "lightweight-charts";
import { CandlestickData } from "./ChartData";

interface ChartProps {
	data: CandlestickData[];
}

const CandlestickChart: React.FC<ChartProps> = ({ data }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const chartRef = useRef<ReturnType<typeof createChart>>();

	useEffect(() => {
		if (!containerRef.current || !data.length) return;

		const sortedData = [...data].sort(
			(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
		);

		if (chartRef.current) {
			chartRef.current.remove();
		}

		const chart = createChart(containerRef.current, {
			width: containerRef.current.clientWidth,
			height: 600,
		});

		chartRef.current = chart;

		const candlestickSeries = chart.addCandlestickSeries({
			upColor: "#4B9628",
			borderUpColor: "#4B9628",
			wickUpColor: "#4B9628",
			downColor: "#E51E1E",
			borderDownColor: "#E51E1E",
			wickDownColor: "#E51E1E",
		});

		candlestickSeries.setData(
			sortedData.map((item) => ({
				time: item.date,
				open: item.open,
				high: item.high,
				low: item.low,
				close: item.close,
			}))
		);

		const lowestLow = Math.min(...data.map((candle) => candle.low));
		const highestHigh = Math.max(...data.map((candle) => candle.high));

		chart
			.addLineSeries({
				color: "red",
				lineWidth: 1,
				lineStyle: LineStyle.Dotted,
				priceScaleId: "right",
				crosshairMarkerVisible: true,
				crosshairMarkerRadius: 4,
				crosshairMarkerBorderColor: "red",
				crosshairMarkerBackgroundColor: "red",
			})
			.setData([
				{ time: data[0].date, value: lowestLow },
				{ time: data[data.length - 1].date, value: lowestLow },
			]);

		chart
			.addLineSeries({
				color: "green",
				lineWidth: 1,
				lineStyle: LineStyle.Dotted,
				priceScaleId: "right",
				crosshairMarkerVisible: true,
				crosshairMarkerRadius: 4,
				crosshairMarkerBorderColor: "green",
				crosshairMarkerBackgroundColor: "green",
			})
			.setData([
				{ time: data[0].date, value: highestHigh },
				{ time: data[data.length - 1].date, value: highestHigh },
			]);
	}, [data]);

	return <div ref={containerRef} />;
};

export default CandlestickChart;