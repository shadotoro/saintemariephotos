const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const classRoutes = require('./routes/classRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à la base de données
connectDB();

// En-tête Content-Type pour les fichiers CSS et JS
app.use((req, res, next) => {
    if (req.path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
    }
    if (req.path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
    }
    // En-tête pour la sécurité et le cache
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache pour les fichiers statiques
    next();
});

// Route
app.use('/api/classes', classRoutes);

module.exports = app;
