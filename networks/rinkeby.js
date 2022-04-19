require('dotenv').config()
const ethers = require('ethers');

const VALIDATOR_KEY = process.env.VALIDATOR_KEY_TEST
const WSS_URL = process.env.RINKEBY_WS
const BRIDGE_ADDRESS = process.env.RINKEBY_ADDRESS
const provider = new ethers.providers.WebSocketProvider(WSS_URL)
const wallet = new ethers.Wallet(VALIDATOR_KEY)
const account = wallet.connect(provider);
const bridgeABI = require('../abi/Bridge.json')

const bridge = new ethers.Contract(BRIDGE_ADDRESS, bridgeABI, account)

module.exports = {bridge, provider, wallet}