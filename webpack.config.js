const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: 'production',
    module: {
        rules: [
            {
                // 対象となるファイルの拡張子(.js)
                test: /\.js$/,
                use: [
                    {
                        // Babel を利用する
                        loader: "babel-loader",
                        // Babel のオプションを指定する
                        options: {
                            presets: [
                                // プリセットを指定することで、ES2019 を ES5 に変換
                                "@babel/preset-env"
                            ]
                        }
                    }
                ]
            },
            {
                // 対象となるファイルの拡張子(.scss)
                test: /\.scss$/,
                // Sassファイルの読み込みとコンパイル
                use: ExtractTextPlugin.extract([
                    // CSSをバンドルするための機能
                    {
                        loader: 'css-loader',
                        options: {
                            // オプションでCSS内のurl()メソッドの取り込まない
                            url: true,
                            // ソースマップの利用有無
                            sourceMap: true,
                            // Sass+PostCSSの場合は2を指定
                            importLoaders: 2
                        },
                    },
                    // PostCSSのための設定
                    {
                        loader: 'postcss-loader',
                        options: {
                            // PostCSS側でもソースマップを有効にする
                            sourceMap: true,
                            // ベンダープレフィックスを自動付与する
                            plugins: () => [require('autoprefixer')]
                        },
                    },
                    // Sassをバンドルするための機能
                    {
                        loader: 'sass-loader',
                        options: {
                            // ソースマップの利用有無
                            sourceMap: true,
                        }
                    }
                ]),
            },
            {
                // 対象となるファイルの拡張子
                test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/,
                // 画像をBase64として取り込む
                loader: "url-loader"
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
    ],
    // source-map方式でないと、CSSの元ソースが追跡できないため
    devtool: "source-map"
};