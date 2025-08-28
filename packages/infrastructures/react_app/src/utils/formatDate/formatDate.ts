//Méthodes pour le format de la date
export const formatDate = (date: Date = new Date()): string => {
    const userLang: string = navigator.language.split('-')[0];
    return new Date(date).toLocaleDateString(userLang, { year: 'numeric', month: 'numeric', day: 'numeric' });
};