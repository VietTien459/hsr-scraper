import { existsSync, rmdirSync } from 'fs';
import {createDir, generateRandomFileName} from "../src/helper";

describe('File Utilities', () => {
    const testDir = './test_directory';

    // Clean up test directory after all tests
    afterAll(() => {
        if (existsSync(testDir)) {
            rmdirSync(testDir, { recursive: true });
        }
    });

    describe('generateRandomFileName', () => {
        it('should generate a random file name with the correct extension', () => {
            const extension = 'txt';
            const fileName = generateRandomFileName(extension);
            expect(fileName).toBeDefined(); // Check if the filename exists
            expect(fileName.endsWith(`.${extension}`)).toBe(true); // Check if the extension is correct
        });
    });

    describe('createDir', () => {
        it('should create a directory if it does not exist', () => {
            createDir(testDir);
            expect(existsSync(testDir)).toBe(true);
        });

        it('should not throw an error if the directory already exists', () => {
            expect(() => createDir(testDir)).not.toThrow();
        });
    });
});
