export function generateSlug(anything: string, separateBy: string) {
    return anything.toLowerCase().split(separateBy).join('-');
}