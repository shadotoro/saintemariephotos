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

        // Créer la commande
        const commande = {
            name,
            prenom,
            photoChosen,
            exemplaires,
            classeId: classe._id
        };

        // Réponse immédiate pour tester
        res.status(200).json({
            message: 'Commande reçue avec succès',
            commande
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
