const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connecté avec succès');
  } catch (err) {
    console.error('Erreur lors de la connexion à MongoDB', err);
    process.exit(1);
  }
};

module.exports = connectDB;
