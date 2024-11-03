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
      { url: 'https://photoclasse.blob.core.windows.net/photosclasse/B_9284.jpg', numero: '9284' },
      { url: 'https://photoclasse.blob.core.windows.net/photosclasse/B_9285.jpg', numero: '9285' }
    ]
  },
  {
    codeAcces: 'S1TQvZho',
    photos: [
      { url: 'https://photoclasse.blob.core.windows.net/photosclasse/C_9292.jpg', numero: '9292' },
      { url: 'https://photoclasse.blob.core.windows.net/photosclasse/C_9295.jpg', numero: '9295' }
    ]
  },
  {
    codeAcces: 'lZGmhj9L',
    photos: [
      { url: 'https://photoclasse.blob.core.windows.net/photosclasse/A_9281.jpg', numero: '9281' },
      { url: 'https://photoclasse.blob.core.windows.net/photosclasse/A_9282.jpg', numero: '9282' }
    ]
  },
  {
    codeAcces: 'n3hUVYAz',
    photos: [
      { url: 'https://photoclasse.blob.core.windows.net/photosclasse/E_9329.jpg', numero: '9329' },
      { url: 'https://photoclasse.blob.core.windows.net/photosclasse/E_9334.jpg', numero: '9334' },
      { url: 'https://photoclasse.blob.core.windows.net/photosclasse/E_9335.jpg', numero: '9335' }
    ]
  },
  {
    codeAcces: 'gh51aYBT',
    photos: [
      { url: 'https://photoclasse.blob.core.windows.net/photosclasse/D_9302.jpg', numero: '9302' },
      { url: 'https://photoclasse.blob.core.windows.net/photosclasse/D_9303.jpg', numero: '9303' },
      { url: 'https://photoclasse.blob.core.windows.net/photosclasse/G_9320.jpg', numero: '9320' },
      { url: 'https://photoclasse.blob.core.windows.net/photosclasse/G_9321.jpg', numero: '9321' }
    ]
  },
  {
    codeAcces: 'T7WVn0Xn',
    photos: [
      { url: 'https://photoclasse.blob.core.windows.net/photosclasse/K_9355.jpg', numero: '9355' },
      { url: 'https://photoclasse.blob.core.windows.net/photosclasse/K_9357.jpg', numero: '9357' }
    ]
  },
  {
    codeAcces: 'Ac07O6xh',
    photos: [
      { url: 'https://photoclasse.blob.core.windows.net/photosclasse/F_9316.jpg', numero: '9316' },
      { url: 'https://photoclasse.blob.core.windows.net/photosclasse/F_9316_r.jpg', numero: '9316r' },
      { url: 'https://photoclasse.blob.core.windows.net/photosclasse/F_9318.jpg', numero: '9318' },
      { url: 'https://photoclasse.blob.core.windows.net/photosclasse/F_9318_r.jpg', numero: '9318r' }
    ]
  },
  {
    codeAcces: 'puRcVG8m',
    photos: [
      { url: 'https://photoclasse.blob.core.windows.net/photosclasse/j_9350.jpg', numero: '9350' },
      { url: 'https://photoclasse.blob.core.windows.net/photosclasse/j_9352.jpg', numero: '9352' }
    ]
  },
  {
    codeAcces: '4WsDyBbP',
    photos: [
      { url: 'https://photoclasse.blob.core.windows.net/photosclasse/H_9341.jpg', numero: '9341' },
      { url: 'https://photoclasse.blob.core.windows.net/photosclasse/H_9342.jpg', numero: '9342' }
    ]
  },
  {
    codeAcces: 'GyvAU31R',
    photos: [
      { url: 'https://photoclasse.blob.core.windows.net/photosclasse/i_9344.jpg', numero: '9344' },
      { url: 'https://photoclasse.blob.core.windows.net/photosclasse/i_9346.jpg', numero: '9346' }
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
