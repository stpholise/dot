export const formatDateDDMMYYYY = (date: Date):string => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`
}