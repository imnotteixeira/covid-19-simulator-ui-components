import React from "react";
import { ResponsiveHeatMapCanvas } from "@nivo/heatmap";
import { Slider, makeStyles, Typography } from "@material-ui/core";

const MATRIX_SIDE = 20;

const useStyles = makeStyles((theme) => ({
    heatMapSliderWrapper: {
        width: "100%",
        padding: theme.spacing(1),
        display: "flex",
    },
    heatMapSlider: {
        // width: "100%",
        // padding: theme.spacing(2),
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
    sliderWrapper: {
        display: "flex",
        width: "70%",
    },
    sliderLabel: {
        display: "flex",
        alignItems: "center",
        width: "80px",
        padding: theme.spacing(1),
    },
}));

const convertToXYCoord = (index, matrixSide) => ([Math.floor(index / matrixSide), index % matrixSide]);

const getMatrixCellForIndividual = (i, totalIndividuals) => {

    const originalMatrixSide = Math.round(Math.sqrt(totalIndividuals));
    return convertToXYCoord(i, originalMatrixSide)
        .map((coord) => Math.floor(coord * MATRIX_SIDE / originalMatrixSide));
};

const getHeatMapData = (values) => {

    const result = Array.from(Array(MATRIX_SIDE).keys()).map((i) => ({
        line: i.toString(),
    }));

    values.forEach((value, i) => {
        const [line, col] = getMatrixCellForIndividual(i, values.length);
        if (result[line][col] === undefined) result[line][col] = 0;
        result[line][col] += value;
    });

    return result;
};

const MatrixHeatMap = ({ values: metricValues, showLatestStep }) => {

    const [selectedStep, setSelectedStep] = React.useState(0);
    React.useEffect(() => {
        if (!showLatestStep) setSelectedStep(metricValues.length - 1);
    }, [showLatestStep]);

    const values = showLatestStep ? metricValues : metricValues[selectedStep];
    const data = getHeatMapData(values);


    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <div className={classes.mapWrapper}>
                <ResponsiveHeatMapCanvas
                    data={data}
                    keys={Array.from(Array(MATRIX_SIDE).keys()).map((i) => i.toString())}
                    indexBy="line"
                    margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
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
                <div className={classes.sliderWrapper}>
                    <div className={classes.sliderLabel}>
                        <Typography variant="caption">
                            {`Day ${selectedStep}`}
                        </Typography>
                    </div>
                    <div className={classes.heatMapSliderWrapper}>
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
                    </div>
                </div>
            }
        </div>
    );
};

export default MatrixHeatMap;
