export const unaccentFormat = (words: string) => {
    return words.normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase();
}