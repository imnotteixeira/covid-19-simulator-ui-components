import React from "react";
import { ResponsiveLineCanvas } from "@nivo/line";

const GeneralChart = ({ data, legendSize }) => (
    <ResponsiveLineCanvas
        data={data}
        margin={{ top: 50, right: 50, bottom: 100, left: 60 }}
        xScale={{ type: "linear", min: 0, max: "auto"  }}
        yScale={{ type: "linear", stacked: false, min: 0, max: "auto" }}
        curve="monotoneX"
        axisTop={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Time (Days)",
            legendOffset: 36,
            legendPosition: "middle",
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Individuals",
            legendOffset: -40,
            legendPosition: "middle",
        }}
        enableGridX={false}
        colors={{ scheme: "nivo" }}
        lineWidth={1}
        pointSrize={4}
        pointColor={{ theme: "background" }}
        pointBorderWidth={1}
        pointBorderColor={{ from: "serieColor" }}
        enablePointLabel={false}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 80,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: legendSize || 120,
                itemHeight: 12,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                    {
                        on: "hover",
                        style: {
                            itemBackground: "rgba(0, 0, 0, .03)",
                            itemOpacity: 1,
                        },
                    },
                ],
            },
        ]}
    />
);

export default GeneralChart;
