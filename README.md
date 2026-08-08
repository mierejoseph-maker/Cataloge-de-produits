# Catalogue de quincaillerie

Une application web interactive permettant de consulter un inventaire de produits de quincaillerie. Elle présente les articles sous forme de cartes et offre des outils de filtrage, de tri et de promotion.

## Aperçu

Le catalogue contient 12 références réparties dans quatre catégories : **Outillage**, **Fixation**, **Mesure** et **Protection**. Chaque fiche produit affiche sa référence, son nom, son prix et son niveau de stock.

## Fonctionnalités

- Filtrer les produits par catégorie ;
- Limiter les résultats selon un prix maximum à l'aide d'un curseur ;
- Trier les produits par prix, en ordre croissant ou décroissant ;
- Appliquer ou retirer une réduction de 10 % ;
- Identifier automatiquement le produit disponible le moins cher ;
- Afficher les produits en rupture de stock ;
- Calculer le nombre de produits affichés et la valeur totale de leur stock.

## Technologies utilisées

- HTML5
- CSS3
- JavaScript (vanilla JavaScript, sans framework ni dépendance)
- Google Fonts (`Fraunces`, `Work Sans` et `IBM Plex Mono`)

## Structure du projet

```text
.
├── index.html       # Structure de la page et éléments de l'interface
├── style.css         # Mise en page, styles et responsive design
├── catalogue.js      # Données produits, logique de filtrage et rendu dynamique
└── README.md         # Documentation du projet
```

## Lancer le projet

Aucune installation n'est nécessaire.

1. Téléchargez ou clonez le dépôt.
2. Ouvrez le fichier `index.html` dans votre navigateur.

Vous pouvez également utiliser l'extension **Live Server** de Visual Studio Code pour voir les changements automatiquement pendant le développement.

## Utilisation

1. Cliquez sur une catégorie pour n'afficher que ses produits, ou choisissez **Toutes** pour réinitialiser ce filtre.
2. Déplacez le curseur **Prix maximum** pour restreindre les produits affichés.
3. Utilisez les boutons de tri pour classer les produits du moins cher au plus cher, ou inversement.
4. Cliquez sur **Appliquer -10 %** pour afficher les prix remisés.
