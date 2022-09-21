const {Blockchain} = require('./blockchain')
const {Transaction} = require('./transaction')
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('e9971f9e16d3fad0af51d417105c749603479c211db94f330d751d131fe2851a');
const myWalletAddress = myKey.getPublic('hex');

let savjeeCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
savjeeCoin.addTransaction(tx1);

console.log('\n Starting the miner...');
savjeeCoin.minePendingTransactions(myWalletAddress);
savjeeCoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of xavier is ', savjeeCoin.getBalanceOfAddress(myWalletAddress));

console.log('Is chain valid? ', savjeeCoin.isChainValid());

savjeeCoin.chain[1].transcations[0].amount = 1;
console.log('Is chain valid? ', savjeeCoin.isChainValid());
