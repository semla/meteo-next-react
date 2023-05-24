export function formatDate(date: Date | undefined, locale = 'es-ES') {
    if (date) {
        const options = {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        } as const;
        return new Intl.DateTimeFormat(locale, options).format(date);
    } else {
        return null
    }
}
