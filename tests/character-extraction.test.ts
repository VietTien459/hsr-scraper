// Import necessary dependencies and functions
import {extractCharacterData} from "../src/character-extraction";
import {createDir, generateRandomFileName} from "../src/helper";
import {writeFile} from "fs";

// Mocking dependencies
jest.mock('../src/helper', () => {
    return ({
        createDir: jest.fn(() => ({})),
        generateRandomFileName: jest.fn(() => 'mockedFileName')
    })
})

jest.mock('fs', () => {
    return ({
        writeFile: jest.fn().mockResolvedValue(43),
    })
})


jest.mock('../src/character-extraction', () => {
    return ({
        extractCharacterData: jest.requireActual('../src/character-extraction').extractCharacterData,
        extractCharacterMainData: jest.fn(() => ({ /* mocked data */})),
        extractCharacterStats: jest.fn(() => ({ /* mocked data */})),
        extractSkills: jest.fn(() => ({ /* mocked data */})),
        extractEidolons: jest.fn(() => ({ /* mocked data */})),
    });
});


// Your test suite
describe('extractCharacterData', () => {
    test('should throw an error for empty HTML string', () => {
        expect(() => extractCharacterData(undefined)).toThrowError('Empty HTML string');
    });

    it('should call createDir with the correct directory', () => {
        extractCharacterData('<valid HTML>');
        expect(createDir).toHaveBeenCalledWith('.out');
    });

    it('should call generateRandomFileName if no outputFileName is provided', async () => {
        const htmlData = '<valid HTML>';

        await extractCharacterData(htmlData);

        expect(generateRandomFileName).toHaveBeenCalledWith('json');
        expect(generateRandomFileName('')).toBe('mockedFileName')
    });

    it('should call writeFile with the correct parameters', async () => {
        const htmlData = '<valid HTML>';
        const expectedFileName = 'mockedFileName';

        await extractCharacterData(htmlData);

        expect(writeFile).toHaveBeenCalledWith(
            `.out/${expectedFileName}.json`,
            expect.any(String),
            {encoding: 'utf8'}
        );
    });
});

