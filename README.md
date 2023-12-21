# hsr-scraper

**hsr-scraper** is a TypeScript project designed to extract data from honeyhunterworld.com using Node.js. It utilizes TypeScript for type-checking and additional tooling for linting and running scripts.

## Table of Contents

- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository
2. Install dependencies:
```
cd hsr-scraper
npm install
```
3. Compile TypeScript code:
```
npm run compile
```
4. Run the project:
```
npm run start
```


## Scripts

The project includes several npm scripts to facilitate common tasks:

- compile: Compiles TypeScript code using tsc.
- lint: Lints the project files using ESLint.
- start: Runs the TypeScript code using ts-node.
- character: Extracts character data using the extractCharacters function.
- lightcone: Extracts LightCone data using the extractLightCone function.
- relic: Extracts relic data using the extractRelic function.


## Project Structure

The project structure is organized as follows:

- src: Contains the TypeScript source code.
- dist: Stores the compiled JavaScript code.
- .eslintrc.js: ESLint configuration file.
- tsconfig.json: TypeScript configuration file.

## Dependencies

The project has both development and runtime dependencies. Key dependencies include:

- cheerio: Fast and flexible implementation of core jQuery for server-side manipulation of HTML.
- jsdom: A JavaScript implementation of the WHATWG DOM and HTML standards.

Development dependencies include tools for TypeScript, ESLint, and type definitions for various libraries.
