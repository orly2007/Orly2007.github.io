# TéléphoneShop - Site de Vente en Ligne d'Appareils Technologiques

## Description
TéléphoneShop est une plateforme en ligne dédiée à la vente de téléphones mobiles et d'autres appareils technologiques. Le site inclut un chatbot assistant client, intégré avec l'API ChatGPT, pour répondre aux questions des utilisateurs en temps réel. Il offre également une fonctionnalité de connexion pour les utilisateurs.

## Fonctionnalités
- **Recherche de produits** : Trouvez facilement les téléphones grâce à notre barre de recherche et à nos filtres avancés.
- **Comparaison de produits** : Comparez différents modèles de téléphones pour prendre une décision d'achat éclairée.
- **Avis des utilisateurs** : Consultez les avis et les notes des autres utilisateurs pour chaque produit.
- **Panier et commande** : Ajoutez des produits à votre panier et finalisez votre commande en quelques étapes simples.
- **Suivi de commande** : Suivez l'état de votre commande depuis l'expédition jusqu'à la livraison.
- **Promotions et offres spéciales** : Profitez de nos offres spéciales et promotions exclusives.
- **Chatbot Assistant** : Un chatbot intégré utilisant l'API ChatGPT pour répondre aux questions des utilisateurs.
- **Connexion Utilisateur** : Fonctionnalité de connexion pour les utilisateurs.

## Installation

### Prérequis
- Un serveur web (Apache, Nginx, etc.).
- PHP 7.x ou supérieur.
- Une base de données MySQL.
- Node.js et npm installés.
- Une clé API OpenAI.

### Étapes
1. Clonez ce dépôt sur votre serveur :
    ```sh
    git clone https://github.com/votre-nom-utilisateur/telephone-shop.git
    cd telephone-shop
    ```

2. Installez les dépendances PHP avec Composer :
    ```sh
    composer install
    ```

3. Créez un fichier `.env` à partir du fichier d'exemple :
    ```sh
    cp .env.example .env
    ```

4. Configurez votre base de données dans le fichier `.env`.

5. Exécutez les migrations de base de données :
    ```sh
    php artisan migrate
    ```

6. Ajoutez votre clé API OpenAI dans le fichier `assistant.js` :
    ```javascript
    const API_KEY = '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';
    ```

7. Démarrez le serveur local :
    ```sh
    php artisan serve
    ```

8. Ouvrez le fichier `index.html` dans votre navigateur pour voir le site en action.

## Utilisation
- **Recherche** : Utilisez la barre de recherche pour trouver des téléphones par marque, modèle ou caractéristiques.
- **Comparaison** : Ajoutez des téléphones à la liste de comparaison pour voir leurs caractéristiques côte à côte.
- **Avis** : Lisez et laissez des avis sur les téléphones pour partager votre expérience avec d'autres utilisateurs.
- **Commande** : Ajoutez les téléphones à votre panier et suivez les étapes pour finaliser votre achat.
- **Chatbot** : Utilisez le chatbot pour poser des questions et obtenir des réponses instantanément.
- **Connexion** : Utilisez la page de connexion (`login.html`) pour vous connecter avec vos identifiants.

## Arborescence du Projet
