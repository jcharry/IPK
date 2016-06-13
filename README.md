##Notes (rather, things to remember)

####Mapbox config
Mapbox doesn't configure out of the box with webpack... See:
(https://github.com/mapbox/mapbox-gl-js#using-mapbox-gl-js-with-webpack) for
Mapbox's instructions on setting up webpack.

Also, this was pretty helpful: 
(https://github.com/uber/react-map-gl/issues/21)
and this:
(https://mikewilliamson.wordpress.com/2016/02/24/using-mapbox-gl-and-webpack-together/)

To get things things going, we to add some loaders (and a postLoader) to our config file:
```javascipt
    loaders: [
        {
            test: /\.js$/,
            include: path.resolve('../node_modules/mapbox-gl/js/render/painter/use_program.js'),
            loader: 'transform/cacheable?brfs'
        },
        {
            test: /\.js$/,
            include: path.resolve('../node_modules/mapbox-gl/js/render/shaders.js'),
            loader: 'transform/cacheable?brfs'
        },
        {
            test: /\.js$/,
            include: path.resolve('../node_modules/webworkify/index.js'),
            loader: 'worker'
        }
    ],
    postLoaders: [{
        include: /node_modules\/mapbox-gl-shaders/,
        loader: 'transform',
        query: 'brfs'
    }]
```

We also need to alias webworkify-webpack

```javascript
    resolve: {
        extensions: ['', '.js'],
        alias: {
            'webworkify': 'webworkify-webpack'
        }
    },
```

There's a strange issue where if using versions of `webworkify-webpack` other than *1.0.6*, an error is thrown in the browser - `Cannot read property "call" of undefined` - which is resolved by locking in webworkify to version *1.0.6*

####Babel install - a few issues:
Originally I followed Babel's setup instructions, which had me installing `babel`
directly - i.e. npm install `babel`, but apparently the functionality has shifted
into `babel-core`. `babel` is depracated.  When I attempted to push webpack to build on heroku, rather
than prior to deploy, everything worked fine, but checking heroku's logs
I found that there was an issue with the `babel` library, and it suggested
switching to `babel-core`.  `babel-core` and `babel-loader` were approriately set up
fixed this issue.

####Note: don't track compiled files, it can mess with heroku deployment. 
Anything built by webpack should be ignored in version control

###File structure - so I can remember in a few weeks from now
---
|-- app/
|   |-- components/
|       |-- **components files go here**
|   |-- data/
|       |-- **all data that we want to use in the app goes here**
|   |-- styles/
|       |-- components/
|           |-- **scss partials, make sure they're prefixed with _
|       |-- main.scss - master sass file
|   |-- app.js - app entry point
|   |-- index.html - html template, bundle.js gets added by webpack
|-- config/
|   |-- **webpack config partials go here**
|-- dist/
|   |-- **webpack built files end up here, don't track this stuff**
|-- node_modules - **don't track**
|-- package.json
|-- server.js - simple express server
|-- webpack.config.js - grabs partials from `./config`




