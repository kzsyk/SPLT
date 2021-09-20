const path = require("path");

module.exports = {

    entry: {
        popup: path.join(__dirname, "src/Popup.tsx"),
        selectText: path.join(__dirname, "src/SelectText.tsx"),
        background: path.join(__dirname, "src/background.ts"),
        splitText: path.join(__dirname, "src/splitText.ts"),
        Modal: path.join(__dirname, "src/Modal.tsx"),
        ConfigMenu: path.join(__dirname, "src/ConfigMenu.tsx"),
        Dropdown: path.join(__dirname, "src/Dropdown.tsx"),
        Editor: path.join(__dirname, "src/Editor.tsx"),
        ScrollBar: path.join(__dirname, "src/ScrollBar.tsx"),
        Context: path.join(__dirname, "src/Context.tsx")
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
            include: [/node_modules/, "/src/background/*", "/src/Dropdown/*"],
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
