const React = require("react");
const { ResponsiveHeatMap } = require("@nivo/heatmap");
const { Slider, makeStyles } = require("@material-ui/core");

const MATRIX_SIDE = 10;

const useStyles = makeStyles(() => ({
    heatMapSlider: {
        marginLeft: "50%",
        transform: "translateX(-50%)",
        width: "80%",
        maxWidth: "500px",
    },
}));

const getHeatMapData = (values) => {

    const getMatrixCellForIndividual = (i) => Math.floor(i * MATRIX_SIDE * MATRIX_SIDE / values.length);

    const result = Array.from(Array(MATRIX_SIDE).keys()).map((i) => ({
        column: i.toString(),
    }));

    values.forEach((value, i) => {
        const cell = getMatrixCellForIndividual(i);
        const y = Math.floor(cell / MATRIX_SIDE);
        const x = (cell % MATRIX_SIDE).toString();
        if (result[y][x] === undefined) result[y][x] = 0;
        result[y][x] += value;
    });

    return result;
};

const MatrixHeatMap = ({ values }) => {
    const [selectedStep, setSelectedStep] = React.useState(0);
    const data = getHeatMapData(values[selectedStep]);
    const classes = useStyles();
    return (
        <>
            <ResponsiveHeatMap
                data={data}
                keys={Array.from(Array(MATRIX_SIDE).keys()).map((i) => i.toString())}
                indexBy="column"
                margin={{ top: 100, right: 60, bottom: 60, left: 60 }}
                minValue={0}
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
                animate={true}
                motionStiffness={80}
                motionDamping={9}
                hoverTarget="cell"
                cellHoverOthersOpacity={0.25}
            />
            <Slider
                className={classes.heatMapSlider}
                value={selectedStep}
                onChange={(_, val) => setSelectedStep(val)}
                aria-labelledby="heat-map-display-day"
                max={values.length - 1}
                min={0}
                step={1}
            />
        </>
    );
};

module.exports = MatrixHeatMap;
