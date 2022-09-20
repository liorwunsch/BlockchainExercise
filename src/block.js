import sha256 from 'crypto-js/sha256.js';

export class Block {
    constructor(timestamp, transcations, previousHash = '') {
        this.timestamp = timestamp;
        this.transcations = transcations;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return sha256(this.previousHash + this.timestamp
            + JSON.stringify(this.transcations) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash)
    }
}
