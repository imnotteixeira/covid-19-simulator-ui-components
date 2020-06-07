import React from "react";
import { ResponsiveHeatMapCanvas } from "@nivo/heatmap";
import { Slider, makeStyles, Typography } from "@material-ui/core";

const MATRIX_SIDE = 10;

const useStyles = makeStyles(() => ({
    heatMapSlider: {
        width: "70%",
    },
    wrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
    },
    mapWrapper: {
        width: "100%",
        height: "90%",
    },
}));

const getMatrixCellForIndividual = (i, totalIndividuals) => Math.floor(i * MATRIX_SIDE * MATRIX_SIDE / totalIndividuals);
const getHeatMapData = (values) => {

    const result = Array.from(Array(MATRIX_SIDE).keys()).map((i) => ({
        line: i.toString(),
    }));

    values.forEach((value, i) => {
        const cell = getMatrixCellForIndividual(i, values.length);
        const y = Math.floor(cell / MATRIX_SIDE);
        const x = (cell % MATRIX_SIDE).toString();
        if (result[x][y] === undefined) result[x][y] = 0;
        result[x][y] += value;
    });


    return result;
};

const MatrixHeatMap = ({ values: metricValues, showLatestStep }) => {

    const [selectedStep, setSelectedStep] = React.useState(0);
    const values = showLatestStep ? metricValues : metricValues[selectedStep];
    const [data, setData] = React.useState(getHeatMapData(values));


    React.useEffect(() => {
        if (!showLatestStep) setData(getHeatMapData(metricValues[selectedStep]));
        else setData(getHeatMapData(metricValues));
    }, [showLatestStep, metricValues, selectedStep]);


    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <div className={classes.mapWrapper}>
                <ResponsiveHeatMapCanvas
                    data={data}
                    keys={Array.from(Array(MATRIX_SIDE).keys()).map((i) => i.toString())}
                    indexBy="line"
                    margin={{ top: 100, right: 60, bottom: 60, left: 60 }}
                    minValue={0}
                    maxValue={values.every((el) => el === 0) ? 1 : "auto"}
                    tooltip={({ xKey, yKey, value }) => (
                        <Typography variant="caption">
                            {`(x:${xKey}, y:${yKey})  ${value} Carrier(s)`}
                        </Typography>
                    )}
                    forceSquare={true}
                    sizeVariation={0.7}
                    colors="reds"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={null}
                    axisLeft={null}
                    cellShape="circle"
                    cellOpacity={1}
                    cellBorderColor={{ from: "color", modifiers: [["darker", 0.4]] }}
                    enableLabels={false}
                    labelTextColor={{ from: "color", modifiers: [["darker", 1.8]] }}
                    defs={[
                        {
                            id: "lines",
                            type: "patternLines",
                            background: "inherit",
                            color: "rgba(0, 0, 0, 0.1)",
                            rotation: -45,
                            lineWidth: 4,
                            spacing: 7,
                        },
                    ]}
                    fill={[{ id: "lines" }]}
                    hoverTarget="cell"
                    cellHoverOthersOpacity={0.25}
                />
            </div>
            {!showLatestStep &&

                <Slider
                    className={classes.heatMapSlider}
                    color="primary"
                    value={selectedStep}
                    onChange={(_, val) => setSelectedStep(val)}
                    aria-labelledby="heat-map-display-day"
                    max={metricValues.length - 1}
                    min={0}
                    step={1}
                />
            }
        </div>
    );
};

export default MatrixHeatMap;
