require('dotenv').config()

const githubUsername: string | undefined = process.env.GITHUB_USERNAME
const githubPassword: string | undefined = process.env.GITHUB_PASSWORD
const projectPath: string | undefined = process.env.PROJECT_PATH
const githubPagePath: string | undefined = process.env.GITHUBPAGE_PATH

console.log({ githubUsername, githubPassword, projectPath, githubPagePath})