'use strict';
const { Blockchain } = require('./blockchain');
const { Transaction } = require('./transaction');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Your private key goes here
const myKey = ec.keyFromPrivate(
    'e9971f9e16d3fad0af51d417105c749603479c211db94f330d751d131fe2851a'
);

// From that we can calculate your public key (which doubles as your wallet address)
const myWalletAddress = myKey.getPublic('hex');

// Create new instance of Blockchain class
let savjeeCoin = new Blockchain();

// Mine first block
savjeeCoin.minePendingTransactions(myWalletAddress);

// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, 'address2', 100);
tx1.signTransaction(myKey);
savjeeCoin.addTransaction(tx1);

// Mine block
savjeeCoin.minePendingTransactions(myWalletAddress);

// Create second transaction
const tx2 = new Transaction(myWalletAddress, 'address1', 50);
tx2.signTransaction(myKey);
savjeeCoin.addTransaction(tx2);

// Mine block
savjeeCoin.minePendingTransactions(myWalletAddress);

console.log();
console.log(
    `Balance of xavier is ${savjeeCoin.getBalanceOfAddress(myWalletAddress)}`
);

// Uncomment this line if you want to test tampering with the chain
//savjeeCoin.chain[1].transactions[0].amount = 10;

// Check if the chain is valid
console.log();
console.log('Blockchain valid? ', savjeeCoin.isChainValid() ? 'Yes' : 'No');
