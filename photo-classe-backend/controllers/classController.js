const Class = require('../models/Class');

// Valide le code d'accès et renvoye les photos
exports.validateCode = async (req, res) => {
  const { codeAcces } = req.body;
  const classe = await Class.findOne({ codeAcces });

  if (!classe) {
    return res.status(404).json({ message: 'Code invalide' });
  }

  res.json({ photos: classe.photos });
};

// Soumet une commande (nom, prénom, photo choisie)
exports.submitOrder = async (req, res) => {
  const { codeAcces, name, prenom, photoChosen, exemplaires } = req.body;

  try {
    const classe = await Class.findOne({ codeAcces: codeAcces.trim().toLowerCase() });
    if (!classe) {
      return res.status(404).json({ message: 'Classe non trouvée' });
    }

    classe.orders.push({ name, prenom, photoChosen, exemplaires });
    await classe.save();

    res.status(200).json({ message: 'Commande enregistrée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la commande:', error);
    res.status(500).json({ message: 'Erreur lors de la soumission de la commande' });
  }
};
