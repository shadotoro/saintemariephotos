const express = require('express');
const { validateCode, submitOrder } = require('../controllers/classController');
const verifyAccessCode = require('../middlewares/auth');
const router = express.Router();

// Route pour valider le code d'accès
router.post('/access', validateCode);

// Route pour soumettre une commande
router.post('/order', verifyAccessCode, (req, res, next) => {
    console.log('Body reçu:', req.body);
    console.log('Headers reçus:', req.headers);
    next();
}, submitOrder);

router.get('/test', (req, res) => {
    res.status(200).json({ message: 'Route de test fonctionnelle' });
});

module.exports = router;
