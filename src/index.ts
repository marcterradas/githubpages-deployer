require('dotenv').config()

const { exec } = require('child_process');

// env variables

const githubUsername: string | undefined = process.env.GITHUB_USERNAME
const githubPassword: string | undefined = process.env.GITHUB_PASSWORD
const projectPath: string | undefined = process.env.PROJECT_PATH
const githubPagePath: string | undefined = process.env.GITHUBPAGE_PATH

// 1. build project

const buildQuery : string = `npm run build --prefix ${projectPath}`
exec( buildQuery, (err: object, stdout: object, stderr: object) => {
    console.log(err, stdout, stderr)
})