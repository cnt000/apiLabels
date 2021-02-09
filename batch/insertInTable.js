const { db } = require('../functionWrite/lib');

const table = 'Labels';
const name = 'prova4';

const params = {
  TableName: table,
  Item: {
    id: id,
    labels: {
      congrats: 'Grazie a tutti',
      subscriptionIsActive: 'il tuo abbonamento è ora attivo!',
      yourChoice: 'La tua scelta',
      contentAvailability:
        'Contenuti sempre disponibili su PC, tablet e smartphone',
      subscriptionType: 'Tipologia abbonamento',
      automaticRenew:
        'Offerta a rinnovo automatico disattivabile in ogni momento',
      allOffers: 'Vedi tutte le offerte',
      clickHere: 'Continua a leggere',
      backToArticle: 'per tornare all"articolo',
    },
  },
};

console.log('Adding a new item...');

db.insert(params)
  .then(() => console.log('Added item:', JSON.stringify(params, null, 2)))
  .catch((err) =>
    console.error(
      'Unable to add item. Error JSON:',
      JSON.stringify(err, null, 2),
    ),
  );
