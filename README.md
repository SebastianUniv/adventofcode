# Advent of Code
This repository includes MERN solutions to the advent of code 2021.

## Solved days
- [x] 4
- [x] 5
- [x] 6

## Environment
The repository assumes the following dependencies:

![](https://img.shields.io/badge/Node-v16.x-blue)
![](https://img.shields.io/badge/JavaScript-es2021-blue)

## Usage
The following commands should be executed in the src directory.

### Commands
Build JavaScript from TypeScript:
```sh
yarn build
```
Run compiled JavaScript:
```sh
yarn start
```
Run TypeScript with compilation on the fly:
```sh
yarn dev
```
Run Jest tests, if no test type is given it will run all tests:
```sh
yarn test <test-type> --coverage
```

## Notes
 - Currently the datafiles with .txt extension are not copied during the build operation, so manual moving/copying is required. This is not necessary for the `yarn dev` command.
 - Day 4 may be optimized by remembering which pulled numbers have already been iterated over.
