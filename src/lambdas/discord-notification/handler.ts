import { SQSHandler, SQSRecord } from 'aws-lambda'
import DiscordService, { BuildMessageProps } from './service'
import { allowedChannels, webhookChannelsMap } from './config/channels'
import axios from 'axios'

export const handler: SQSHandler = async (event) => {
  console.log('Received SQS Event:', JSON.stringify(event))

  for (const record of event.Records) {
    const payload = JSON.parse(record.body) as BuildMessageProps

    const {
      channel,
      rowId,
      error,
      instanceName,
      criticityLevel,
      cardLink,
      title,
    } = payload

    if (!DiscordService.isValidChannelType(channel)) {
      throw new Error(
        `this channel is not valid, try any of these: ${allowedChannels.join(
          ', '
        )}`
      )
    }

    const message = DiscordService.buildMessage({
      channel,
      rowId,
      error,
      instanceName,
      criticityLevel,
      cardLink,
      title,
    })

    await axios.post(webhookChannelsMap[channel], {
      content: message,
    })
  }
}
