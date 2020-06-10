/* istanbul ignore file */
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#A10115",
        },
        secondary: {
            main: "#D72C16",
        },
        tertiary: {
            main: "#F0EFEA",
        },
    },
    status: {
        danger: "orange",
    },
    typography: {
        fontFamily: [
            "Poppins",
            "Roboto",
            "sans-serif",
        ].join(","),
        useNextVariants: true,
    },

});
export default theme;
