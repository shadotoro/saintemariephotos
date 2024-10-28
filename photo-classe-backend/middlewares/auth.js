const Class = require('../models/Class');

// Middleware pour vérifier le code d'accès
const verifyAccessCode = async (req, res, next) => {
  try {
    // Nettoyage des données entrantes
    const { codeAcces, name, prenom, photoChosen, exemplaires } = req.body;
    
    // Validation des données requises
    if (!codeAcces || !name || !prenom || !photoChosen || !exemplaires) {
      return res.status(400).json({ 
        message: 'Données manquantes',
        received: { codeAcces, name, prenom, photoChosen: !!photoChosen, exemplaires }
      });
    }

    // Nettoyage de l'URL de la photo (suppression du point-virgule si présent)
    req.body.photoChosen = photoChosen.replace(/;$/, '');

    const classe = await Class.findOne({ codeAcces });
    if (!classe) {
      return res.status(404).json({ 
        message: 'Classe non trouvée',
        codeAcces 
      });
    }

    // Attacher la classe et les données nettoyées à la requête
    req.classe = classe;
    next();
  } catch (error) {
    console.error('Erreur dans verifyAccessCode:', error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = verifyAccessCode;
