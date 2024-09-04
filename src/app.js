App = {
  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3();    // Load Web3 and MetaMask connection
    await App.loadAccount();  // Load MetaMask account
    await App.loadContract(); // Load the smart contract
    await App.render();       // Render the UI
  },

  // Load Web3 and connect MetaMask
  loadWeb3: async () => {
    if (window.ethereum) {
      // Modern dapp browsers (MetaMask)
      window.web3 = new Web3(ethereum);
      try {
        // Request account access only if not already connected
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length === 0) {
          console.log("No accounts connected, requesting permission...");
          await ethereum.request({ method: 'eth_requestAccounts' });
        } else {
          console.log("MetaMask is already connected.");
        }
        App.web3Provider = web3.currentProvider;
      } catch (error) {
        console.error('User denied account access:', error);
      }
    } else if (window.web3) {
      // Legacy dapp browsers
      App.web3Provider = web3.currentProvider;
      window.web3 = new Web3(web3.currentProvider);
      console.log('Legacy dApp browser connected');
    } else {
      console.log('Non-Ethereum browser detected. Please install MetaMask!');
    }
  },

  // Load MetaMask account
  loadAccount: async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        console.error("No MetaMask accounts found. Please ensure MetaMask is connected.");
        return;
      }
      App.account = accounts[0];
      console.log('Current MetaMask account:', App.account);
    } catch (error) {
      console.error("Error fetching accounts from MetaMask:", error);
    }
  },

  // Load the smart contract
  loadContract: async () => {
    try {
      const simpleStorage = await fetch('SimpleStorage.json');  // Fetch the contract ABI and address
      const data = await simpleStorage.json();
      App.contracts.SimpleStorage = TruffleContract(data);
      App.contracts.SimpleStorage.setProvider(App.web3Provider);

      // Get the deployed instance of the contract
      App.simpleStorage = await App.contracts.SimpleStorage.deployed();
      console.log("Contract loaded successfully:", App.simpleStorage.address);
    } catch (error) {
      console.error("Failed to load the contract. Ensure it is deployed on the current network.", error);
    }
  },

  // Render the UI
  render: async () => {
    if (App.loading) return;
    App.setLoading(true);

    // Display the current MetaMask account in the UI
    document.getElementById('account').innerText = App.account || 'No account loaded';

    // Display the stored message from the contract
    await App.renderMessage();

    App.setLoading(false);
  },

  // Render the stored message
  renderMessage: async () => {
    try {
      const message = await App.simpleStorage.getMessage();
      document.getElementById('storedMessage').innerText = message || 'No message stored yet.';
    } catch (error) {
      console.error("Error fetching the message from the contract:", error);
    }
  },

  // Set a new message in the contract
  setMessage: async () => {
    try {
      App.setLoading(true);
      const newMessage = document.getElementById('message').value;

      if (!App.simpleStorage) {
        console.error("Contract not loaded yet.");
        return;
      }
      if (!App.account) {
        console.error("No MetaMask account found.");
        return;
      }

      // Send the transaction to set the message
      await App.simpleStorage.setMessage(newMessage, { from: App.account });
      window.location.reload();  // Reload to show the updated message
    } catch (error) {
      console.error("Error setting the message:", error);
    } finally {
      App.setLoading(false);
    }
  },

  // Set loading state
  setLoading: (isLoading) => {
    App.loading = isLoading;
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');
    if (isLoading) {
      loader.style.display = 'block';
      content.style.display = 'none';
    } else {
      loader.style.display = 'none';
      content.style.display = 'block';
    }
  }
};

// Initialize the DApp when the window loads
window.addEventListener('load', function() {
  App.load();
});
