import * as core from '@actions/core'
import Webhook from './webhook'

async function run(): Promise<void> {
  try {
    const webhookUrl: string = core.getInput('webhookUrl')
    const webhookSecret: string = core.getInput('webhookSecret')
    const data: string = core.getInput('data')

    const webhook = new Webhook(webhookUrl, webhookSecret)
    const response = await webhook.send(data)
    core.setOutput('response', response)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
