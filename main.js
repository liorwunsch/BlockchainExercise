import { Blockchain } from './Blockchain.js';

let savjeeCoin = new Blockchain();
console.log('Mining block 1...');
savjeeCoin.addBlock("10/07/2017", { amount: 4 });
console.log('Mining block 2...');
savjeeCoin.addBlock("12/07/2017", { amount: 10 });


//console.log(JSON.stringify(coin, null, 4));
//console.log('Is blockchain valid? ' + savjeeCoin.isChainValid());
//savjeeCoin.chain[1].data = { amount: 100 };
//savjeeCoin.chain[1].hash = savjeeCoin.chain[1].calculateHash();
//console.log('Is blockchain valid? ' + savjeeCoin.isChainValid());
