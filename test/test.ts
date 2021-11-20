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
    const buildResponse1: Response = await build(undefined)
    expect(buildResponse1.status).toBe(false)

    const buildResponse2: Response = await build(projectPath)
    expect(buildResponse2.status).toBe(true)
})

test('cleanFolder', async () => {
    const cleanFolderResponse1: Response = await cleanFolder(undefined)
    expect(cleanFolderResponse1.status).toBe(false)

    const cleanFolderResponse2: Response = await cleanFolder(githubPagePath)
    expect(cleanFolderResponse2.status).toBe(true)
})

// test('moveDistFolder', async () => {
//     console.log('todo')
// })

// test('gitPush', async () => {
//     console.log('todo')
// })
