"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (event) => {
    try {
        console.log('Received SQS Event:', JSON.stringify(event, null, 2));
        for (const record of event.Records) {
            // Processar cada mensagem do SQS
            await processMessage(record);
        }
        console.log('All messages processed successfully.');
    }
    catch (error) {
        console.error('Error processing SQS event:', error);
        throw new Error('Error processing SQS messages');
    }
};
exports.handler = handler;
// Função para processar cada mensagem
const processMessage = async (record) => {
    try {
        console.log('Processing message:', record.body);
        // Aqui você pode tratar os dados da mensagem
        const messageData = JSON.parse(record.body);
        // Exemplo de lógica personalizada
        if (messageData.action === 'create') {
            console.log('Create action detected, processing...');
        }
        else {
            console.log('Unhandled action:', messageData.action);
        }
    }
    catch (error) {
        console.error('Error processing message:', error);
        throw error; // Re-throw para permitir reprocessamento (se configurado no SQS)
    }
};