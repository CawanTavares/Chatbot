const qrcode = require('qrcode');
const fs = require('fs');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js');
const AWS = require('aws-sdk');
const pupeeteer = require ('puppeteer-core')

// Configure AWS SDK (ensure your credentials are set in your environment or via shared credentials file)
AWS.config.update({ region: 'sa-east-1' }); // change region to the cheapest one

const s3 = new AWS.S3();

const client = new Client();

// Gera e salva o QR Code como imagem, depois uploads to S3
client.on('qr', async qr => {
    try {
        const qrFile = './qrcode.png';
        await qrcode.toFile(qrFile, qr);
        console.log('QR Code gerado e salvo como "qrcode.png".');

        // Read the QR code file
        const fileContent = fs.readFileSync(qrFile);

        // Setup S3 upload parameters
        const params = {
            Bucket: 'chatbotjs-bucket',              // Replace with your S3 bucket name
            Key: 'qrcodes/qrcode.png',                // The destination path in your bucket
            Body: fileContent,
            ContentType: 'image/png'
        };

        // Upload the file to S3
        s3.upload(params, (err, data) => {
            if (err) {
                console.error('Erro ao fazer upload do QR Code para o S3:', err);
            } else {
                console.log('QR Code carregado no S3 em:', data.Location);
            }
        });

    } catch (err) {
        console.error('Erro ao gerar QR Code:', err);
    }
});

// Confirmação de conexão
client.on('ready', () => {
    console.log('Chatbot Jurídico da Dra. Larissa Martins está online.');
});

// Inicializa o cliente do WhatsApp
client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms));

client.on('message', async msg => {

    if (msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i) && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        const contact = await msg.getContact();
        const name = contact.pushname.split(" ")[0];

        await delay(2000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from,
            `Olá, ${name}! 👩‍⚖️ Sou o assistente virtual da Dra. Larissa Martins. Como posso ajudá-lo hoje?\n\n` +
            `1️⃣ - Áreas de atuação\n` +
            `2️⃣ - Consultoria jurídica\n` +
            `3️⃣ - Marcar uma reunião\n` +
            `4️⃣ - Documentação e contratos\n` +
            `5️⃣ - Falar com a Dra. Larissa Martins\n` +
        );
    }

    if (msg.body === '1' && msg.from.endsWith('@c.us')) {
        await delay(2000);
        await client.sendMessage(msg.from,
            `📌 *Áreas de Atuação da Dra. Larissa Martins*:\n\n` +
            `✔ Direito Civil\n` +
            `✔ Direito de Família\n` +
            `✔ Direito do Consumidor\n` +
            `✔ Direito Trabalhista\n` +
            `✔ Assessoria Jurídica Empresarial\n\n` +
            `Digite *0* para voltar ao menu principal.`
        );
    }

    if (msg.body === '2' && msg.from.endsWith('@c.us')) {
        await delay(2000);
        await client.sendMessage(msg.from,
            `📞 *Consultoria Jurídica Online*\n\n` +
            `A Dra. Larissa Martins oferece consultoria jurídica para te ajudar a entender seus direitos e resolver suas dúvidas legais.\n\n` +
            `🔹 Atendimento via WhatsApp ou videochamada\n` +
            `🔹 Esclarecimento de questões legais\n` +
            `🔹 Análise de contratos\n\n` +
            `Digite *3* para agendar uma consulta ou *0* para voltar ao menu principal.`
        );
    }

    if (msg.body === '3' && msg.from.endsWith('@c.us')) {
        await delay(2000);
        await client.sendMessage(msg.from,
            `📅 *Agendamento de Consultoria Jurídica*\n\n` +
            `Para marcar uma reunião com a Dra. Larissa Martins, acesse o link abaixo e escolha um horário disponível:\n\n` +
            `🌐 [Agendar Consulta](https://advlarissamartins.com.br/agendamento)\n\n` +
            `Ou, se preferir, envie uma mensagem diretamente para combinar um horário.\n\n` +
            `Digite *0* para voltar ao menu principal.`
        );
    }

    if (msg.body === '4' && msg.from.endsWith('@c.us')) {
        await delay(2000);
        await client.sendMessage(msg.from,
            `📜 *Documentação e Contratos*\n\n` +
            `A Dra. Larissa Martins pode te ajudar com:\n` +
            `✔ Elaboração e revisão de contratos\n` +
            `✔ Procurações\n` +
            `✔ Acordos extrajudiciais\n\n` +
            `Caso precise de um serviço específico, envie mais detalhes!\n\n` +
            `Digite *0* para voltar ao menu principal.`
        );
    }

    if (msg.body === '5' && msg.from.endsWith('@c.us')) {
        await delay(2000);
        await client.sendMessage(msg.from,
            `📝 *Fale com a Dra. Larissa Martins*\n\n` +
            `Para um atendimento mais ágil, por favor, envie seu caso com o máximo de detalhes possível.\n\n` +
            `📌 Qual é sua dúvida ou problema jurídico?\n` +
            `📌 Já existe algum processo em andamento?\n` +
            `📌 Qual a cidade e estado onde ocorreu o caso?\n\n` +
            `Após enviar essas informações, a Dra. Larissa entrará em contato o mais breve possível.\n\n` +
            `Digite *0* para voltar ao menu principal.`
        );
    }

    if (msg.body === '0' && msg.from.endsWith('@c.us')) {
        await delay(2000);
        await client.sendMessage(msg.from,
            `🔄 Voltando ao menu principal...\n\n` +
            `1️⃣ - Áreas de atuação\n` +
            `2️⃣ - Consultoria jurídica\n` +
            `3️⃣ - Marcar uma reunião\n` +
            `4️⃣ - Documentação e contratos\n` +
            `5️⃣ - Falar com a Dra. Larissa Martins\n` +
            `0️⃣ - Voltar ao menu principal`
        );
    }
});