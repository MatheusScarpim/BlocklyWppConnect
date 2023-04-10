var especialCharMask = (especialChar) => {
  especialChar = especialChar.replace('/[áàãâä]/ui', 'a');
  especialChar = especialChar.replace('/[éèêë]/ui', 'e');
  especialChar = especialChar.replace('/[íìîï]/ui', 'i');
  especialChar = especialChar.replace('/[óòõôö]/ui', 'o');
  especialChar = especialChar.replace('/[úùûü]/ui', 'u');
  especialChar = especialChar.replace('/[ç]/ui', 'c');
  return especialChar.toLowerCase();
};

var formataNumero = (numeroComMascara) => {
  formataNumero = numeroComMascara.replace('55', '').replace('@c.us', '');
  return formataNumero;
};

exports.especialCharMask = especialCharMask;
exports.formataNumero = formataNumero;