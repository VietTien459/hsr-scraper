export function getAlphabetPosition(character: string) {
    character = character.toLowerCase()
    if (!/[a-z]/.test(character)) {
        throw new Error("Invalid character")
    }
    return parseInt(character, 36) - 10
}
