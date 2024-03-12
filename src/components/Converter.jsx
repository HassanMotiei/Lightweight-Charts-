"use client"
import React, { useEffect } from 'react';

const Converter = () => {
	useEffect(() => {
		const textFilePath = '/data.txt';

		fetch(textFilePath)
			.then(response => response.text())
			.then(data => {
				const lines = data.trim().split('\n');
				const jsonData = lines.map(line => {
					const [Date, Time, Open, High, Low, Last, Volume, NumberOfTrades, BidVolume, AskVolume] = line.split(', ');
					return {
						Date,
						Time,
						Open: parseFloat(Open),
						High: parseFloat(High),
						Low: parseFloat(Low),
						Last: parseFloat(Last),
						Volume: parseInt(Volume),
						NumberOfTrades: parseInt(NumberOfTrades),
						BidVolume: parseInt(BidVolume),
						AskVolume: parseInt(AskVolume)
					};
				});

				const jsonString = JSON.stringify(jsonData, null, 2);
				console.log(jsonString); // نمایش داده‌های JSON در کنسول

				// می‌توانید اینجا کدی برای ذخیره کردن داده‌های JSON انجام دهید، مانند ذخیره کردن در localStorage یا ارسال به سمت سرور
			})
			.catch(error => {
				console.error('Error reading file:', error);
			});
	}, []);

	return (
		<div>
			<h1>Data Converter</h1>
			<p>Converting data from text to JSON...</p>
		</div>
	);
};

export default Converter;
