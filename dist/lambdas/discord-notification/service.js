"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DiscordService {
    static buildMessage(config) {
        const hr = '\n\n--------------------------------------\n';
        let message = hr + this.buildInitialPartMessage(config.channelName) + '\n';
        const parts = this.getMessageParts(config);
        message += parts.filter(Boolean).join('\n');
        message += hr;
        return message;
    }
    static buildInitialPartMessage(channelName) {
        const messages = {
            support: '# ☎️ **Suporte:** Um novo chamado foi aberto.',
            reports: '# 📊 **Relatórios:** Houve um problema ao gerar um relatório.',
            integration: '# 🔗 **Integração:** Houve um problema em uma integração.',
        };
        return messages[channelName];
    }
    static getCriticity(level) {
        const criticity = {
            1: 'Baixo 🟢',
            2: 'Moderado 🟡',
            3: 'Alto 🔴',
        };
        return criticity[level];
    }
    static getMessageParts(config) {
        const { rowId, error, criticityLevel, instanceName, cardLink, title } = config;
        return [
            title && `📌 **Título:** ${title}`,
            cardLink && `🔗 **Link do Card:** [Acessar Card](${cardLink})`,
            rowId && `🆔 **ID da Fila:** ${rowId}`,
            error && `❌ **Erro:** \`${error}\``,
            criticityLevel &&
                `⚠️ **Nível de Criticidade:** ${this.getCriticity(criticityLevel)}`,
            instanceName && `💻 **Instância:** ${instanceName}`,
        ];
    }
}
exports.default = DiscordService;
