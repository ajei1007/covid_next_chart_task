"use client"

import { useEffect, useRef, useState } from "react";
import { Chart } from "@antv/g2";
import { fetchCovidData } from "@/utils/fetchCovidData";

interface Data {
    Date: string;
    Value: number;
}

interface CovidData {
    date: string;
    metric_value: number;
}

interface ChartComponentProps {
    url: string;
    type: string;
}

export function ChartComponent({ url, type }: ChartComponentProps) {
    const chartRef = useRef<HTMLDivElement | null>(null);
    const [chartData, setChartData] = useState<Data[]>([]);

    useEffect(() => {
        async function getData() {
            const data = await fetchCovidData(url);
            if (data) {
                const transformedData = data.map((item: CovidData) => ({
                    Date: item.date,
                    Value: item.metric_value,
                }));
                setChartData(transformedData);
            }
        }
        getData();
    }, [url]);

    useEffect(() => {
        if (chartRef.current && chartData.length > 0) {
            const chart = new Chart({
                container: chartRef.current,
                autoFit: true,
                height: 400,
            });

            chart.data(chartData);

            chart.scale({
                Date: {
                    tickCount: 10
                },
                Value: {
                    nice: true,
                }
            });

            chart.axis('Date', {
                label: {
                    formatter: (text: string) => {
                        const dataStrings = text.split('-');
                        return dataStrings[1] + '-' + dataStrings[2];
                    },
                },
            });

            if (type === "line") {
                chart
                    .line()
                    .encode('x', 'Date')
                    .encode('y', 'Value');
            } else {
                chart
                    .interval()
                    .encode('x', 'Date')
                    .encode('y', 'Value');
            }

            chart.render();

            return () => {
                chart.destroy();
            };
        }
    }, [chartData, type]);

    return <div ref={chartRef}></div>;
}
