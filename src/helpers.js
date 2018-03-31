const CONTRACT_ADDRESS = "0xc6de26CAa259918ff44B661C45242E400B207858";
const ABI_URL = "https://gist.githubusercontent.com/goodstemy/df155f91c2603d770f83a5a4809ef093/raw/587bd2aeb0d3a4b4afe6badc15709712ce99a356/ValidatorsListAbi.json";

async function getCandidates(web3) {
  let abi;

  try {
    abi = await getAbi();
  } catch (err) {
    console.error(`Error while getting ABI: ${err}`);
  }

  let contract;

  try {
    contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
  } catch (err) {
    console.log(`Error while creating contract instance: ${err}`);
  }

  let candidatesAdresses = await contract.methods.getCandidates().call();
  let candidates = [];

  for (let i = 0; i < candidatesAdresses.length; i++) {
    let candidate = await contract.methods.getCandidateByAddress(candidatesAdresses[i]).call();

    candidate["address"] = candidatesAdresses[i];

    candidates.push(candidate);
  }

  return candidates;
}

async function getValidators(web3) {
  let abi;

  try {
    abi = await getAbi();
  } catch (err) {
    console.error(`Error while getting ABI: ${err}`);
  }

  let contract;

  try {
    contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
  } catch (err) {
    console.log(`Error while creating contract instance: ${err}`);
  }

  let r;
  try {
    r = await contract.methods.getCandidateByAddress("0xE091c3A55485BC1b09472D30A8A40FFB2C86d090").call();
  } catch (err) {
    console.log(err);
  }
  console.log(r);

  let validatorsAddresses;

  try {
    validatorsAddresses = await contract.methods.getValidators().call();
  } catch (err) {
    console.error(`Error while getting validators list: ${err}`);
  }

  let validators = [];

  for (let i = 0; i < validatorsAddresses.length; i++) {
    let validator;

    try {
      validator = await contract.methods.getCandidateByAddress(validatorsAddresses[i]).call();
    } catch (err) {
      console.error(`Error while getting candidate info by addres: ${err}`);
    }
    validator["address"] = validatorsAddresses[i];

    validators.push(validator);
  }

  return validators;
}

async function getAbi() {
  try {
    const res = await fetch(ABI_URL);

    return await res.json();
  } catch (err) {
    throw err;
  }
}

export default {getValidators, getCandidates, CONTRACT_ADDRESS, ABI_URL, getAbi};

