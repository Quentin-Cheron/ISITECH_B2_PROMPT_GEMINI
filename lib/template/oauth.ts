// Fonction pour générer les styles de la classe "container"
const containerStyles = (): string => {
  return `
    font-family: Arial, sans-serif;
    padding: 20px;
    max-width: 600px;
    margin: auto;
    background-color: #f4f4f4;
    border-radius: 8px;
  `;
};

// Fonction pour générer les styles de la classe "header"
const headerStyles = (): string => {
  return `
    background-color: #4CAF50;
    color: white;
    text-align: center;
    padding: 10px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  `;
};

// Fonction pour générer les styles de la classe "content"
const contentStyles = (): string => {
  return `
    background-color: white;
    padding: 20px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  `;
};

// Fonction pour générer les styles de la classe "code"
const codeStyles = (): string => {
  return `
    font-size: 24px;
    font-weight: bold;
    margin: 20px 0;
    text-align: center;
    background-color: #eaf7ea;
    padding: 10px;
    border-radius: 4px;
  `;
};

// Fonction pour générer les styles de la classe "footer"
const footerStyles = (): string => {
  return `
    margin-top: 20px;
    font-size: 12px;
    color: #888;
    text-align: center;
  `;
};

const styles = {
  container: containerStyles(),
  header: headerStyles(),
  content: contentStyles(),
  code: codeStyles(),
  footer: footerStyles(),
};

// Fonction principale pour générer le template HTML avec les styles CSS
export default function generateAuthCodeEmailTemplate(code: string): string {
  return `
    <div style="${styles.container}">
      <div style="${styles.header}">
        <h1>Connexion Sécurisée</h1>
      </div>
      <div style="${styles.content}">
        <p>Bonjour,</p>
        <p>Voici votre code de vérification pour vous connecter :</p>
        <div style="${styles.code}">${code}</div>
        <p>Ce code est valable pendant les prochaines 10 minutes.</p>
        <p>
          Si vous n&apos;avez pas demandé ce code, veuillez ignorer cet email.
        </p>
      </div>
      <div style="${styles.footer}">
        <p>&copy; 2024 Notre Société. Tous droits réservés.</p>
      </div>
    </div>
  `;
}
