const express = require('express');
const { validateCode, submitOrder } = require('../controllers/classController');
const verifyAccessCode = require('../middlewares/auth');
const router = express.Router();

// Route pour valider le code d'accès
router.post('/access', validateCode);

// Route pour soumettre une commande
router.post('/order', verifyAccessCode, submitOrder);

module.exports = router;
