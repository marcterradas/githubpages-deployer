"use strict";
require('dotenv').config();
var githubUsername = process.env.GITHUB_USERNAME;
var githubPassword = process.env.GITHUB_PASSWORD;
var projectPath = process.env.PROJECT_PATH;
var githubPagePath = process.env.GITHUBPAGE_PATH;
console.log({ githubUsername: githubUsername, githubPassword: githubPassword, projectPath: projectPath, githubPagePath: githubPagePath });
