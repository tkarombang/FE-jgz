const path = require('path'); // Menambahkan import path
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Import HtmlWebpackPlugin

module.exports = {
  // entry: './src/App.ts',  // Sesuaikan dengan path entry file kamu
  entry: './src/main.tsx',  // Sesuaikan dengan path entry file kamu
  output: {
    filename: 'bundle.js', // Output bundle file
    path: path.resolve(__dirname, 'dist'),  // Pastikan output file ditempatkan di direktori dist
    clean: true,
    publicPath: "/"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // file HTML pertama
      filename: 'index.html'
    }),
    // new HtmlWebpackPlugin({
    //   template: './public/users.html', // file HTML kedua
    //   filename: 'users.html'
    // }),
    // new HtmlWebpackPlugin({
    //   template: './public/listDev.html', // file HTML ketiga
    //   filename: 'listDev.html'
    // })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],  // Resolusi untuk file .ts dan .js
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,   // Menangani file TypeScript
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Tambahkan Babel untuk mendukung React JSX
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
          }
        }
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),  // Folder yang berisi index.html
    },
    port: 3000,
    open: true,
    historyApiFallback: true, //matikan jika tidak refresh
  },
  mode: 'development'
};
