const path = require("path");
// const pkg = require("./package.json");

// const libraryName = pkg.name;

module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "index.js",
        libraryTarget: "commonjs2",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: "babel-loader",
            },
        ],
    },
    resolve: {
        alias: {
            "@material-ui/core": path.resolve(__dirname, "./node_modules/@material-ui/core"),
            "react": path.resolve(__dirname, "./node_modules/react"),
            "react-router-dom": path.resolve(__dirname, "./node_modules/react-router-dom"),
        },
    },
    externals: [
        {
        // Don't bundle react or react-dom
            react: {
                commonjs: "react",
                commonjs2: "react",
                amd: "React",
                root: "React",
            },
            "react-dom": {
                commonjs: "react-dom",
                commonjs2: "react-dom",
                amd: "ReactDOM",
                root: "ReactDOM",
            },
        },
        /^@material-ui\/(core|icons)[\/a-zA-Z]*/,
    ],

};
