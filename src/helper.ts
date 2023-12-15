export function getAlphabetPosition(character: string) {
    character = character.toLowerCase()
    if (!/[a-z]/.test(character)) {
        throw new Error("Invalid character")
    }
    return parseInt(character, 36) - 10
}

export function generateRandomFileName(extension: string): string {
    // Generate a random string to use as the file name
    const randomString = Math.random().toString(36).substring(7);

    // Combine the random string, current timestamp, and extension to create a unique file name
    const fileName = `${randomString}_${Date.now()}.${extension}`;

    return fileName;
}
