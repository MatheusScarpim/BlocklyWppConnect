const wppconnect = require('@wppconnect-team/wppconnect');
const express = require('express');
const http = require('http');
const app = express();
const Blockly = require('blockly')

const port = process.env.PORT || 7000;
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

server.listen(port, function () {
    console.log('O app está rodando ' + port);
  });

/*************Liga ChatBot***************** */
wppconnect
  .create({
    session: 'linebreak',
    headless: true,
    devtools: false,
    useChrome: true,
    debug: false,
    logQR: true,
    browserWS: '',
    browserArgs: [''],
    puppeteerOptions: {},
    disableWelcome: false,
    updatesLog: false,
    autoClose: 60000,
    tokenStore: 'file',
    folderNameToken: './tokens',
  })
  .then((client) => start(client))
  .catch((error) => console.log(error));

/***************Funções ChatBot******************* */
function start(client) {
  Instancia = client;
  client.onMessage(async (msg) => {
    
  });
}

app.get('/paginaBlocos', async function (req, res)
{
  res.sendFile(__dirname + "/blockly/index.html");
});
app.post('/sendText', async function (req, res) {
  console.log('Solicitou envio de mensagem VIA POST');
  console.log('Requested sending VIA POST message');

  //parametros vindos na requisição ... parameters coming in the request
  var telnumber = req.body.phone;
  var mensagemparaenvio = req.body.text;
  //***********/

  var mensagemretorno = ''; //mensagem de retorno da requisição ... request return message
  var sucesso = false; //Se houve sucesso na requisição ... If the request was successful
  var return_object;

  const executa = async () => {
    if (typeof Instancia === 'object') { 
      // Validando se a lib está iniciada .... Validating if lib is started
      status = await Instancia.getConnectionState(); // validadado o estado da conexão com o whats

      if (status === 'CONNECTED') {
        let numeroexiste = await Instancia.checkNumberStatus(
          telnumber + '@c.us'
        ); //Validando se o número existe ... Validating if the number exists
        if (numeroexiste.canReceiveMessage === true) {
          await Instancia.sendText(
            numeroexiste.id._serialized,
            mensagemparaenvio
          )
        } else {
          mensagemretorno =
            'O numero não está disponível ou está bloqueado - The number is not available or is blocked.';
        }
      } else {
        mensagemretorno =
          'Valide sua conexao com a internet ou QRCODE - Validate your internet connection or QRCODE';
      }
    } else {
      mensagemretorno =
        'A instancia não foi inicializada - The instance was not initialized';
    }
    return_object = {
      status: sucesso,
      message: mensagemretorno,
    };
    res.send(return_object);
  };
  executa();
});

client.on('message', async (message) => {
  console.log('Mensagem recebida:', message.body);
  myVariable.value_ = message.body;
  executarBlocos();
});

function executarBlocos() {
  const workspace = new Blockly.Workspace();
  // Adicione seus blocos ao workspace aqui
  // Conecte os blocos de acordo com a lógica do seu programa
  // Por fim, execute os blocos
  workspace.getTopBlocks()[0].execute();
}
