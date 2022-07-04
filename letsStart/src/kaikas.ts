const Caver = require('caver-js');
const caver = new Caver('https://api.baobab.klaytn.net:8651/'); // Boabob testnet
caver.klay.getBlockNumber(function (err, blockNumber) {
  console.log(blockNumber);
});

caver.klay.getBlockNumber().then(console.log);

const account = caver.klay.accounts.create(); //키페어 생성

const wallet = caver.klay.accounts.wallet;

wallet.add(account);

console.log(wallet.length);

console.log(wallet[account.address]);

console.log(wallet[0]);
