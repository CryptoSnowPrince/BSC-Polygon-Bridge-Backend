require('dotenv').config()
const ethers = require('ethers');

const VALIDATOR_KEY = process.env.VALIDATOR_KEY
const WSS_URL = process.env.MATIC_WS
const BRIDGE_ADDRESS = process.env.MATIC_ADDRESS
const provider = new ethers.providers.WebSocketProvider(WSS_URL);
const wallet = new ethers.Wallet(VALIDATOR_KEY);
const account = wallet.connect(provider);
const bridgeABI = require('../abi/Bridge.json')

const bridge = new ethers.Contract(BRIDGE_ADDRESS, bridgeABI, account);

module.exports = { bridge, provider, wallet }