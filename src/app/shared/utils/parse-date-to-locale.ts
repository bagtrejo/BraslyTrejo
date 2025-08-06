export const parseLocalDate = (value: any): Date => {
    if (typeof value === 'string' && value.includes('-')) {
        const [year, month, day] = value.split('-').map(Number);
        return new Date(year, month - 1, day);
    }
    const date = new Date(value);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}