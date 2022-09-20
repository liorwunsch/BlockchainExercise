const SHA256 = require('crypto-js/sha256');

class Block
{
    constructor(index, timestamp, data, previousHash = '')
    {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash()
    {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain
{
    constructor()
    {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock()
    {
        let index = 0;
        let timestamp = "01/01/2017";
        let data = "Genesis block";
        let previousHash = "0";
        return new Block(index, timestamp, data, previousHash);
    }

    getLatestBlock()
    {
        return this.chain[this.chain.length - 1];
    }

    addBlock(timestamp, data)
    {
        let index = this.chain.length;
        let previousHash = this.getLatestBlock().hash;
        this.chain.push(new Block(index, timestamp, data, previousHash));
    }

    isChainValid()
    {
        for (let i = 1; i < this.chain.length; i++)
        {
            const block = this.chain[i];
            const prevBlock = this.chain[i-1];

            if (block.hash !== block.calculateHash())
            {
                return false;
            }
            if (block.previousHash !== prevBlock.hash)
            {
                return false;
            }
        }
        return true;
    }
}

let savjeeCoin = new Blockchain();
savjeeCoin.addBlock("10/07/2017", { amount: 4 });
savjeeCoin.addBlock("12/07/2017", { amount: 10 });

console.log('Is blockchain valid? ' + savjeeCoin.isChainValid());

savjeeCoin.chain[1].data = { amount: 100 };
savjeeCoin.chain[1].hash = savjeeCoin.chain[1].calculateHash();

console.log('Is blockchain valid? ' + savjeeCoin.isChainValid());

//console.log(JSON.stringify(coin, null, 4));
