const Class = require('../models/Class');

// Middleware pour vérifier le code d'accès
const verifyAccessCode = async (req, res, next) => {
  const { codeAcces } = req.body;
  const classe = await Class.findOne({ codeAcces });

  if (!classe) {
    return res.status(403).json({ message: 'Accès non autorisé. Code invalide.' });
  }

  req.classe = classe; 
    next();
};

module.exports = verifyAccessCode;
