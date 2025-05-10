export function phoneMask(value: string): string {
    const numericValue = value.replace(/\D/g, '');

    if (numericValue.length > 10) {
        return numericValue.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else {
        return numericValue.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    }
}