const express = require('express');
const { validateCode, submitOrder } = require('../controllers/classController');
const verifyAccessCode = require('../middlewares/auth');
const router = express.Router();

// Route pour valider le code d'accès
router.post('/access', validateCode);

// Route pour soumettre une commande
router.post('/order', verifyAccessCode, async (req, res) => {
    try {
        const { name, prenom, photoChosen, exemplaires } = req.body;
        const classe = req.classe;

        // Log pour debug
        console.log('Données de commande validées:', {
            name,
            prenom,
            photoChosen,
            exemplaires,
            classeId: classe._id
        });

        // Crée la commande et l'ajoute au tableau orders de la classe
        classe.orders.push({
            name,
            prenom,
            photoChosen,
            exemplaires
        });

        // Sauvegarde les modifications
        await classe.save();

        console.log('Commande sauvegardée avec succès');

        res.status(200).json({
            message: 'Commande enregistrée avec succès',
            commande: classe.orders[classe.orders.length - 1]
        });

    } catch (error) {
        console.error('Erreur lors de la création de la commande:', error);
        res.status(500).json({
            message: 'Erreur lors de la création de la commande',
            error: error.message
        });
    }
});

router.get('/test', (req, res) => {
    res.status(200).json({ message: 'Route de test fonctionnelle' });
});

module.exports = router;
