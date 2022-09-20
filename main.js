import { Blockchain } from './Blockchain.js';
import { Transaction } from './Transaction.js';

let savjeeCoin = new Blockchain();
savjeeCoin.createTransaction(new Transaction('address1', 'address2', 100));
savjeeCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the miner...');
savjeeCoin.minePendingTransactions('xaviers-address');

console.log('\nBalance of xavier is ', savjeeCoin.getBalanceOfAddress('xaviers-address'));

console.log('\n Starting the miner again...');
savjeeCoin.minePendingTransactions('xaviers-address');

console.log('\nBalance of xavier is ', savjeeCoin.getBalanceOfAddress('xaviers-address'));
