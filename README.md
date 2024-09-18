# Next.js & NextUI Template

This is a template for creating applications using Next.js 14 (app directory) and NextUI (v2).

[Try it on CodeSandbox](https://githubbox.com/nextui-org/next-app-template)

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## How to Use

### Use the template with create-next-app

To create a new project based on this template using `create-next-app`, run the following command:

```bash
npx create-next-app -e https://github.com/nextui-org/next-app-template
```

### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `npm`:

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Setup pnpm (optional)

If you are using `pnpm`, you need to add the following code to your `.npmrc` file:

```bash
public-hoist-pattern[]=*@nextui-org/*
```

After modifying the `.npmrc` file, you need to run `pnpm install` again to ensure that the dependencies are installed correctly.

## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).

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
