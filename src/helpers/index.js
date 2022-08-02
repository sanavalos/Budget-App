export const generateId = () => {
    const random = Math.random().toString(36).substr(2)
    return random
}

export const generateDate = (date) => {
    const newDate = new Date(date);
    const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }
    return newDate.toLocaleDateString('en-US', options)
}