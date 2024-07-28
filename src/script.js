// Initialize web3
window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));

const contractAddress = '0xD37Ec31D5E4A7bD8650756653ECE51CD61ae389c';  
const contractABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "string",
            "name": "productId",
            "type": "string"
          }
        ],
        "name": "ProductAdded",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "locationList",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "name": "locations",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "productCounter",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "productIds",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "name": "products",
        "outputs": [
          {
            "internalType": "string",
            "name": "id",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "manufacturer",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "origin",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "destination",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "date_of_departure",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "expected_arrival_date",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "status",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "exists",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "shipmentHistories",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "origin",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "destination",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "date_of_departure",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "expected_arrival_date",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "status",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "name": "statuses",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "users",
        "outputs": [
          {
            "internalType": "address",
            "name": "userAddress",
            "type": "address"
          },
          {
            "internalType": "enum PharmaChain.Role",
            "name": "role",
            "type": "uint8"
          },
          {
            "internalType": "bool",
            "name": "exists",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_userAddress",
            "type": "address"
          },
          {
            "internalType": "enum PharmaChain.Role",
            "name": "_role",
            "type": "uint8"
          }
        ],
        "name": "addUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_userAddress",
            "type": "address"
          }
        ],
        "name": "removeUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_location",
            "type": "string"
          }
        ],
        "name": "addLocation",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_location",
            "type": "string"
          }
        ],
        "name": "removeLocation",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_manufacturer",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_quantity",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_origin",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_destination",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_date_of_departure",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_expected_arrival_date",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_status",
            "type": "string"
          }
        ],
        "name": "addProduct",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_productId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_origin",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_destination",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_date_of_departure",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_expected_arrival_date",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_status",
            "type": "string"
          }
        ],
        "name": "updateProductLocation",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "enum PharmaChain.ProductStatus",
            "name": "status",
            "type": "uint8"
          }
        ],
        "name": "getIndex",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "pure",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_productId",
            "type": "string"
          }
        ],
        "name": "getProduct",
        "outputs": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "id",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "manufacturer",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "origin",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "destination",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "date_of_departure",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "expected_arrival_date",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "status",
                "type": "string"
              },
              {
                "internalType": "bool",
                "name": "exists",
                "type": "bool"
              }
            ],
            "internalType": "struct PharmaChain.Product",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_productId",
            "type": "string"
          }
        ],
        "name": "getProductHistory",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "origin",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "destination",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "date_of_departure",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "expected_arrival_date",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "status",
                "type": "string"
              }
            ],
            "internalType": "struct PharmaChain.ShipmentHistory[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "getAllLocations",
        "outputs": [
          {
            "internalType": "string[]",
            "name": "",
            "type": "string[]"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      }
];

const pharmaChain = new web3.eth.Contract(contractABI, contractAddress);

// Function to get accounts from web3 provider
async function getAccounts() {
    return await web3.eth.getAccounts();
}

// Populate account dropdown
async function populateAccountDropdown() {
    const accounts = await getAccounts();
    const accountSelect = document.getElementById('accountSelect');

    accounts.forEach(account => {
        const option = document.createElement('option');
        option.value = account;
        option.textContent = account;
        accountSelect.appendChild(option);
    });
}

// Get selected account
function getSelectedAccount() {
    const accountSelect = document.getElementById('accountSelect');
    return accountSelect.value;
}

// Display status messages
function displayStatus(message, elementId) {
    const statusMessage = document.getElementById(elementId);
    statusMessage.textContent = message;
}

// Helper function to convert BigInt to strings
function convertBigIntsToStrings(obj) {
    if (typeof obj === 'bigint') {
        return obj.toString();
    } else if (Array.isArray(obj)) {
        return obj.map(convertBigIntsToStrings);
    } else if (typeof obj === 'object' && obj !== null) {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [key, convertBigIntsToStrings(value)])
        );
    } else {
        return obj;
    }
}

// Helper function to convert timestamp to readable date and time format
function formatTimestamp(timestamp) {
    const date = new Date(Number(timestamp) * 1000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
}

// Add product
document.getElementById('addProductForm').onsubmit = async (event) => {
    event.preventDefault();
    const fromAccount = getSelectedAccount();

    const name = document.getElementById('productName').value;
    const manufacturer = document.getElementById('manufacturer').value;
    const quantity = document.getElementById('quantity').value;
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const dateOfDeparture = document.getElementById('dateOfDeparture').value;
    const expectedArrivalDate = document.getElementById('expectedArrivalDate').value;
    const status = document.getElementById('status').value;

    try {
        const receipt = await pharmaChain.methods.addProduct(name, manufacturer, quantity, origin, destination, dateOfDeparture, expectedArrivalDate, status)
            .send({ from: fromAccount, gas: 3000000 });

        // Extract productId from the logs
        const productId = receipt.events.ProductAdded.returnValues.productId;
        displayStatus(`Your product id is ${productId}. Please save it!`, 'addProductStatus');
    } catch (error) {
        console.error('Error adding product:', error); // Log the error for debugging
        displayStatus(`Error: ${error.message}`, 'addProductStatus');
    }
};

// Event listener for ProductAdded event (Optional, as we are capturing the event from the receipt)
pharmaChain.events.ProductAdded({
    fromBlock: 'latest'
}, function (error, event) {
    if (error) {
        console.error('Error in event listener:', error); // Log the error for debugging
    } else {
        const productId = event.returnValues.productId;
        displayStatus(`Your product id is ${productId}. Please save it!`, 'addProductStatus');
    }
});

// Update product location
document.getElementById('updateProductForm').onsubmit = async (event) => {
    event.preventDefault();
    const fromAccount = getSelectedAccount();

    const productId = document.getElementById('updateProductId').value;
    const origin = document.getElementById('updateOrigin').value;
    const destination = document.getElementById('updateDestination').value;
    const dateOfDeparture = document.getElementById('updateDateOfDeparture').value;
    const expectedArrivalDate = document.getElementById('updateExpectedArrivalDate').value;
    const status = document.getElementById('updateStatus').value;

    try {
        await pharmaChain.methods.updateProductLocation(productId, origin, destination, dateOfDeparture, expectedArrivalDate, status)
            .send({ from: fromAccount, gas: 3000000 });

        displayStatus('Product location updated successfully', 'updateProductStatus');
    } catch (error) {
        console.error('Error updating product location:', error); // Log the error for debugging
        displayStatus(`Error: ${error.message}`, 'updateProductStatus');
    }
};

// Get product details
document.getElementById('getProductForm').onsubmit = async (event) => {
    event.preventDefault();
    const fromAccount = getSelectedAccount();
    const productId = document.getElementById('getProductId').value;

    try {
        const product = await pharmaChain.methods.getProduct(productId).call({ from: fromAccount });
        const productWithBigIntsAsStrings = convertBigIntsToStrings(product);

        // Format the output
        const formattedOutput = `
            Product Id: ${productWithBigIntsAsStrings.id}
            Name: ${productWithBigIntsAsStrings.name}
            Manufacturer: ${productWithBigIntsAsStrings.manufacturer}
            Quantity: ${productWithBigIntsAsStrings.quantity}
            Origin: ${productWithBigIntsAsStrings.origin}
            Destination: ${productWithBigIntsAsStrings.destination}
            Date of Departure: ${productWithBigIntsAsStrings.date_of_departure}
            Expected Arriving Date: ${productWithBigIntsAsStrings.expected_arrival_date}
            Status: ${productWithBigIntsAsStrings.status}
        `;

        document.getElementById('productDetails').innerText = formattedOutput;
        displayStatus('Product details fetched successfully', 'getProductStatus');
    } catch (error) {
        console.error('Error getting product details:', error); // Log the error for debugging
        displayStatus(`Error: ${error.message}`, 'getProductStatus');
    }
};

// Add user
document.getElementById('addUserForm').onsubmit = async (event) => {
    event.preventDefault();
    const fromAccount = getSelectedAccount();

    const userAddress = document.getElementById('userAddress').value;
    const role = document.getElementById('userRole').value;

    try {
        await pharmaChain.methods.addUser(userAddress, role).send({ from: fromAccount, gas: 3000000 });
        displayStatus('User added successfully', 'addUserStatus');
    } catch (error) {
        console.error('Error adding user:', error); // Log the error for debugging
        displayStatus(`Error: ${error.message}`, 'addUserStatus');
    }
};

// Remove user
document.getElementById('removeUserForm').onsubmit = async (event) => {
    event.preventDefault();
    const fromAccount = getSelectedAccount();

    const userAddress = document.getElementById('removeUserAddress').value;

    try {
        await pharmaChain.methods.removeUser(userAddress).send({ from: fromAccount, gas: 3000000 });
        displayStatus('User removed successfully', 'removeUserStatus');
    } catch (error) {
        console.error('Error removing user:', error); // Log the error for debugging
        displayStatus(`Error: ${error.message}`, 'removeUserStatus');
    }
};

// Add location
document.getElementById('addLocationForm').onsubmit = async (event) => {
    event.preventDefault();
    const fromAccount = getSelectedAccount();

    const locationName = document.getElementById('locationName').value;

    try {
        await pharmaChain.methods.addLocation(locationName).send({ from: fromAccount, gas: 3000000 });
        displayStatus('Location added successfully', 'addLocationStatus');
    } catch (error) {
        console.error('Error adding location:', error); // Log the error for debugging
        displayStatus(`Error: ${error.message}`, 'addLocationStatus');
    }
};

// Remove location
document.getElementById('removeLocationForm').onsubmit = async (event) => {
    event.preventDefault();
    const fromAccount = getSelectedAccount();

    const locationName = document.getElementById('removeLocationName').value;

    try {
        await pharmaChain.methods.removeLocation(locationName).send({ from: fromAccount, gas: 3000000 });
        displayStatus('Location removed successfully', 'removeLocationStatus');
    } catch (error) {
        console.error('Error removing location:', error); // Log the error for debugging
        displayStatus(`Error: ${error.message}`, 'removeLocationStatus');
    }
};

// Get all locations
document.getElementById('getAllLocationsButton').onclick = async () => {
    const fromAccount = getSelectedAccount();
    try {
        const locations = await pharmaChain.methods.getAllLocations().call({ from: fromAccount });
        const formattedLocations = locations.join('\n');
        document.getElementById('allLocations').innerText = formattedLocations;
        displayStatus('Locations fetched successfully', 'getAllLocationsStatus');
    } catch (error) {
        console.error('Error getting all locations:', error); // Log the error for debugging
        displayStatus(`Error: ${error.message}`, 'getAllLocationsStatus');
    }
};

// Get product history
document.getElementById('getProductHistoryForm').onsubmit = async (event) => {
    event.preventDefault();
    const fromAccount = getSelectedAccount();
    const productId = document.getElementById('getProductHistoryId').value;

    try {
        const history = await pharmaChain.methods.getProductHistory(productId).call({ from: fromAccount });
        const historyWithBigIntsAsStrings = history.map(entry => convertBigIntsToStrings(entry));

        // Format the output
        const formattedHistory = historyWithBigIntsAsStrings.map(entry => `
            Timestamp: ${formatTimestamp(entry.timestamp)}
            Origin: ${entry.origin}
            Destination: ${entry.destination}
            Date of Departure: ${entry.date_of_departure}
            Expected Arriving Date: ${entry.expected_arrival_date}
            Status: ${entry.status}
        `).join('\n\n');

        document.getElementById('productHistory').innerText = formattedHistory;
        displayStatus('Product history fetched successfully', 'getProductHistoryStatus');
    } catch (error) {
        console.error('Error getting product history:', error); // Log the error for debugging
        displayStatus(`Error: ${error.message}`, 'getProductHistoryStatus');
    }
};

// Populate account dropdown on page load
window.onload = populateAccountDropdown;