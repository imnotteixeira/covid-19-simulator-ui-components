import React from "react";
import { ResponsiveLineCanvas } from "@nivo/line";

const GeneralChart = ({ data }) => (
    <ResponsiveLineCanvas
        data={data}
        margin={{ top: 50, right: 160, bottom: 50, left: 60 }}
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
        // gridXValues={[0, 20, 40, 60, 80, 100, 120]}
        // gridYValues={[0, 500, 1000, 1500, 2000, 2500]}
        legends={[
            {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 140,
                translateY: 0,
                itemsSpacing: 2,
                itemDirection: "left-to-right",
                itemWidth: 80,
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
