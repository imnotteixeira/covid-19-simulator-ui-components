const path = require("path");
const pkg = require("./package.json");

const libraryName = pkg.name;

module.exports = {
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "index.js",
        library: libraryName,
        libraryTarget: "umd",
        publicPath: "/dist/",
        umdNamedDefine: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [
                    path.resolve(__dirname, "node_modules"),
                ],
                include: [
                    path.resolve(__dirname, "src"),
                ],
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    resolve: {
        alias: {
            "react": path.resolve(__dirname, "./node_modules/react"),
            "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
        },
    },
    externals: {
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
};