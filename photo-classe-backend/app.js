const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const classRoutes = require('./routes/classRoutes');
require('dotenv').config();

const app = express();

const corsOptions = {
    origin: ['http://localhost:3000', 'https://stm-frontend-production-f0c0.up.railway.app'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization','X-XSRF-TOKEN'],
    credentials: true,
    optionsSuccessStatus: 200
    };

// Middleware
    app.use(cors(corsOptions));
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Connexion à la base de données
connectDB();

// En-tête Content-Type et sécurité pour tous les types de fichiers
app.use((req, res, next) => {
    const fileTypes = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.ico'];
    const ext = fileTypes.find(type => req.path.endsWith(type));

    if (ext) {
        if (ext === '.css') {
        res.setHeader('Content-Type', 'text/css');
        }
        if (ext === '.js') {
        res.setHeader('Content-Type', 'application/javascript');
        }
// En-têtes de sécurité et cache pour tous les fichiers
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache pour les fichiers statiques
    }
    next();
});

// Route
app.use('/api/classes', classRoutes);

module.exports = app;
