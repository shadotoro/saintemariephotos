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

const classesToUpdate = [
  {
    codeAcces: 'jpiAuxdv',
    photos: [
      'https://photoclasse.blob.core.windows.net/photosclasse/B_9284.jpg',
      'https://photoclasse.blob.core.windows.net/photosclasse/B_9285.jpg'
    ]
  },
  {
    codeAcces: 'S1TQvZho',
    photos: [
      'https://photoclasse.blob.core.windows.net/photosclasse/C_9292.jpg',
      'https://photoclasse.blob.core.windows.net/photosclasse/C_9295.jpg'
    ]
  },
  {
    codeAcces: 'lZGmhj9L',
    photos: [
      'https://photoclasse.blob.core.windows.net/photosclasse/A_9281.jpg',
      'https://photoclasse.blob.core.windows.net/photosclasse/A_9282.jpg'
    ]
  },
  {
    codeAcces: 'n3hUVYAz',
    photos: [
      'https://photoclasse.blob.core.windows.net/photosclasse/E_9329.jpg',
      'https://photoclasse.blob.core.windows.net/photosclasse/E_9334.jpg',
      'https://photoclasse.blob.core.windows.net/photosclasse/E_9335.jpg'
    ]
  },
  {
    codeAcces: 'gh51aYBT',
    photos: [
      'https://photoclasse.blob.core.windows.net/photosclasse/D_9302.jpg',
      'https://photoclasse.blob.core.windows.net/photosclasse/D_9303.jpg',
      'https://photoclasse.blob.core.windows.net/photosclasse/G_9320.jpg',
      'https://photoclasse.blob.core.windows.net/photosclasse/G_9321.jpg'
    ]
  },
  {
    codeAcces: 'T7WVn0Xn',
    photos: [
      'https://photoclasse.blob.core.windows.net/photosclasse/K_9355.jpg',
      'https://photoclasse.blob.core.windows.net/photosclasse/K_9357.jpg'
    ]
  },
  {
    codeAcces: 'Ac07O6xh',
    photos: [
      'https://photoclasse.blob.core.windows.net/photosclasse/F_9316.jpg',
      'https://photoclasse.blob.core.windows.net/photosclasse/F_9316_r.jpg',
      'https://photoclasse.blob.core.windows.net/photosclasse/F_9318.jpg',
      'https://photoclasse.blob.core.windows.net/photosclasse/F_9318_r.jpg'
    ]
  },
  {
    codeAcces: 'puRcVG8m',
    photos: [
      'https://photoclasse.blob.core.windows.net/photosclasse/j_9350.jpg',
      'https://photoclasse.blob.core.windows.net/photosclasse/j_9352.jpg'
    ]
  },
  {
    codeAcces: '4WsDyBbP',
    photos: [
      'https://photoclasse.blob.core.windows.net/photosclasse/H_9341.jpg',
      'https://photoclasse.blob.core.windows.net/photosclasse/H_9342.jpg'
    ]
  },
  {
    codeAcces: 'GyvAU31R',
    photos: [
      'https://photoclasse.blob.core.windows.net/photosclasse/i_9344.jpg',
      'https://photoclasse.blob.core.windows.net/photosclasse/i_9346.jpg'
    ]
  }
];

// Mettre à jour les classes dans la base de données
const updateClasses = async () => {
  try {
    for (const classToUpdate of classesToUpdate) {
      const updatedClass = await Class.findOneAndUpdate(
        { codeAcces: classToUpdate.codeAcces }, // Trouve la classe par code d'accès
        { photos: classToUpdate.photos },       // Mettre à jour les URLs des photos
        { new: true }                           // Renvoie la classe mise à jour
      );
      console.log(`Classe mise à jour : ${updatedClass.codeAcces}`);
    }
    process.exit();
  } catch (error) {
    console.error('Erreur lors de la mise à jour des classes', error);
    process.exit(1);
  }
};

// Exécute la mise à jour
const run = async () => {
  await connectDB();
  await updateClasses();
};

run();
