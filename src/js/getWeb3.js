import Web3 from 'web3';

async function getWeb3() {
  let web3 = window.web3;

  if (typeof web3 !== 'undefined') {
    // Use MetaMask's provider.
    web3 = new Web3(window.web3.currentProvider);
    window.w3 = web3;

    return web3;
  } else {
    throw new Error("Can't connect to metamask's injected web3");
  }
}

export default getWeb3;