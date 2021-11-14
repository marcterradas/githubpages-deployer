require('dotenv').config()

const util = require('util')
const exec = util.promisify(require('child_process').exec)
const { performance } = require('perf_hooks');

const githubUsername: string | undefined = process.env.GITHUB_USERNAME
const githubPassword: string | undefined = process.env.GITHUB_PASSWORD
const projectPath: string | undefined = process.env.PROJECT_PATH
const githubPagePath: string | undefined = process.env.GITHUBPAGE_PATH

interface Response {
    code: number;
    status: boolean;
    msg: string;
}

/**
 * init method
 */
const init = async (): Promise<void> => {

    const startTime: number = performance.now()

    // build vue project
    const startBuildTime: number = performance.now()
    const buildResponse: Response = await build()

    if(!buildResponse.status){
        console.log(buildResponse)
        return
    }

    const endBuildTime: number = (performance.now() - startBuildTime) / 1000
    console.log(`\u2705 build completed! time: ${endBuildTime.toFixed(2)} seconds`)

    // TODO: move dist project to github page folder

    // TODO: deploy to github

    const endTime: number = (performance.now() - startTime) / 1000
    console.log(`\u2705 deploy completed! total time: ${endTime.toFixed(2)} seconds`)

}

/**
 * Build vue project from project path
 * @returns { Promise } Promise with object of type Response.
 */
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