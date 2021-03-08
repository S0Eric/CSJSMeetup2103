# SolidTypeScriptStarterProject

A starter project for the Solid JavaScript library with TypeScript source.

Webpack is the main driver of the build process and is very configurable. It's main purpose is to start with one or more top level TypeScript source files, determine the dependency tree, and bundle everything into a single minified JavaScript file. Typescript and babel are configured as plugins to webpack. Solid requires specific JSX processing and this is done by configuring the TypeScript compiler to pass the JSX through unchanged, and then Solid's babel plugin translates the JSX syntax into Solid specific JavaScript code that renders the DOM nodes.

### Requirement:
- Node


After cloning, run this command to download all dependencies:

```
npm install
```

### For more information, visit these web sites:

[Solid](https://github.com/ryansolid/solid)

[TypeScript](https://www.typescriptlang.org/)

### Project Commands:

To launch Webpack's development server (has hot loading):

```
npm run dev
```

Then [open app in your browser.](http://localhost:8080)

To compile the TypeScript source into public/ts-bundle.js (mode=development):

```
npm run build-dev
```

To compile the TypeScript source into public/ts-bundle.min.js (mode=production):

```
npm run build
```

To watch the source folder and execute the build-dev script whenever a change is detected:

```
npm run watch
```

