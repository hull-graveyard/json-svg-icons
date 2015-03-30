"use strict";
/*global require, console*/

var webpack = require('webpack');
var svg2json = require("gulp-svg2json");
var gulp = require("gulp");
var gutil = require("gulp-util");
var runSequence = require("run-sequence");
var WebpackDevServer = require("webpack-dev-server");
var notifier = require("node-notifier");
var _ = require('underscore')

var notify = function(message){
  notifier.notify({title: config.displayName+" Gulp",message:message});
};

// Handle Gulp Errors
var handleError = function(err, taskName){
  if(err){
    notify(taskName+" Error: "+ err);
    throw new gutil.PluginError("webpack:build", err);
  }
};
// Get our Config.
var config = require("./config");
var webpackConfig = require("./webpack.config");

// Task Bundles
gulp.task("default", ["icons:watch"]);
gulp.task("default", ["server"]);
gulp.task("serve",   ["server"]);

gulp.task("server",  function(callback) {runSequence("icons", "copy-files", "webpack:server", callback); });
gulp.task("build",   function(callback) {runSequence("icons", "copy-files", "webpack:build", callback); });
gulp.task("deploy",  function(callback) {runSequence("build", "gh:deploy", callback); });


// Copy static files from the source to the destination
var copyFiles = function(callback){
  _.map(config.files,function(dest, src){ gulp.src(src).pipe(gulp.dest(dest)); });
  notify("Vendors Updated");
  if(_.isFunction(callback)) {
    callback();
  }
};

var processIcons = function(){
  return gulp.src("src/svg/**.svg")
  .pipe(svg2json({fileName:'index.js'}))
  .pipe(gulp.dest("dist"));
};

// One-time file copy
gulp.task("copy-files", copyFiles);

// Watch files for changes and copy them
gulp.task("copy-files:watch", function(){
  copyFiles();
  gulp.watch(_.keys(config.files),copyFiles);
});


gulp.task("icons", processIcons);
gulp.task("icons:watch", function(){
  gulp.watch("./src/svg/**.svg", processIcons());
});

var webpackDevCompiler = webpack(webpackConfig.development.browser);

// Launch webpack dev server.
gulp.task("webpack:server", function() {
  var taskName = "webpack:server";
  var server = new WebpackDevServer(webpackDevCompiler, {
    contentBase: config.outputFolder,
    publicPath: "/"+config.assetsFolder,
    headers: { "Access-Control-Allow-Origin": "*" },
    hot: config.hotReload,
    stats: {colors: true }
  }).listen(config.serverPort, function(err) {
    handleError(err, taskName);
    // Dump the preview URL in the console, and open Chrome when launched for convenience.
    var url = webpackConfig.development.browser.output.publicPath+"webpack-dev-server/";
    gutil.log("["+taskName+"] started at ", url);
    notify({message:"Dev Server Started"});
  });
});
