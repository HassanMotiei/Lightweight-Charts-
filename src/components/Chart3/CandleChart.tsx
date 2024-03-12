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

import { CandlestickTypes } from "@/components/Chart3/CandlestickTypes";

interface Markers {
	time: TimeType;
	position: "aboveBar" | "belowBar";
	color: string;
	shape: "arrowUp" | "arrowDown";
	text: string;
	size: number;
}

const Page = ({
	initialCandleData,
	highestHighTime,
	lowestLowTime,
}: {
	initialCandleData: CandlestickTypes;
	highestHighTime: TimeType;
	lowestLowTime: TimeType;
}) => {
	const chartContainerRef = useRef<HTMLDivElement>(null);
	const tooltipRef = useRef<HTMLDivElement>(null);

	const [candlePrice, setCandlePrice] = useState<CandlestickTypes | null>(
		null
	);
	const [linePrice, setLinePrice] = useState<CandlestickTypes | null>(null);

	const prevCandlePrice = useRef<CandlestickTypes | null>(null);
	const prevLinePrice = useRef<CandlestickTypes | null>(null);
	const [currentTime, setCurrentTime] = useState<string | null>(null);
	const [showTooltip, setShowTooltip] = useState<boolean>(false);

		// حالا مقادیر مورد نیاز را به markers اضافه می‌کنیم
		const markers: Markers[] = [
			{
				time: lowestLowTime,
				position: "belowBar",
				color: "#dc2626",
				shape: "arrowUp",
				text: "Lowest low",
				size: 1,
			},
			{
				time: highestHighTime,
				position: "aboveBar",
				color: "#65a30d",
				shape: "arrowDown",
				text: "Highest high",
				size: 1,
			},
		];


	useEffect(() => {
		if (chartContainerRef.current) {
			// ایجاد یک چارت با استفاده از مخزن مربوطه در DOM
			const chart = createChart(chartContainerRef.current);

			// تنظیمات ظاهری چارت از جمله رنگ زمینه و رنگ متن
			chart.applyOptions({
				layout: {
					background: { color: "#222" }, // رنگ زمینه چارت
					textColor: "#DDD", // رنگ متن
				},
				grid: {
					vertLines: { color: "#444" }, // رنگ خطوط عمودی شبکه
					horzLines: { color: "#444" }, // رنگ خطوط افقی شبکه
				},
				width: chartContainerRef.current.clientWidth, // عرض چارت
				height: 650, // ارتفاع چارت
				crosshair: {
					mode: CrosshairMode.Normal, // حالت عادی برای crosshair
					vertLine: {
						width: 5 as DeepPartial<LineWidth>, // عرض خط عمودی crosshair
						color: "#C3BCDB44", // رنگ خط عمودی crosshair
						style: LineStyle.Solid, // استایل خط
						labelBackgroundColor: "#9B7DFF", // رنگ پس‌زمینه برچسب
					},
					horzLine: {
						color: "#9B7DFF", // رنگ خط افقی crosshair
						labelBackgroundColor: "#9B7DFF", // رنگ پس‌زمینه برچسب
					},
				},
				localization: {
					locale: "en-DE", // تنظیمات مربوط به محلی سازی برای فرمت زمان و قیمت
					// تابعی برای فرمت دهی به زمان
					timeFormatter: (time: TimeType) => {
						const date = new Date(time);
						const dateFormatter = new Intl.DateTimeFormat("en-DE", {
							hour: "numeric",
							minute: "numeric",
							month: "short",
							day: "numeric",
							year: "2-digit",
						});
						return dateFormatter.format(date);
					},
					// تابعی برای فرمت دهی به قیمت
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

			// const lineSeries = chart.addLineSeries(); // ایجاد یک سری خطی برای نمودار خطی
			const candlestickSeries = chart.addCandlestickSeries(); // ایجاد یک سری کندل‌استیک برای نمودار کندل‌استیک

			// تنظیم تنظیمات مختلف برای نمودار کندل‌استیک
			candlestickSeries.applyOptions({
				upColor: "#26a69a", // رنگ کندل هایی که قیمت آنها افزایش می‌یابد
				downColor: "#ef5350", // رنگ کندل هایی که قیمت آنها کاهش می‌یابد
				borderVisible: false, // نمایش حاشیه کندل‌ها
				wickUpColor: "#26a69a", // رنگ موشک‌های بالایی کندل‌ها
				wickDownColor: "#ef5350", // رنگ موشک‌های پایینی کندل‌ها
				priceScaleId: "right", // شناسه محور قیمت
			});

			// تنظیم تنظیمات برای نمودار خطی
			// lineSeries.applyOptions({
			// 	color: "#2962FF", // رنگ خط
			// 	lineWidth: 1, // عرض خط
			// 	priceScaleId: "left", // شناسه محور قیمت
			// });

			// تنظیم تنظیمات مختلف برای محورهای قیمت
			chart.priceScale("right").applyOptions({
				borderColor: "#71649C", // رنگ حاشیه محور قیمت سمت راست
				autoScale: false, // disables auto scaling based on visible content
				visible: true, // نمایش محور قیمت سمت راست
				scaleMargins: {
					top: 0.1,
					bottom: 0.2,
				},
			});
			// chart.applyOptions({
			// 	rightPriceScale: {
			// 		visible: true, // نمایش محور قیمت سمت راست
			// 		borderColor: "#71649C", // رنگ حاشیه محور قیمت سمت راست
			// 	},
			// leftPriceScale: {
			// 	visible: true, // نمایش محور قیمت سمت چپ
			// 	borderColor: "#71649C", // رنگ حاشیه محور قیمت سمت چپ
			// },
			// });

			// تنظیم تنظیمات برای محور زمان
			chart.timeScale().applyOptions({
				borderColor: "#71649C", // رنگ حاشیه محور زمان
				timeVisible: true, // نمایش محور زمان
				rightOffset: 20, // افست محور زمان از سمت راست
				fixLeftEdge: true, // ثابت نگه داشتن لبه چپ
				fixRightEdge: true, // ثابت نگه داشتن لبه راست
				barSpacing: 10,
				minBarSpacing: 5,
				// تنظیم فرمت دهی به زمان و تاریخ
				tickMarkFormatter: (time: any, tickMarkType: any) => {
					const date = new Date(time);
					let formattedTime = "";

					switch (tickMarkType) {
						case TickMarkType.Year:
							const yearFormatter = new Intl.DateTimeFormat(
								"en-DE",
								{
									year: "numeric",
								}
							);
							formattedTime = yearFormatter.format(date);
							break;
						case TickMarkType.Month:
							// اینجا برای نمایش ماه از فرمت مخصوص ماه استفاده می‌شود
							const monthFormatter = new Intl.DateTimeFormat(
								"en-DE",
								{
									month: "short",
								}
							);
							formattedTime = monthFormatter.format(date);
							break;
						case TickMarkType.DayOfMonth:
							// استفاده از تابع Intl.DateTimeFormat برای فرمت دهی به روز ماه
							formattedTime = date.getUTCDate().toString();
							break;
						case TickMarkType.Time:
							// استفاده از تابع Intl.DateTimeFormat برای فرمت دهی به زمان
							const timeFormatter = new Intl.DateTimeFormat(
								"en-DE",
								{
									hour: "numeric",
									minute: "numeric",
								}
							);
							formattedTime = timeFormatter.format(date);
							break;
						case TickMarkType.TimeWithSeconds:
							// استفاده از تابع Intl.DateTimeFormat برای فرمت دهی به زمان با ثانیه
							const timeWithSecondsFormatter =
								new Intl.DateTimeFormat("en-DE", {
									hour: "numeric",
									minute: "numeric",
									second: "numeric",
								});
							formattedTime =
								timeWithSecondsFormatter.format(date);
							break;
						default:
							formattedTime = "";
							break;
					}

					return formattedTime;
				},
			});

			// تعریف رویداد برای تغییر اندازه پنجره
			const handleResize = () => {
				chart.applyOptions({
					width: chartContainerRef.current?.clientWidth,
				});
			};

			window.addEventListener("resize", handleResize);

			// تنظیم داده های اولیه برای نمودار کندل‌استیک و نمودار خطی
			candlestickSeries.setData(initialCandleData);
			// lineSeries.setData(initialLineData);

			// اضافه کردن نشانگرها به چارت
			candlestickSeries.setMarkers(markers);

			// اشتراک گذاری حرکت crosshair
			// chart.subscribeCrosshairMove((param) => {
			// 	if (param.time) {
			// 		const candlePriceData =
			// 			param.seriesData.get(candlestickSeries);
			// 		if (
			// 			JSON.stringify(candlePriceData) !==
			// 			JSON.stringify(prevCandlePrice.current)
			// 		) {
			// 			setCandlePrice(candlePriceData);
			// 			prevCandlePrice.current = candlePriceData;
			// 		}

			// 		const linePriceData = param.seriesData.get(lineSeries);
			// 		if (
			// 			JSON.stringify(linePriceData) !==
			// 			JSON.stringify(prevLinePrice.current)
			// 		) {
			// 			setLinePrice(linePriceData);
			// 			prevLinePrice.current = linePriceData;
			// 		}

			// 		const coordinate = lineSeries.priceToCoordinate(
			// 			linePriceData?.value
			// 		);

			// 		tooltip
			// 		const shiftedCoordinate = param.point?.x;

			// 		if (tooltipRef.current) {
			// 			tooltipRef.current.style.left =
			// 				shiftedCoordinate + "px";
			// 			tooltipRef.current.style.top = coordinate + "px";
			// 		}

			// 		setCurrentTime(
			// 			param.time
			// 				? new Date(param.time).toLocaleDateString()
			// 				: null
			// 		);

			// 		setShowTooltip(true);
			// 	} else {
			// 		setCandlePrice(null);
			// setLinePrice(null);
			// 		prevCandlePrice.current = null;
			// prevLinePrice.current = null;
			// 		setShowTooltip(false);
			// 	}
			// });

			// تنظیم تناسب اندازه چارت
			chart.timeScale().fitContent();

			// حذف چارت و رویداد گیر
			return () => {
				chart.remove();
				window.removeEventListener("resize", handleResize);
			};
		}
	}, [initialCandleData && initialCandleData.length]);

	return (
		<div ref={chartContainerRef} className="mt-5">
			{/* <div
				ref={tooltipRef}
				className={`flex flex-col justify-center items-center gap-1 absolute w-32 h-24 border rounded-lg border-white z-50 text-black bg-cyan-500 ${
					showTooltip ? "block" : "hidden"
				}`}
			>
				<h3>Geniobits</h3>
				<p>{linePrice?.value.toFixed(2)}</p>
				<p>{currentTime}</p>
			</div> */}
			<div className="absolute left-5 z-20 text-white">
				<div>LightWeight Charts</div>
				{/* {candlePrice && (
					<div className="flex items-center gap-3">
						<div>Open: {candlePrice.open}</div>
						<div>High: {candlePrice.high}</div>
						<div>Low: {candlePrice.low}</div>
						<div>Close: {candlePrice.close}</div>
					</div>
				)} */}
				{/* {linePrice && <div>Value: {linePrice.value.toFixed(2)}</div>} */}
			</div>
		</div>
	);
};

export default Page;
