import { askCommitMessage, build, cleanFolder, moveDistFolder, gitPush } from '../src/functions'

test('testAskCommitMessage', async () => {
    const commitMessage: string = await askCommitMessage()
    expect(commitMessage.length).not.toEqual(0)
})
