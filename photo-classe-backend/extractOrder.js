const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Class = require('./models/Class');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connecté avec succès');
  } catch (err) {
    console.error('Erreur lors de la connexion à MongoDB', err);
    process.exit(1);
  }
};

const extractOrders = async () => {
  try {
    const classes = await Class.find({}, 'orders');
    const allOrders = classes.reduce((acc, classe) => acc.concat(classe.orders), []);

    console.log('Commandes passées :');
    allOrders.forEach(order => {
      console.log(`Nom : ${order.name}, Prénom : ${order.prenom}, Photo choisie : ${order.photoChosen}, Exemplaires : ${order.exemplaires}`);
    });

    process.exit();
  } catch (error) {
    console.error('Erreur lors de l\'extraction des commandes', error);
    process.exit(1);
  }
};

// Exécuter le script
const run = async () => {
  await connectDB();
  await extractOrders();
};

run();
