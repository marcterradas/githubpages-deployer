require('dotenv').config()

const util = require('util')
const exec = util.promisify(require('child_process').exec)

const githubUsername: string | undefined = process.env.GITHUB_USERNAME
const githubPassword: string | undefined = process.env.GITHUB_PASSWORD
const projectPath: string | undefined = process.env.PROJECT_PATH
const githubPagePath: string | undefined = process.env.GITHUBPAGE_PATH

interface Response {
    code: number;
    status: boolean;
    msg: string;
}

const init = async () => {

    const buildResponse = await build()
    console.log(buildResponse)

}

const build = async (): Promise<Response> => {

    if(!projectPath) {
        const response : Response = { code: 1, status: false, msg: 'project path is required' }
        return response
    }

    const buildQuery : string = `npm run build --prefix ${projectPath}`

    try {

        const { stdout, stderr } = await exec(buildQuery);
        const response : Response = { code: 2, status: true, msg: 'build completed' }
        return response

    } catch (error: any) {

        const response : Response = { code: 3, status: false, msg: error }
        return response

    }

}

init()