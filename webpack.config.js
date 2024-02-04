const path = require("path");

module.exports = {
    entry: {
        popup: path.join(__dirname, "src/App.tsx"),
        selectText: path.join(__dirname, "src/SelectText.tsx"),
        modal: path.join(__dirname, "src/Modal.tsx"),
        scrollBar: path.join(__dirname, "src/ScrollBar.tsx"),
        configMenu: path.join(__dirname, "src/settings/ConfigMenu.tsx"),
        help: path.join(__dirname, "src/settings/Help.tsx"),
        context: path.join(__dirname, "src/logics/Context.tsx"),
        background: path.join(__dirname, "src/logics/background.ts"),
        util: path.join(__dirname, "src/logics/utils.ts"),

    },
    output: {
        path: path.join(__dirname, "dist/js"),
        filename: "[name].js"
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        },
        {
            exclude: /node_modules/,
            test: /\.ts?$/,
            use: "ts-loader"
        },
        {
            include: [/node_modules/, "/src/*"],
            test: /\.css$/,
            use: [
                "style-loader",
                {
                    loader: "css-loader" // Translates CSS into CommonJS
                }
            ]
        }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            "styled-components": path.resolve("./node_modules", "styled-components"),
        },
    }
};
