import { Block } from './Block.js';

export class Blockchain {
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
