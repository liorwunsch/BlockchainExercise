const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash)
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock() {
        let index = 0;
        let timestamp = "01/01/2017";
        let data = "Genesis block";
        let previousHash = "0";
        return new Block(index, timestamp, data, previousHash);
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(timestamp, data) {
        let index = this.chain.length;
        let previousHash = this.getLatestBlock().hash;
        let block = new Block(index, timestamp, data, previousHash);
        block.mineBlock(this.difficulty);
        this.chain.push();
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const block = this.chain[i];
            const prevBlock = this.chain[i-1];

            if (block.hash !== block.calculateHash()) {
                return false;
            }
            if (block.previousHash !== prevBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

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
