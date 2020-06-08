import React from "react";

import { GeneralChart, MatrixHeatMap } from "./index";
import {
    Grid,
    Typography,
    Paper,
    makeStyles,
    useMediaQuery,
} from "@material-ui/core";

const DISEASE_OUTCOMES_METRIC_LABELS = {
    "carrier-count": "Suspect Carriers",
    "dead-count": "Dead",
    "cured-count": "Cured",
    "hospitalized-count": "Hospitalized",
    "confirmed-carrier-count": "Confirmed Carriers",
};

const EPIDEMIC_METRIC_LABELS = {
    "r0": "R0 (Average Interactions)",
    "r": "R (Average Contaminations)",
};

const DISEASE_TESTING_METRIC_LABELS = {
    "positive-test-count": "New Confirmed Cases",
    "total-test-count": "Tests Made",
};

const useStyles = makeStyles((theme) => ({
    layoutElement: {
        height: "100%",
        padding: theme.spacing(4),
        boxSizing: "border-box",
    },
    layoutElementContent: {
        height: "90%",
    },
    mainGrid: {
        padding: theme.spacing(0, 4),
        "& > .MuiGrid-item": {
            height: "500px",
        },
    },
    epidemicStatsWrapper: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    epidemicStat: {
        textAlign: "center",
        padding: theme.spacing(2),
    },
}));

const LayoutElement = ({ title, children }) => {

    const classes = useStyles();

    return (
        <Paper elevation={4} className={classes.layoutElement}>
            <Typography variant="subtitle1">
                {title}
            </Typography>
            <div className={classes.layoutElementContent}>
                {children}
            </div>
        </Paper>
    );
};

const VisualizationsLayout = ({ metricData, simulationState }) => {
    const carriersHistory = metricData ? metricData["carriers-history"] : [];

    if (simulationState && simulationState.ended) console.log(metricData);

    /** ***************REFACTOR THIS *****/
    const diseaseOutcomesMetrics = [];
    const epidemicMetrics = [];
    const diseaseTestingMetrics = [];
    if (metricData) {
        Object.keys(metricData).forEach((metricId) => {
            if (Object.keys(DISEASE_OUTCOMES_METRIC_LABELS).includes(metricId)) {
                diseaseOutcomesMetrics.push({
                    id: DISEASE_OUTCOMES_METRIC_LABELS[metricId],
                    data: metricData[metricId].map((val, i) => ({ x: i, y: val })),
                });
            } else if (Object.keys(EPIDEMIC_METRIC_LABELS).includes(metricId)) {
                epidemicMetrics.push({
                    id: EPIDEMIC_METRIC_LABELS[metricId],
                    data: metricData[metricId].map((val, i) => ({ x: i, y: val })),
                });
            } else if (Object.keys(DISEASE_TESTING_METRIC_LABELS).includes(metricId)) {
                diseaseTestingMetrics.push({
                    id: DISEASE_TESTING_METRIC_LABELS[metricId],
                    data: metricData[metricId].map((val, i) => ({ x: i, y: val })),
                });
            }
        });
    }

    /** ****************************************/
    const classes = useStyles();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    return (
        <Grid container className={classes.mainGrid} spacing={4}>
            {metricData ?
                <>
                    <Grid item xs={12} md={8} >
                        <LayoutElement title="Disease Outcomes">
                            <GeneralChart
                                data={diseaseOutcomesMetrics}
                                isMobile={isMobile}
                            />
                        </LayoutElement>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <LayoutElement title="Disease Transmission">
                            {carriersHistory.length > 0 &&
                            <MatrixHeatMap
                                values={simulationState.ended ?
                                    carriersHistory
                                    : carriersHistory[carriersHistory.length - 1]
                                }
                                showLatestStep={!simulationState.ended}
                            />
                            }
                        </LayoutElement>
                    </Grid>
                    <Grid item xs={12} md={8} >
                        <LayoutElement title="Testing Details">
                            <GeneralChart
                                data={diseaseTestingMetrics}
                                legendSize={180}
                            />
                        </LayoutElement>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <LayoutElement title="Epidemic Analysis">
                            <div className={classes.epidemicStatsWrapper}>
                                <div className={classes.epidemicStat}>
                                    <Typography variant="subtitle1">
                                        Total Population
                                    </Typography>
                                    <Typography variant="h5">
                                        {simulationState.population.length}
                                    </Typography>
                                </div>
                                <div className={classes.epidemicStat}>
                                    <Typography variant="subtitle1">
                                        Total Dead
                                    </Typography>
                                    <Typography variant="h5">
                                        {`${simulationState.dead.length}`}
                                        {`(${(simulationState.dead.length / simulationState.population.length).toFixed(2)} %)`}
                                    </Typography>
                                </div>
                                <div className={classes.epidemicStat}>
                                    <Typography variant="subtitle1">
                                        Epidemic Duration
                                    </Typography>
                                    <Typography variant="h5">
                                        {`${simulationState.step} days`}
                                    </Typography>
                                </div>
                            </div>
                        </LayoutElement>
                    </Grid>
                    <Grid item xs={12} md={8} >
                        <LayoutElement title="Epidemic Ratios">
                            <GeneralChart
                                data={epidemicMetrics}
                                legendSize={180}
                            />
                        </LayoutElement>
                    </Grid>
                </>
                : <p>No Metrics yet..</p>
            }
        </Grid>
    );
};

export default VisualizationsLayout;
