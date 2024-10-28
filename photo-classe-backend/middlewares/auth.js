const Class = require('../models/Class');

// Middleware pour vérifier le code d'accès
const verifyAccessCode = async (req, res, next) => {
  try {
    const { codeAcces } = req.body;
    
    if (!codeAcces) {
      return res.status(400).json({ message: 'Code d\'accès manquant' });
    }

    const classe = await Class.findOne({ codeAcces });

    if (!classe) {
      return res.status(403).json({ message: 'Accès non autorisé. Code invalide.' });
    }

    req.classe = classe;
    next();
  } catch (error) {
    console.error('Erreur dans verifyAccessCode:', error);
    return res.status(500).json({ message: 'Erreur serveur lors de la vérification du code' });
  }
};

module.exports = verifyAccessCode;
