# Sainte-Marie Photos

Ce dépôt contient le code backend et le frontend de l'application **saintemariephotos**. 
L'application permet aux utilisateurs de consulter et de commander des photos de classe via un code d'accès. Ce backend gère l'authentification des codes d'accès et le stockage des commandes.

## Déploiement

Le backend et le frontend ont été déployé sur [Railway](https://railway.app) pour une gestion simple et fiable de l'application. 

Les photos utilisées dans l'application sont stockées et servies via **Azure Blob Storage**, garantissant une disponibilité et une performance optimales.

## Fonctionnalités

- **Validation des codes d'accès** : Permet de vérifier les codes d'accès fournis pour accéder aux photos des classes.
- **Gestion des commandes** : Gère les commandes incluant le nom, le prénom, la photo sélectionnée et le nombre d'exemplaires souhaités.
- **Intégration avec MongoDB Atlas** : Utilisation d'une base de données MongoDB hébergée pour la gestion des données de classes, des photos et des commandes.

## Technologies utilisées

- **Backend** : Node.js avec Express
- **Base de données** : MongoDB (via MongoDB Atlas)
- **Stockage des fichiers** : Azure Blob Storage
- **Déploiement** : Railway

## Statut du projet

Ce projet est **terminé** et n'est pas destiné à des contributions ou des modifications futures.

## Auteurs

HP (shad_O)

---

*Note : Ce projet ne nécessite pas de documentation supplémentaire pour son installation ou utilisation.* 
