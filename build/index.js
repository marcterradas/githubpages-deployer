"use strict";
require('dotenv').config();
var exec = require('child_process').exec;
// env variables
var githubUsername = process.env.GITHUB_USERNAME;
var githubPassword = process.env.GITHUB_PASSWORD;
var projectPath = process.env.PROJECT_PATH;
var githubPagePath = process.env.GITHUBPAGE_PATH;
// 1. build project
var buildQuery = "npm run build --prefix " + projectPath;
exec(buildQuery, function (err, stdout, stderr) {
    console.log(err, stdout, stderr);
});
