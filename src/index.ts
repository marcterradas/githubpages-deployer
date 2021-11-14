require('dotenv').config()

const util = require('util')
const exec = util.promisify(require('child_process').exec)

const githubUsername: string | undefined = process.env.GITHUB_USERNAME
const githubPassword: string | undefined = process.env.GITHUB_PASSWORD
const projectPath: string | undefined = process.env.PROJECT_PATH
const githubPagePath: string | undefined = process.env.GITHUBPAGE_PATH

const init = async () => {

    const build = async () => {

        const buildQuery : string = `npm run build --prefix ${projectPath}`

        try {
            const { stdout, stderr } = await exec(buildQuery);
            console.log('stdout:', stdout);
            console.log('stderr:', stderr);
        } catch (e) {
            console.error(e);
        }

    }

    build()

}

init()