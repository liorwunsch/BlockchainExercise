const {Block} = require('./block')
const {Transaction} = require('./transaction')

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        let timestamp = Date.now();
        let data = "Genesis block";
        let previousHash = "0";
        return new Block(timestamp, data, previousHash);
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress) {
        let timestamp = Date.now();
        let block = new Block(timestamp, this.pendingTransactions, this.chain[this.chain.length - 1].hash);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    addTransaction(transcation) {
        if (!transcation.fromAddress || !transcation.toAddress || transcation.fromAddress == null) {
            throw new Error('Transaction must include from and to addresses!');
        }
        if (!transcation.isValid()) {
            throw new Error('Cannot add invalid transaction to chain!');
        }
        this.pendingTransactions.push(transcation);
    }

    getBalanceOfAddress(address) {
        let balance = 0;
        for (const block of this.chain) {
            for (const trans of block.transcations) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }
                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const block = this.chain[i];
            const prevBlock = this.chain[i - 1];

            if (!block.hasValidTransactions()) {
                return false;
            }
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

module.exports.Blockchain = Blockchain;
