const ethers = require('ethers');
const bsc_testnet = require ('./networks/bsc_testnet')
const rinkeby = require ('./networks/rinkeby')
const bsc = require ('./networks/bsc_mainnet')
const matic = require ('./networks/matic_mainnet')

const chain_id = {
    '4' : rinkeby,
    '97' : bsc_testnet,
    '56' : bsc,
    '137' : matic,
}

bsc.bridge.on('SwapInitialized', async (from,to,ammount,ticker,chainTo,chainFrom,nonce) =>{

    console.log(`
        BSC Event Swap Emitted :
        =================================================
        from: ${from}
        to: ${to}
        ammount: ${ammount}
        ticker: ${ticker}
        chainTo: ${chainTo}
        chainFrom: ${chainFrom}
        nonce: ${nonce}
    `);

    const message = ethers.utils.solidityKeccak256(
        ["address", "address", "uint256", "string", "uint256", "uint256", "uint256"],
        [from, to, ammount, ticker, chainFrom, chainTo, nonce]
    );

    const signature = await bsc.wallet.signMessage(ethers.utils.arrayify(message));
    console.log(signature)
    const tx = await chain_id[chainTo].bridge.redeem(from, to, ammount, ticker, chainFrom, chainTo, nonce, signature)
    console.log(tx)
    const txhash = await tx.wait()

    console.log(txhash.transactionHash)

});

matic.bridge.on('SwapInitialized', async (from,to,ammount,ticker,chainTo,chainFrom,nonce) =>{

    console.log(`
        MATIC Event Swap Emitted :
        =================================================
        from: ${from}
        to: ${to}
        ammount: ${ammount}
        ticker: ${ticker}
        chainTo: ${chainTo}
        chainFrom: ${chainFrom}
        nonce: ${nonce}
    `);

    const message = ethers.utils.solidityKeccak256(
        ["address", "address", "uint256", "string", "uint256", "uint256", "uint256"],
        [from, to, ammount, ticker, chainFrom, chainTo, nonce]
    );

    const signature = await matic.wallet.signMessage(ethers.utils.arrayify(message));

    const tx = await chain_id[chainTo].bridge.redeem(from, to, ammount, ticker, chainFrom, chainTo, nonce, signature)
    const txhash = await tx.wait()

    console.log(txhash.transactionHash)

});


bsc_testnet.bridge.on('SwapInitialized', async (from,to,ammount,ticker,chainTo,chainFrom,nonce) =>{

    console.log(`
        BSC TESTNET Event Swap Emitted :
        =================================================
        from: ${from}
        to: ${to}
        ammount: ${ammount}
        ticker: ${ticker}
        chainTo: ${chainTo}
        chainFrom: ${chainFrom}
        nonce: ${nonce}
    `);

    const message = ethers.utils.solidityKeccak256(
        ["address", "address", "uint256", "string", "uint256", "uint256", "uint256"],
        [from, to, ammount, ticker, chainFrom, chainTo, nonce]
    );

    const signature = await bsc_testnet.wallet.signMessage(ethers.utils.arrayify(message));

    const tx = await chain_id[chainTo].bridge.redeem(from, to, ammount, ticker, chainFrom, chainTo, nonce, signature)
    const txhash = await tx.wait()

    console.log(txhash.transactionHash)

});

rinkeby.bridge.on('SwapInitialized', async (from,to,ammount,ticker,chainTo,chainFrom,nonce) =>{

    console.log(`
        RINKEBY Event Swap Emitted :
        =================================================
        from: ${from}
        to: ${to}
        ammount: ${ammount}
        ticker: ${ticker}
        chainTo: ${chainTo}
        chainFrom: ${chainFrom}
        nonce: ${nonce}
    `);

    const message = ethers.utils.solidityKeccak256(
        ["address", "address", "uint256", "string", "uint256", "uint256", "uint256"],
        [from, to, ammount, ticker, chainFrom, chainTo, nonce]
    );

    const signature = await rinkeby.wallet.signMessage(ethers.utils.arrayify(message));

    const tx = await chain_id[chainTo].bridge.redeem(from, to, ammount, ticker, chainFrom, chainTo, nonce, signature)
    const txhash = await tx.wait()

    console.log(txhash.transactionHash)

});

