"use client";
import {
	ColorType,
	CrosshairMode,
	DeepPartial,
	LineStyle,
	LineWidth,
	TickMarkType,
	createChart,
} from "lightweight-charts";
import { useEffect, useRef, useMemo, useState } from "react";

interface CandlestickData {
	open: number;
	high: number;
	low: number;
	close: number;
	time: TimeType;
	// value: number;
}

interface Markers {
	time: TimeType;
	position: "aboveBar" | "belowBar";
	color: string;
	shape: "arrowUp" | "arrowDown";
	text: string;
	size: number;
}

const Page = () => {
	const chartContainerRef = useRef<HTMLDivElement>(null);
	const tooltipRef = useRef<HTMLDivElement>(null);

	const [candlePrice, setCandlePrice] = useState<CandlestickData | null>(
		null
	);
	const [linePrice, setLinePrice] = useState<CandlestickData | null>(null);

	const prevCandlePrice = useRef<CandlestickData | null>(null);
	const prevLinePrice = useRef<CandlestickData | null>(null);
	const [currentTime, setCurrentTime] = useState<string | null>(null);
	const [showTooltip, setShowTooltip] = useState<boolean>(false);

	const initialCandlestickData = useMemo<CandlestickData[]>(
		() => [
			{ open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 },
			{
				open: 9.55,
				high: 10.3,
				low: 9.42,
				close: 9.94,
				time: 1642514276,
			},
			{
				open: 9.94,
				high: 10.17,
				low: 9.92,
				close: 9.78,
				time: 1642600676,
			},
			{
				open: 9.78,
				high: 10.59,
				low: 9.18,
				close: 9.51,
				time: 1642687076,
			},
			{
				open: 9.51,
				high: 10.46,
				low: 9.1,
				close: 10.17,
				time: 1642773476,
			},
			{
				open: 10.17,
				high: 10.96,
				low: 10.16,
				close: 10.47,
				time: 1642859876,
			},
			{
				open: 10.47,
				high: 11.39,
				low: 10.4,
				close: 10.81,
				time: 1642946276,
			},
			{
				open: 10.81,
				high: 11.6,
				low: 10.3,
				close: 10.75,
				time: 1643032676,
			},
			{
				open: 10.75,
				high: 11.6,
				low: 10.49,
				close: 10.93,
				time: 1643119076,
			},
			{
				open: 10.93,
				high: 11.53,
				low: 10.76,
				close: 10.96,
				time: 1643205476,
			},
		],
		[]
	);

	const initialLineData = initialCandlestickData.map((item) => ({
		time: item.time,
		value: (item.close + item.high) / 2,
	}));

	const markers: Markers[] = [
		{
			time: 1642859876,
			position: "belowBar",
			color: "#f68410",
			shape: "arrowUp",
			text: "Sold",
			size: 1,
		},
		{
			time: 1643119076,
			position: "aboveBar",
			color: "#f68410",
			shape: "arrowDown",
			text: "Bought",
			size: 1,
		},
	];

	useEffect(() => {
		if (chartContainerRef.current) {
			const chart = createChart(chartContainerRef.current);

			// ایجاد چارت با استفاده از مخزن مربوطه در DOM
			chart.applyOptions({
				// تنظیمات ظاهری چارت از جمله رنگ زمینه و متن
				layout: {
					background: { color: "#222" },
					textColor: "#DDD",
				},
				grid: {
					// تنظیمات خطوط شبکه افقی و عمودی
					vertLines: { color: "#444" },
					horzLines: { color: "#444" },
				},
				// تنظیم عرض و ارتفاع چارت
				width: chartContainerRef.current.clientWidth,
				height: 650,
				crosshair: {
					mode: CrosshairMode.Normal, // تنظیم حالت معمولی برای crosshair
					vertLine: {
						width: 5 as DeepPartial<LineWidth>,
						color: "#C3BCDB44",
						style: LineStyle.Solid,
						labelBackgroundColor: "#9B7DFF",
					},
					horzLine: {
						color: "#9B7DFF",
						labelBackgroundColor: "#9B7DFF",
					},
				},
				localization: {
					locale: "en-DE",
					// تنظیم فرمت زمان برای crosshair
					timeFormatter: (time: TimeType) => {
						const date = new Date(time * 1000);
						const dateFormatter = new Intl.DateTimeFormat("en-DE", {
							hour: "numeric",
							minute: "numeric",
							month: "short",
							day: "numeric",
							year: "2-digit",
						});
						return dateFormatter.format(date);
					},
					// تنظیم فرمت قیمت
					priceFormatter: (price: number | bigint) => {
						const myPrice = new Intl.NumberFormat("en-DE", {
							style: "currency",
							currency: "EUR",
							minimumFractionDigits: 0,
						}).format(price);
						return myPrice;
					},
				},
			});

			const lineSeries = chart.addLineSeries();
			const candlestickSeries = chart.addCandlestickSeries();

			// اعمال تنظیمات چارت کندل‌استیک
			candlestickSeries.applyOptions({
				upColor: "#26a69a",
				downColor: "#ef5350",
				borderVisible: false,
				wickUpColor: "#26a69a",
				wickDownColor: "#ef5350",
				priceScaleId: "right",
			});

			// اعمال تنظیمات چارت خطی
			lineSeries.applyOptions({
				color: "#2962FF",
				lineWidth: 1,
				priceScaleId: "left",
			});

			// اعمال تنظیمات محورهای قیمت
			chart.applyOptions({
				rightPriceScale: {
					visible: true,
					borderColor: "#71649C",
				},
				leftPriceScale: {
					visible: true,
					borderColor: "#71649C",
				},
			});

			// اعمال تنظیمات محور زمان
			chart.timeScale().applyOptions({
				borderColor: "#71649C",
				timeVisible: true,
				rightOffset: 20,
				fixLeftEdge: true,
				fixRightEdge: true,
				// تنظیم فرمت نشانگرهای زمان
				tickMarkFormatter: (time: TimeType, tickMarkType: any) => {
					const date = new Date(time * 1000);

					switch (tickMarkType) {
						case TickMarkType.Year:
							return date.getFullYear();
						case TickMarkType.Month:
							const monthFormatter = new Intl.DateTimeFormat(
								"en-DE",
								{
									month: "short",
								}
							);
							return monthFormatter.format(date);

						case TickMarkType.DayOfMonth:
							return date.getDate();

						case TickMarkType.Time:
							const timeFormatter = new Intl.DateTimeFormat(
								"en-DE",
								{
									hour: "numeric",
									minute: "numeric",
								}
							);
							return timeFormatter.format(date);

						case TickMarkType.TimeWithSeconds:
							const timeWithSecondsFormatter =
								new Intl.DateTimeFormat("en-DE", {
									hour: "numeric",
									minute: "numeric",
									second: "numeric",
								});
							return timeWithSecondsFormatter.format(date);
						default:
							return "";
					}
				},
			});

			// تابعی برای پاسخگویی به تغییر اندازه پنجره
			const handleResize = () => {
				chart.applyOptions({
					width: chartContainerRef.current?.clientWidth,
				});
			};

			// اضافه کردن رویدادگیر برای تغییر اندازه پنجره
			window.addEventListener("resize", handleResize);

			// تنظیم داده‌ها برای چارت‌ها
			candlestickSeries.setData(initialCandlestickData);
			lineSeries.setData(initialLineData);

			// اضافه کردن نشانگرها به چارت
			candlestickSeries.setMarkers(markers);

			// پاسخگویی به حرکت crosshair و به روز رسانی اطلاعات نمودار
			chart.subscribeCrosshairMove((param) => {
				if (param.time) {
					const candlePriceData =
						param.seriesData.get(candlestickSeries);
					if (
						JSON.stringify(candlePriceData) !==
						JSON.stringify(prevCandlePrice.current)
					) {
						setCandlePrice(candlePriceData);
						prevCandlePrice.current = candlePriceData;
					}

					const linePriceData = param.seriesData.get(lineSeries);
					if (
						JSON.stringify(linePriceData) !==
						JSON.stringify(prevLinePrice.current)
					) {
						setLinePrice(linePriceData);
						prevLinePrice.current = linePriceData;
					}

					const coordinate = lineSeries.priceToCoordinate(
						linePriceData?.value
					);

					const shiftedCoordinate = param.point?.x;

					if (tooltipRef.current) {
						tooltipRef.current.style.left =
							shiftedCoordinate + "px";
						tooltipRef.current.style.top = coordinate + "px";
					}

					setCurrentTime(
						param.time
							? new Date(param.time).toLocaleDateString()
							: null
					);

					setShowTooltip(true);
				} else {
					setCandlePrice(null);
					setLinePrice(null);
					prevCandlePrice.current = null;
					prevLinePrice.current = null;
					setShowTooltip(false);
				}
			});

			// تنظیم مقیاس زمانی به طور خودکار
			chart.timeScale().fitContent();

			// پاک کردن چارت و حذف رویدادگیر
			return () => {
				chart.remove();
				window.removeEventListener("resize", handleResize);
			};
		}
	}, [initialCandlestickData, initialLineData]);


	return (
		<div ref={chartContainerRef} className="mt-5">
			<div
				ref={tooltipRef}
				className={`flex flex-col justify-center items-center gap-1 absolute w-32 h-24 border rounded-lg border-white z-50 text-black bg-cyan-500 ${
					showTooltip ? "block" : "hidden"
				}`}
			>
				<h3>Geniobits</h3>
				<p>{linePrice?.value.toFixed(2)}</p>
				<p>{currentTime}</p>
			</div>
			<div className="absolute top-5 left-28 z-20 text-white">
				<div>LightWeight Charts</div>
				{candlePrice && (
					<div className="flex items-center gap-3">
						<div>Open: {candlePrice.open}</div>
						<div>High: {candlePrice.high}</div>
						<div>Low: {candlePrice.low}</div>
						<div>Close: {candlePrice.close}</div>
					</div>
				)}
				{linePrice && <div>Value: {linePrice.value.toFixed(2)}</div>}
			</div>
		</div>
	);
};

export default Page;
