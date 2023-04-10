var workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox')
  });
  
  function runCode() {
    var code = Blockly.JavaScript.workspaceToCode(workspace);
  
    const wppconnect = require('@wppconnect-team/wppconnect');
    const client = new wppconnect.Client();
  
    client.on('qr', (qrCode) => {
      console.log('QR Code:', qrCode);
    });
  
    client.on('ready', () => {
      console.log('Conexão pronta');
  
      client.sendMessage('5514991844018@c.us', code).then((result) => {
        console.log('Mensagem enviada:', result);
      }).catch((error) => {
        console.error('Erro ao enviar mensagem:', error);
      });
    });
  
    client.connect();
  }