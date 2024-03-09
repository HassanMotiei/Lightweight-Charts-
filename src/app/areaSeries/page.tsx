"use client";
import { ColorType, createChart } from "lightweight-charts";
import { useEffect, useRef, useMemo } from "react";

const Page = () => {
	const chartContainerRef = useRef<HTMLDivElement>(null);

	const initialData = useMemo(
		() => [
			{ time: "2019-04-11", value: 80.01 },
			{ time: "2019-04-12", value: 96.63 },
			{ time: "2019-04-13", value: 76.64 },
			{ time: "2019-04-14", value: 81.89 },
			{ time: "2019-04-15", value: 74.43 },
			{ time: "2019-04-16", value: 80.01 },
			{ time: "2019-04-17", value: 96.63 },
			{ time: "2019-04-18", value: 76.64 },
			{ time: "2019-04-19", value: 81.89 },
			{ time: "2019-04-20", value: 74.43 },
		],
		[]
	);

	useEffect(() => {
		if (chartContainerRef.current) {
			const chart = createChart(chartContainerRef.current, {
				layout: {
					textColor: "black",
					background: { type: ColorType.Solid, color: "white" },
				},
				width: chartContainerRef.current.clientWidth,
				height: 600,
			});
			const areaSeries = chart.addAreaSeries({
				lineColor: "#2962FF",
				topColor: "#2962FF",
				bottomColor: "rgba(41, 98, 255, 0.28)",
			});
			areaSeries.setData(initialData);
            chart.timeScale().fitContent();
			return () => chart.remove(); // directly return the destructor function
		}
	}, [initialData]);

	return <div ref={chartContainerRef}></div>;
};

export default Page;
