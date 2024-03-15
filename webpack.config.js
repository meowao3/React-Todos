// webpack.config.js

module.exports = {
    // Other webpack configuration options...
    module: {
      rules: [
        {
          test: /\.tsx?$/, // Match TypeScript files
          exclude: /node_modules/, // Exclude files in node_modules directory
          use: 'ts-loader'// Use ts-loader for handling TypeScript files
        },
        {
          test: /\.js$/, // Match JavaScript files
          exclude: /node_modules/, // Exclude files in node_modules directory
          use: {
            loader: 'babel-loader', // Use babel-loader for transpilation
          },
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'], // Resolve these file extensions
    },
  };
  