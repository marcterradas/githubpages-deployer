require('dotenv').config()

import { askCommitMessage, build, cleanFolder, moveDistFolder, gitPush } from '../src/functions'
import { Response } from '../src/interfaces'

const projectPath: string | undefined = process.env.PROJECT_PATH
const githubPagePath: string | undefined = process.env.GITHUBPAGE_PATH

test('askCommitMessage', async () => {
    const commitMessage: string = await askCommitMessage()
    expect(commitMessage.length).not.toEqual(0)
})

test('build', async () => {
    const response1: Response = await build(undefined)
    expect(response1.status).toBe(false)

    const response2: Response = await build(projectPath)
    expect(response2.status).toBe(true)
})
