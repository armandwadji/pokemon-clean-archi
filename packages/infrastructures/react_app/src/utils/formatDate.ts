//Méthodes pour le format de la date
export const formatDate = (date: Date = new Date()): string => {
    const dateConvert = new Date(date);
    return `${dateConvert.getDate()}/${dateConvert.getMonth() + 1}/${dateConvert.getFullYear()}`;
};