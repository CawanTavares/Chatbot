Chatbot WhatsApp com Upload para S3

Este projeto é um chatbot desenvolvido em Node.js que utiliza a biblioteca whatsapp-web.js para se comunicar com o WhatsApp Web. O bot gera QR Codes para autenticação, executa comandos (como capturar screenshots usando Puppeteer) e realiza uploads desses arquivos para um bucket S3 da AWS.

	Observação:
Este projeto utiliza o AWS SDK v2, que atualmente está em manutenção. Para novos desenvolvimentos, considere migrar para o AWS SDK v3.

Funcionalidades
	•	Integração com WhatsApp:
Conecta ao WhatsApp Web e gera um QR Code para autenticação.
	•	Geração de QR Code:
Utiliza as bibliotecas qrcode e qrcode-terminal para gerar e exibir o QR Code.
	•	Captura de Screenshot:
Usa o Puppeteer para capturar a tela de um site (ex.: https://example.com) quando acionado por um comando via WhatsApp.
	•	Upload para S3:
Após a captura, o arquivo de screenshot é enviado para um bucket S3 utilizando o AWS SDK, e o bot retorna o URL público do arquivo.
	•	Configuração via Variáveis de Ambiente:
O projeto suporta configuração de credenciais e região da AWS por meio de variáveis de ambiente ou arquivo .env.

Pré-requisitos
	•	Node.js (versão 14 ou superior recomendada)
	•	npm ou Yarn
	•	Uma conta AWS com um bucket S3 configurado
	•	Credenciais da AWS (configuradas via ~/.aws/credentials ou variáveis de ambiente)

Instalação
	1.	Clone o repositório:

git clone https://github.com/seu-usuario/Chatbot.git
cd Chatbot


	2.	Instale as dependências:
Usando npm:

npm install

Ou usando Yarn:

yarn install


	3.	Configuração das Credenciais AWS:
Você pode configurar suas credenciais de duas formas:
	•	Utilizando o AWS CLI:

aws configure


	•	Ou criando um arquivo .env na raiz do projeto (lembre-se de adicioná-lo ao .gitignore):

AWS_ACCESS_KEY_ID=seu_access_key_id
AWS_SECRET_ACCESS_KEY=sua_secret_access_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=seu_nome_bucket

No início do seu código (por exemplo, em chatbot.js), carregue as variáveis com:

require('dotenv').config();



Uso
	1.	Inicie o Chatbot:
Execute o comando:

yarn start

ou

npm start


	2.	Autenticação no WhatsApp:
Ao iniciar, o bot gerará um QR Code. Abra o WhatsApp em seu celular, acesse as configurações do WhatsApp Web e escaneie o código para autenticar.
	3.	Comando para Capturar Screenshot:
Envie a mensagem !screenshot via WhatsApp. O bot irá:
	•	Abrir o Puppeteer para acessar a URL especificada (ex.: https://example.com).
	•	Capturar um screenshot e salvar localmente.
	•	Realizar o upload do screenshot para o bucket S3 configurado.
	•	Responder com o URL público do arquivo no S3.

Configurações Adicionais

AWS SDK

O AWS SDK é configurado utilizando as variáveis de ambiente ou o arquivo de credenciais. Certifique-se de que o nome do bucket (S3_BUCKET_NAME) e a região estão corretos.

Puppeteer

Caso o Puppeteer não encontre a versão correta do Chromium, verifique se está instalado o pacote completo puppeteer (que baixa automaticamente o Chromium) ou configure o executablePath para apontar para o Chrome/Chromium instalado no sistema.

WhatsApp-Web.js

Certifique-se de utilizar a versão mais recente da biblioteca para evitar problemas de autenticação. Caso encontre dificuldades, verifique as issues e a documentação oficial da whatsapp-web.js.

Solução de Problemas
	•	Erro “Cannot find module ‘qrcode’”:
Verifique se todas as dependências estão instaladas. Execute npm install ou yarn install novamente.
	•	Avisos sobre AWS SDK v2:
Esses avisos indicam que o AWS SDK v2 está em manutenção. Considere migrar para o AWS SDK v3 em futuros desenvolvimentos.
	•	Problemas com Puppeteer:
Se ocorrer erro de Chromium não encontrado, instale o pacote completo puppeteer ou configure o caminho do executável.
	•	Problemas de Conexão S3:
Verifique suas credenciais AWS e o nome do bucket. Utilize as ferramentas de debug do AWS SDK para mais detalhes.