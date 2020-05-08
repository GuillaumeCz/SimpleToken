# ERC721 simple implementation

## First run

```
git clone https://github.com/GuillaumeCz/ERC721-implementation.git
cd ERC721-implementation

# initialization
npm install
npm install -g truffle

# You'll need `ganache-cli` in order to simulate a blockchain.
npm install -g ganache-cli

# run the following in a separate terminal
ganache-cli --deterministic

# Compile the contracts 
npm run compile

# Generate typings
npm run generate 
# npm run generate:windows if you're running the project on Windows

# Test the contracts
npm test

```
In order to use Typescript for the tests, you should carefully regenerate the typings each time you add changes to the contracts and before running the tests.

Have fun ;)
