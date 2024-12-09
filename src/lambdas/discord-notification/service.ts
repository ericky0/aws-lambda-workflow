import { AllowedChannelsType } from './config/channels'

export interface BuildMessageProps {
  rowId: number
  error: string
  instanceName: string
  criticityLevel: 1 | 2 | 3
  channelName: AllowedChannelsType
  cardLink: string
  title: string
  channel: string
}

export default class DiscordService {
  static buildMessage(config: BuildMessageProps): string {
    const hr = '\n\n--------------------------------------\n'

    let message = hr + this.buildInitialPartMessage(config.channelName) + '\n'

    const parts = this.getMessageParts(config)

    message += parts.filter(Boolean).join('\n')

    message += hr

    return message
  }

  static buildInitialPartMessage(channelName: AllowedChannelsType) {
    const messages = {
      support: '# ☎️ **Suporte:** Um novo chamado foi aberto.',
      reports: '# 📊 **Relatórios:** Houve um problema ao gerar um relatório.',
      integration: '# 🔗 **Integração:** Houve um problema em uma integração.',
    }

    return messages[channelName]
  }

  static getCriticity(level: BuildMessageProps['criticityLevel']) {
    const criticity = {
      1: 'Baixo 🟢',
      2: 'Moderado 🟡',
      3: 'Alto 🔴',
    }

    return criticity[level]
  }

  static getMessageParts(config: BuildMessageProps) {
    const { rowId, error, criticityLevel, instanceName, cardLink, title } =
      config

    return [
      title && `📌 **Título:** ${title}`,
      cardLink && `🔗 **Link do Card:** [Acessar Card](${cardLink})`,
      rowId && `🆔 **ID da Fila:** ${rowId}`,
      error && `❌ **Erro:** \`${error}\``,
      criticityLevel &&
        `⚠️ **Nível de Criticidade:** ${this.getCriticity(criticityLevel)}`,
      instanceName && `💻 **Instância:** ${instanceName}`,
    ]
  }
}
