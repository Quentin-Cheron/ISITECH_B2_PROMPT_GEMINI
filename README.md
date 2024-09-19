# Chatbot avec Affinage du Modèle Gemini

Ce projet consiste en la création d'un chatbot utilisant un modèle Gemini affiné pour fournir des réponses plus précises et contextuellement appropriées. Le modèle est affiné à l'aide d'un ensemble de données d'entraînement pour améliorer ses performances.

## Présentation Technologique

### **Modèle Gemini**

- **Avantages**: Utilisé pour ses capacités avancées en génération de réponses et en traitement du langage naturel. Il offre des performances de haut niveau dans la compréhension et la génération de texte.
- **Adéquation**: Parfait pour un chatbot nécessitant des réponses précises et contextuelles.
- **Comparaison**: Comparé à d'autres modèles comme GPT ou BERT, Gemini est plus adapté à des cas d'utilisation spécifiques dans le contexte du traitement du langage naturel.

### **Next.js 14**

- **Avantages**: Framework performant pour le développement de sites web avec rendu côté serveur et génération de sites statiques. Excellente prise en charge du SEO et de la performance.
- **Adéquation**: Idéal pour une application web réactive et rapide, avec des fonctionnalités telles que le routage dynamique et les API intégrées.
- **Comparaison**: Par rapport à des frameworks comme Create React App ou Vue.js, Next.js offre des fonctionnalités de rendu côté serveur et une meilleure gestion du SEO.

### **NextUI v2**

- **Avantages**: Bibliothèque de composants modernes et élégants, facile à intégrer avec Next.js et à personnaliser.
- **Adéquation**: Contribue à une interface utilisateur cohérente et agréable, adaptée aux besoins de l'application.
- **Comparaison**: Comparé à d'autres bibliothèques comme Material-UI ou Ant Design, NextUI est plus léger et flexible pour une intégration rapide.

### **TypeScript**

- **Avantages**: Offre une meilleure vérification des types et une meilleure documentation de code, réduisant les erreurs et améliorant la maintenabilité.
- **Adéquation**: Renforce la robustesse du code, ce qui est crucial pour un projet complexe comme le vôtre.
- **Comparaison**: Par rapport à JavaScript pur, TypeScript permet une meilleure détection des erreurs et une meilleure collaboration en équipe.

### **Framer Motion**

- **Avantages**: Permet des animations fluides et performantes, améliore l'expérience utilisateur avec des transitions et des effets visuels.
- **Adéquation**: Complète bien l’interface utilisateur en ajoutant des éléments interactifs et visuellement attrayants.
- **Comparaison**: Par rapport à d'autres bibliothèques d'animation comme React Spring, Framer Motion est plus facile à utiliser pour des animations complexes.

### **Tailwind CSS**

- **Avantages**: Fournit une approche utilitaire pour le stylisme, permettant une personnalisation rapide et une conception responsive efficace.
- **Adéquation**: Facilite le développement rapide d'interfaces cohérentes et adaptables.
- **Comparaison**: Comparé à des frameworks comme Bootstrap ou Bulma, Tailwind CSS offre une plus grande flexibilité et moins de styles prédéfinis.

## Objectifs du Projet

- Développer un chatbot interactif capable de répondre à des questions avec précision.
- Affiner le modèle Gemini pour améliorer la qualité des réponses.
- Fournir une interface utilisateur moderne et réactive.

### Création du projet

1. Créer un nouveau projet Next.js avec TypeScript avec `npx-create-next-app`.
2. Installer les dépendances nécessaires pour le projet avec `npm install`.
3. Ajouter les variables d'environnements

### Variables d'environnement

- **DATABASE_URL** : URL de la base de données PostgreSQL.
- **GOOGLE_CLIENT_ID** : Clé secrète pour l'authentification.
- **GOOGLE_CLIENT_SECRET** : Clé secrète pour google.
- **GOOGLE_REFRESH_TOKEN** : Clé secrète refresh token.
- **GOOGLE_PROJECT_ID** : Clé secrète pour google.
- **GOOGLE_ACCESS_TOKEN** : Clé secrète access token.
- **MODEL_ID** : ID du modèle Gemini.
- **GOOGLE_BASE_URL** : https://generativelanguage.googleapis.com
- **RESEND_API_KEY** : Clé secrète pour l'envoi de mail.
- **NEXT_PUBLIC_APP_URL** : URL de l'application (localhost actuellement).
- **GOOGLE_API_KEY** : Clé secrète pour google.

## Configuration de Gemini

### Méthodologie et Étapes de Réalisation

1. **Création du Modèle Gemini**

   - **Étapes**: Accéder à la console Google Cloud, créer un nouveau modèle Gemini, choisir les paramètres de base et le nom du modèle.
   - **Justification**: L'utilisation de Gemini permet de bénéficier des capacités avancées en traitement du langage naturel offertes par Google Cloud.

2. **Configuration du Modèle pour l'Affinage**

   - **Étapes**: Définir les paramètres d'affinage, configurer les options d'entraînement et de validation dans la console.
   - **Justification**: L'affinage permet d'adapter le modèle aux besoins spécifiques du projet en améliorant sa précision et sa pertinence.

3. **Création de l'Ensemble de Données d'Entraînement**

   - **Étapes**: Collecter et préparer les données pertinentes pour l'entraînement du modèle. Créer des fichiers de données structurées.
   - **Justification**: Des données de qualité sont cruciales pour entraîner un modèle performant.

4. **Affinage du Modèle avec l'Ensemble de Données**

   - **Étapes**: Charger l'ensemble de données dans la console, lancer le processus d'affinage, surveiller les métriques de performance.
   - **Justification**: L'affinage avec des données spécifiques améliore la capacité du modèle à répondre aux besoins du projet.

5. **Récupération de l'ID du Modèle**
   - **Étapes**: Après l'affinage, récupérer l'ID du modèle depuis la console pour l'intégrer dans le projet.
   - **Justification**: L'ID est nécessaire pour faire des appels API et utiliser le modèle dans l'application.

### Défis Rencontrés et Solutions

- **Défi**: Préparation et nettoyage des données d'entraînement.
  - **Solution**: Utilisation de scripts de prétraitement pour garantir que les données sont bien structurées et pertinentes.
- **Défi**: Surveiller et optimiser les performances du modèle pendant l'affinage.
  - **Solution**: Configuration de métriques d'évaluation et ajustement des hyperparamètres en fonction des résultats.

### Évaluation des Résultats

- **Résultat**: Modèle Gemini finement adapté, avec des performances améliorées pour le traitement du langage spécifique au chatbot.
- **Évaluation**: Test du modèle avec des cas d'utilisation réels pour vérifier la précision des réponses.

### Propositions d'Améliorations Futures

- **Amélioration**: Intégrer des données supplémentaires pour affiner encore davantage le modèle.
- **Amélioration**: Mettre en place un système de surveillance continue pour adapter le modèle en fonction des retours d'expérience des utilisateurs.

---

## Fonctionnalités du Chatbot

### Chat en Direct

#### Méthodologie et Étapes de Réalisation

- **Étapes**:
  - Création de la page `chat` pour l'interface utilisateur.
  - Développement du composant `ChatInput` pour la saisie des messages.
  - Développement du composant `ChatWindow` pour l'affichage des messages.
- **Justification**: Permet d'offrir une interaction en temps réel avec le chatbot, améliorant l'expérience utilisateur.

#### Défis Rencontrés et Solutions

- **Défi**: Gestion de la synchronisation en temps réel des messages.
  - **Solution**: Utilisation de WebSocket pour une communication bidirectionnelle en temps réel.

#### Évaluation des Résultats

- **Résultat**: Chat en direct fonctionnel avec une latence minimale.
- **Évaluation**: Testé avec différents scénarios d'utilisation pour garantir une réponse rapide et fluide.

#### Propositions d'Améliorations Futures

- **Amélioration**: Ajouter des fonctionnalités de gestion de session pour permettre aux utilisateurs de retrouver leurs discussions passées.

### Historique des Conversations

#### Méthodologie et Étapes de Réalisation

- **Étapes**:
  - Création de la page `chat` pour l'historique des conversations.
  - Ajout de la fonctionnalité d'historique des conversations dans le composant `ChatWindow`.
- **Justification**: Permet aux utilisateurs de consulter les conversations précédentes, offrant un meilleur suivi et une meilleure analyse des interactions.

#### Défis Rencontrés et Solutions

- **Défi**: Gestion de grandes quantités de données de conversation.
  - **Solution**: Implémentation de techniques de pagination et d'indexation pour une performance optimale.

#### Évaluation des Résultats

- **Résultat**: Historique des conversations affiché correctement avec un tri efficace par date et heure.
- **Évaluation**: Vérifié avec des tests de volume pour s'assurer que le système reste performant avec un grand nombre de conversations.

#### Propositions d'Améliorations Futures

- **Amélioration**: Ajouter des fonctionnalités de recherche et de filtrage pour améliorer l'accès aux conversations spécifiques.

### Ajout de Conversation

#### Méthodologie et Étapes de Réalisation

- **Étapes**:
  - Développement de la fonctionnalité pour créer de nouvelles conversations.
  - Intégration de la gestion en temps réel des messages envoyés et reçus.
- **Justification**: Permet aux utilisateurs de commencer de nouvelles interactions avec le chatbot, enrichissant l'expérience utilisateur.

#### Défis Rencontrés et Solutions

- **Défi**: Synchronisation des nouveaux messages avec les conversations existantes.
  - **Solution**: Utilisation de mécanismes de mise à jour en temps réel pour assurer une cohérence des données.

#### Évaluation des Résultats

- **Résultat**: Fonctionnalité d'ajout de conversation opérationnelle avec une gestion en temps réel des messages.
- **Évaluation**: Testé pour s'assurer que les nouvelles conversations sont correctement créées et affichées.

#### Propositions d'Améliorations Futures

- **Amélioration**: Intégrer des options de personnalisation pour les nouvelles conversations (ex. : choix de thème ou de format).

### Réponses du Chatbot

#### Méthodologie et Étapes de Réalisation

- **Étapes**:
  - Développement de la fonctionnalité pour afficher les réponses du chatbot dans une liste triée par date et heure.
- **Justification**: Assure que les réponses du chatbot sont accessibles et bien organisées pour l'utilisateur.

#### Défis Rencontrés et Solutions

- **Défi**: Affichage performant des réponses avec une gestion efficace du tri.
  - **Solution**: Implémentation d'une logique de tri côté serveur pour minimiser la charge côté client.

#### Évaluation des Résultats

- **Résultat**: Réponses du chatbot affichées correctement avec un tri efficace par date et heure.
- **Évaluation**: Vérifié avec des scénarios de test pour garantir une expérience utilisateur fluide.

#### Propositions d'Améliorations Futures

- **Amélioration**: Ajouter des fonctionnalités de filtrage pour les réponses spécifiques ou les types de réponses.

### Authentification

#### Méthodologie et Étapes de Réalisation

- **Étapes**:
  - Intégration des méthodes d'authentification par email, Google et GitHub.
  - Configuration de la gestion des sessions utilisateurs.
- **Justification**: Permet aux utilisateurs de se connecter de manière sécurisée et pratique, avec plusieurs options de connexion.

#### Défis Rencontrés et Solutions

- **Défi**: Sécurisation des processus d'authentification et gestion des sessions.
  - **Solution**: Utilisation de bibliothèques d'authentification éprouvées et de mécanismes de protection contre les attaques courantes.

#### Évaluation des Résultats

- **Résultat**: Authentification fonctionnelle avec plusieurs options de connexion.
- **Évaluation**: Testée pour s'assurer de la sécurité et de la fiabilité des processus de connexion et de gestion des sessions.

#### Propositions d'Améliorations Futures

- **Amélioration**: Ajouter des fonctionnalités de gestion de compte (ex. : réinitialisation de mot de passe, gestion des connexions).

### Settings

#### Méthodologie et Étapes de Réalisation

- **Étapes**:
  - Développement des fonctionnalités de gestion des paramètres utilisateurs (ex. : mise à jour du profil).
- **Justification**: Permet aux utilisateurs de personnaliser leur expérience en fonction de leurs préférences.

#### Défis Rencontrés et Solutions

- **Défi**: Assurer la persistance et la sécurité des paramètres utilisateurs.
  - **Solution**: Utilisation de stockage sécurisé et de mécanismes de validation des données.

#### Évaluation des Résultats

- **Résultat**: Paramètres utilisateur modifiables avec succès.
- **Évaluation**: Testé pour garantir que les modifications sont correctement enregistrées et reflétées dans l'application.

#### Propositions d'Améliorations Futures

- **Amélioration**: Ajouter des options de personnalisation plus détaillées (ex. : thèmes, préférences de notification).

### Page d'accueil

#### Méthodologie et Étapes de Réalisation

- **Étapes**:
  - Création de la page d'accueil avec des éléments de navigation et des informations clés sur l'application.
- **Justification**: Sert de point d'entrée principal pour l'application, offrant une vue d'ensemble et un accès facile aux fonctionnalités principales.

#### Défis Rencontrés et Solutions

- **Défi**: Création d'une interface utilisateur attrayante et fonctionnelle.
  - **Solution**: Utilisation de bibliothèques de composants modernes et de techniques de design UX/UI pour améliorer l'attrait visuel et l'utilisabilité.

#### Évaluation des Résultats

- **Résultat**: Page d'accueil bien structurée et fonctionnelle.
- **Évaluation**: Vérifiée pour s'assurer qu'elle répond aux objectifs de présentation et de navigation de l'application.

#### Propositions d'Améliorations Futures

- **Amélioration**: Ajouter des éléments interactifs et des appels à l'action pour améliorer l'engagement des utilisateurs.

## Introduction to Refining

L'objectif du raffinage est d'améliorer les performances du modèle créer pour permettre de lui attribuer des reglès précie.

Pour améliorer les performances dans le contenu de la requête on peux y ajouter des options dans le message, par exemple "Décris moi paris, sans caractère spéciaux et en minuscule".

Pour commencer l'affinage nous pouvous créer un ensemble de donnée d'entrainement, qui sera là comme une conversation entre l'utilisateur et le bot, pour que le bot puisse apprendre à répondre à des questions.

ce qui va nous permettre de lui apprendre certaine régles.

### Taille des donnée d'entrainement

Plus il y a d'exemples dans l'ensemble de donnée d'entrainement plus le modèle sera performant, mais il faut faire attention à ne pas avoir trop d'exemple, car cela peut ralentir le modèle.

### Importer l'ensemble de donneé de réglages

les données sont transmises grâce à l'api ou via un fichier créer aupréalable.
Pour importer des donnée il est possible d'ajouter l'objet `training_data` pour y mettre tous nos exemples

### Paramétre de réglages avancés

- Époques : Un cycle d'entraînement complet où chaque exemple de l'ensemble de données est traité une fois.

- Taille de lot : Le nombre d'exemples utilisés dans chaque itération d'entraînement.

- Taux d'apprentissage : Un nombre qui détermine l'intensité de l'ajustement des paramètres du modèle à chaque itération.

- Multiplicateur du taux d'apprentissage : Modifie le taux d'apprentissage original du modèle. Une valeur supérieure à 1 l'augmente, tandis qu'une valeur entre 0 et 1 le réduit.

### Authentification

Le réglage permettant de paramétrer l'api necessite une authentification,

Si une erreur 'PermissionDenied: 403 Request had insufficient authentication scopes, il faut configurer le profil de l'utilisateur

### Limite des modèles réglés

- La limite d'un modèle Flash Gemini 1.5 affiné est de 40 000 caractères.

- Le mode JSON n'est pas compatible avec les modèles réglés.

- Seule la saisie de texte est acceptée.

##
