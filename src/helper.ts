import {existsSync, mkdirSync} from "fs";

export function generateRandomFileName(extension: string): string {
    // Generate a random string to use as the file name
    const randomString = Math.random().toString(36).substring(7);

    // Combine the random string, current timestamp, and extension to create a unique file name
    return `${randomString}_${Date.now()}.${extension}`;
}

export function createDir(directoryPath: string): void {
    if (!existsSync(directoryPath)) {
        mkdirSync(directoryPath,{recursive: true});
    }
}
