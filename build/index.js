"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var performance = require('perf_hooks').performance;
var promisify = require('util').promisify;
var exec = promisify(require('child_process').exec);
var question = require('readline-sync').question;
var projectPath = process.env.PROJECT_PATH;
var githubPagePath = process.env.GITHUBPAGE_PATH;
/**
 * init method
 * @returns { Promise<boolean> } false if any error, true if all okay.
 */
var init = function () { return __awaiter(void 0, void 0, void 0, function () {
    var commitMessage, startTime, startBuildTime, buildResponse, endBuildTime, startCleanFolderTime, cleanFolderResponse, endCleanFolderTime, startMoveDistFolderTime, moveDistFolderResponse, endMoveDistFolderTime, startPushToGithub, gitPushResponse, endTimeGitPush, endTime;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, askCommitMessage()];
            case 1:
                commitMessage = _a.sent();
                startTime = performance.now();
                startBuildTime = performance.now();
                return [4 /*yield*/, build()];
            case 2:
                buildResponse = _a.sent();
                if (!buildResponse.status) {
                    console.error(buildResponse);
                    return [2 /*return*/, false];
                }
                endBuildTime = (performance.now() - startBuildTime) / 1000;
                console.log("\u2705 build completed! time: " + endBuildTime.toFixed(2) + " seconds");
                startCleanFolderTime = performance.now();
                return [4 /*yield*/, cleanFolder()];
            case 3:
                cleanFolderResponse = _a.sent();
                if (!cleanFolderResponse.status) {
                    console.error(cleanFolderResponse);
                    return [2 /*return*/, false];
                }
                endCleanFolderTime = (performance.now() - startCleanFolderTime) / 1000;
                console.log("\u2705 clean destiny folder completed! time: " + endCleanFolderTime.toFixed(2) + " seconds");
                startMoveDistFolderTime = performance.now();
                return [4 /*yield*/, moveDistFolder()];
            case 4:
                moveDistFolderResponse = _a.sent();
                if (!moveDistFolderResponse.status) {
                    console.error(moveDistFolderResponse);
                    return [2 /*return*/, false];
                }
                endMoveDistFolderTime = (performance.now() - startMoveDistFolderTime) / 1000;
                console.log("\u2705 move dist folder to destiny folder completed! time: " + endMoveDistFolderTime.toFixed(2) + " seconds");
                startPushToGithub = performance.now();
                return [4 /*yield*/, gitPush(commitMessage)];
            case 5:
                gitPushResponse = _a.sent();
                if (!gitPushResponse.status) {
                    console.error(gitPushResponse);
                    return [2 /*return*/, false];
                }
                endTimeGitPush = (performance.now() - startPushToGithub) / 1000;
                console.log("\u2705 git push completed! time: " + endTimeGitPush.toFixed(2) + " seconds");
                endTime = (performance.now() - startTime) / 1000;
                console.log("\u2705 deploy completed! total time: " + endTime.toFixed(2) + " seconds");
                return [2 /*return*/, true];
        }
    });
}); };
/**
 * recursive function until user input string with length bigger than 0.
 * @returns { String }
 */
var askCommitMessage = function () {
    var answer = question('commit message: \n');
    if (answer.length == 0) {
        askCommitMessage();
    }
    return answer;
};
/**
 * Build vue project from project path.
 * @returns { Promise } Promise with object of type Response.
 */
var build = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, query, _a, stdout, stderr, response, error_1, response;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!projectPath) {
                    response = { code: 1, status: false, msg: 'project path is required' };
                    return [2 /*return*/, response];
                }
                query = "npm run build --prefix " + projectPath;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, exec(query)];
            case 2:
                _a = _b.sent(), stdout = _a.stdout, stderr = _a.stderr;
                response = { code: 2, status: true, msg: 'build completed' };
                return [2 /*return*/, response];
            case 3:
                error_1 = _b.sent();
                response = { code: 3, status: false, msg: error_1 };
                return [2 /*return*/, response];
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Clean destiny folder.
 * @returns { Promise } Promise with object of type Response.
 */
var cleanFolder = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, query, _a, stdout, stderr, response, error_2, response;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!githubPagePath) {
                    response = { code: 1, status: false, msg: 'github page path is required' };
                    return [2 /*return*/, response];
                }
                query = "rm -rf " + githubPagePath + "/*";
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, exec(query)];
            case 2:
                _a = _b.sent(), stdout = _a.stdout, stderr = _a.stderr;
                response = { code: 2, status: true, msg: 'clean destiny folder completed' };
                return [2 /*return*/, response];
            case 3:
                error_2 = _b.sent();
                response = { code: 3, status: false, msg: error_2 };
                return [2 /*return*/, response];
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Move dist folder to destiny folder.
 * @returns { Promise } Promise with object of type Response.
 */
var moveDistFolder = function () { return __awaiter(void 0, void 0, void 0, function () {
    var query, _a, stdout, stderr, response, error_3, response;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                query = "cp -a " + projectPath + "/dist/. " + githubPagePath;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, exec(query)];
            case 2:
                _a = _b.sent(), stdout = _a.stdout, stderr = _a.stderr;
                response = { code: 1, status: true, msg: 'move dist folder to destiny folder completed' };
                return [2 /*return*/, response];
            case 3:
                error_3 = _b.sent();
                response = { code: 2, status: false, msg: error_3 };
                return [2 /*return*/, response];
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * pull changes to github
 * @returns { Promise } Promise with object of type Response.
 */
var gitPush = function (commitMessage) { return __awaiter(void 0, void 0, void 0, function () {
    var query1, query2, query3, _a, stdout1, stderr1, _b, stdout2, stderr2, _c, stdout3, stderr3, response, error_4, response;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                query1 = "git -C " + githubPagePath + " add .";
                query2 = "git -C " + githubPagePath + " commit -m \"" + commitMessage + "\"";
                query3 = "git -C " + githubPagePath + " push";
                _d.label = 1;
            case 1:
                _d.trys.push([1, 5, , 6]);
                return [4 /*yield*/, exec(query1)];
            case 2:
                _a = _d.sent(), stdout1 = _a.stdout1, stderr1 = _a.stderr1;
                return [4 /*yield*/, exec(query2)];
            case 3:
                _b = _d.sent(), stdout2 = _b.stdout2, stderr2 = _b.stderr2;
                return [4 /*yield*/, exec(query3)];
            case 4:
                _c = _d.sent(), stdout3 = _c.stdout3, stderr3 = _c.stderr3;
                response = { code: 1, status: true, msg: 'git push completed!' };
                return [2 /*return*/, response];
            case 5:
                error_4 = _d.sent();
                response = { code: 2, status: false, msg: error_4 };
                return [2 /*return*/, response];
            case 6: return [2 /*return*/];
        }
    });
}); };
init();
exports.default = {
    askCommitMessage: askCommitMessage,
    build: build,
    cleanFolder: cleanFolder,
    gitPush: gitPush
};
