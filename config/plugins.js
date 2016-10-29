var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var envFile = require('node-env-file');

// Get development environment and current working directory
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PWD = process.cwd();

// In production (i.e. on heroku), we won't use an ENV file
// instead we use a heroku environment variable with the same vars
try {
    envFile(path.join(process.env.PWD, 'config/' + process.env.NODE_ENV + '.env'));
} catch(e) {
}

// Returns a concatenated list of plugins depending on
// whether environment is development or production
var configure = () => {

    // All dev plugins go here
    var dev = [
        new webpack.HotModuleReplacementPlugin()
    ];

    // Shared plugins (i.e. both dev and prod) go here
    var shared = [
        new HtmlWebpackPlugin({
            template: './app/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                MAPBOXGL_ACCESS_TOKEN: JSON.stringify(process.env.MAPBOXGL_ACCESS_TOKEN),
                MONGO_DB_URL: JSON.stringify(process.env.MONGO_DB_URL)
                //AWS_ACCESS_KEY: JSON.stringify(process.env.AWS_ACCESS_KEY),
                //AWS_SECRET_KEY: JSON.stringify(process.env.AWS_SECRET_KEY)
            }
        })
    ];

    // Prod plugins here
    var prod = [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            },
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ];

    // Pick which plugins to return
    return process.env.NODE_ENV === 'production' ? shared.concat(prod) : shared.concat(dev);
    //if (process.env.NODE_ENV === 'production') {
        //return shared.concat(prod);
    //} else {
        //return shared.concat(dev);
    //}
};

module.exports = configure();
