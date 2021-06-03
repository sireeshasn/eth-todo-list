# To-Do List on Blockchain

## Prerequisite

Node version = v10.15

```
$ nvm install 10.15
$ nvm use 10.15
$ node --version
v10.15.3
```

Install npm packages:

```
$ cd eth-todo-list
$ npm cache clean -f
$ rm -rf node_modules
$ rm -rf package-lock.json
$ npm install
```

Install latest version of [Ganache](https://www.trufflesuite.com/ganache) (version 2.5.4) as local Ethereum environment.

Install Chrome browser and necessary extensions for the use of Ethereum wallet:

- [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn): a Ethereum wallet in your browser
- [MetaMask Legacy Web3](https://chrome.google.com/webstore/detail/metamask-legacy-web3/dgoegggfhkapjphahmgihfgemkgecdgl?hl=en): The MetaMask extension provides an API to websites you visit so they can interact with the blockchain. As of December 2020, they stopped injecting the web3.js API by default, which improves security and performance, but can break older and unmaintained websites. With this extension in combination with MetaMask, you can continue using those older sites as before.

## Step 1: Run local Ethereum

Launch Ganache, make sure the RPC address matches the configuration of file *eth-todo-list/truffle-config.js*

![Screen Shot 2021-06-03 at 10.15.12](ReadMe.assets/Screen%20Shot%202021-06-03%20at%2010.15.12.png)

## Step 2: Connect MetaMask to local Ethereum

1. Copy the private key of selected account in the Ganache.

![copy private key](ReadMe.assets/Screen%20Shot%202021-06-03%20at%2010.25.05.png)



2. In MetaMask, choose local Ethereum network.

![choose localhost RPC](ReadMe.assets/Screen%20Shot%202021-06-03%20at%2010.24.06.png)



3. Import the selected account by attaching its private key

![Screen Shot 2021-06-03 at 10.27.51](ReadMe.assets/Screen%20Shot%202021-06-03%20at%2010.27.51.png)

![Screen Shot 2021-06-03 at 10.29.28](ReadMe.assets/Screen%20Shot%202021-06-03%20at%2010.29.28.png)

As we can see, the account address and balance (100 ETH) have been shown in the MetaMask, which means we use MetaMask to manage our Ethereum account in the local network.

## Step 3: Compile Smart Contract and Deploy to local network

Compile the smart contract:

```
eth-todo-list master$ rm -rf build/contracts
eth-todo-list master$ npx truffle compile
Compiling ./contracts/Migrations.sol...
Compiling ./contracts/TodoList.sol...
Writing artifacts to ./build/contracts
```

Deploy the compiled contracts to local Ethereum network. During this process, the account to deploy the contracts need to pay certain amount of "Ether" for the transactions.

```
eth-todo-list master$ npx truffle migrate
⚠️  Important ⚠️
If you're using an HDWalletProvider, it must be Web3 1.0 enabled or your migration will hang.


Starting migrations...
======================
> Network name:    'development'
> Network id:      5777
> Block gas limit: 6721975


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x340c58864b676850c64772aab12945d8884d69afaca717e07ac8e9e3c497533f
   > Blocks: 0            Seconds: 0
   > contract address:    0x6Eb52CdBbc16D04e18f539c44687f12f3134Ca34
   > account:             0x7E2ca108e8095A31F9E3013Aa1119096b4F5D4bC
   > balance:             99.99591182
   > gas used:            204409
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00408818 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00408818 ETH


2_deploy_contracts.js
=====================

   Deploying 'TodoList'
   --------------------
   > transaction hash:    0x5c7d900a01e02b4677592d557eb5f818387ade816ec8d79278320d1af37f5980
   > Blocks: 0            Seconds: 0
   > contract address:    0xfCdB50FB4EC684e76EE451c66D9945D77f638F1E
   > account:             0x7E2ca108e8095A31F9E3013Aa1119096b4F5D4bC
   > balance:             99.98555854
   > gas used:            475389
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00950778 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00950778 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.01359596 ETH

```

After the deployment, we can see the transactions submitted to create the contracts, as well as the new blocks.

![Screen Shot 2021-06-03 at 10.34.35](ReadMe.assets/Screen%20Shot%202021-06-03%20at%2010.34.35.png)

![Screen Shot 2021-06-03 at 10.35.24](ReadMe.assets/Screen%20Shot%202021-06-03%20at%2010.35.24.png)

Now since we've deployed the contract, we can interact with them by using the DApp.

## Step 4: Launch DApp

Start the develop server to run the DApp locally:

```
eth-todo-list master$ npm run dev

> eth-todo-list@1.0.0 dev /Volumes/case/lei_pan_ethereum_demo/eth-todo-list
> lite-server

** browser-sync config **
{ injectChanges: false,
  files: [ './**/*.{html,htm,css,js}' ],
  watchOptions: { ignored: 'node_modules' },
  server:
   { baseDir: [ './src', './build/contracts' ],
     middleware: [ [Function], [Function] ],
     routes: { '/vendor': './node_modules' } } }
[Browsersync] Access URLs:
 ---------------------------------------
       Local: http://localhost:3000
    External: http://192.168.86.113:3000
 ---------------------------------------
          UI: http://localhost:3001
 UI External: http://localhost:3001
 ---------------------------------------
[Browsersync] Serving files from: ./src
[Browsersync] Serving files from: ./build/contracts
[Browsersync] Watching files...
21.06.03 10:42:20 200 GET /index.html

```

And open `localhost:3000` in Chrome browser. Click on MetaMask to check if the DApp is connected. Note if you have multiple accounts in MetaMask, make sure you choose the correct account. A `connect` indicator will show on the MetaMask if everything is OK.

![Screen Shot 2021-06-03 at 10.45.20](ReadMe.assets/Screen%20Shot%202021-06-03%20at%2010.45.20.png)

![Screen Shot 2021-06-03 at 10.47.40](ReadMe.assets/Screen%20Shot%202021-06-03%20at%2010.47.40.png)

Note the balance is reduced because we spent some to deploy the contract.

Try to input a new task in the text field and press RETURN, you will be asked to pay some ether to add a new task to the contract.

![Screen Shot 2021-06-03 at 10.49.29](../../../../Users/lin/Library/Application%20Support/typora-user-images/Screen%20Shot%202021-06-03%20at%2010.50.08.png)

By confirmation, the new task is added to the list, which means a new transaction is submitted to the blockchain by adding a new record to a contract.
