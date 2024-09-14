import React, { useState } from "react";
import { ethers } from "ethers";
import './App.css';

function App() {
  const supplyChainAddress =  '0x7f0ab5c00019fc07c1d71c0e42dccfaef846b482';//'0x562143326c9c75e4bf677c0513e45d77526de7fb';
  const ABI = [
    {
      "inputs": [
        {
          "internalType": "string[]",
          "name": "_localOrigins",
          "type": "string[]"
        },
        {
          "internalType": "string[]",
          "name": "_trustfulProducts",
          "type": "string[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "enum SupplyChain.State",
          "name": "state",
          "type": "uint8"
        }
      ],
      "name": "ProductStateChange",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "getAllProducts",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "origin",
              "type": "string"
            },
            {
              "internalType": "enum SupplyChain.State",
              "name": "state",
              "type": "uint8"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "isTrustful",
              "type": "bool"
            }
          ],
          "internalType": "struct SupplyChain.Product[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getProduct",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "origin",
              "type": "string"
            },
            {
              "internalType": "enum SupplyChain.State",
              "name": "state",
              "type": "uint8"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "isTrustful",
              "type": "bool"
            }
          ],
          "internalType": "struct SupplyChain.Product",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getProductHistory",
      "outputs": [
        {
          "components": [
            {
              "internalType": "enum SupplyChain.State",
              "name": "state",
              "type": "uint8"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct SupplyChain.ProductHistory[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_productId",
          "type": "uint256"
        }
      ],
      "name": "isInformationTrustful",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "isProductLocal",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "localOrigins",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
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
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "productHistories",
      "outputs": [
        {
          "internalType": "enum SupplyChain.State",
          "name": "state",
          "type": "uint8"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "products",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "origin",
          "type": "string"
        },
        {
          "internalType": "enum SupplyChain.State",
          "name": "state",
          "type": "uint8"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "isTrustful",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "purchase",
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
          "name": "_origin",
          "type": "string"
        }
      ],
      "name": "registerProduct",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "transfer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "trustfulProducts",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "enum SupplyChain.State",
          "name": "_state",
          "type": "uint8"
        }
      ],
      "name": "updateProductState",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  
  const [productName, setProductName] = useState('');
  const [productOrigin, setProductOrigin] = useState('');
  const [productId, setProductId] = useState(0);
  const [newOwner, setNewOwner] = useState('');
  const [productDetails, setProductDetails] = useState({});
  const [productHistory, setProductHistory] = useState([]);
  const [isTrustful, setIsTrustful] = useState(null);
  const [isLocal, setIsLocal] = useState(null);

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function registerProduct() {
    if (!productName || !productOrigin) return;
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(supplyChainAddress, ABI, signer);
      const transaction = await contract.registerProduct(productName, productOrigin);
      await transaction.wait();
      console.log('Product registered:', productName, productOrigin);
    }
  }

  async function fetchProduct() {
    if (!productId) return;
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(supplyChainAddress, ABI, provider);
      const product = await contract.getProduct(productId);
      setProductDetails(product);
      const history = await contract.getProductHistory(productId);
      setProductHistory(history);
    }
  }

  async function checkInformationTrustful() {
    if (!productId) {
      console.error("Missing product details");
      return;
    }
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(supplyChainAddress, ABI, provider);
        const trustful = await contract.isInformationTrustful(productId);
        setIsTrustful(trustful);
      } else {
        console.error("Ethereum provider is not available");
      }
    } catch (error) {
      console.error("Error checking information trustfulness:", error);
    }
  }

  async function checkProductLocal() {
    if (!productId) return;
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(supplyChainAddress, ABI, provider);
      const local = await contract.isProductLocal(productId);
      setIsLocal(local);
    }
  }

  async function transferProductOwnership() {
    if (!productId || !newOwner) return;
  
    try {
      if (typeof window.ethereum !== 'undefined') {
        await requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(supplyChainAddress, ABI, signer);
  
        console.log("Transferring product with ID:", productId);
        console.log("New owner address:", newOwner);
  
        const transaction = await contract.transfer(productId, newOwner);
        await transaction.wait();
  
        console.log("Product ownership transferred:", productId, newOwner);
        fetchProduct(); // Update the product details after transfer
      }
    } catch (error) {
      console.error("Error transferring product ownership:", error);
      alert("Transfer failed. Please check the console for more details.");
    }
  }

  async function purchaseProduct() {
    if (!productId) return;
  
    try {
      if (typeof window.ethereum !== 'undefined') {
        await requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(supplyChainAddress, ABI, provider);
  
        // Fetch the product details before purchase
        const product = await contract.getProduct(productId);
  
        // Check if the product is already sold
        if (product.state === 3) { // Assuming 3 represents the 'Sold' state
          alert("Error: This product has already been sold.");
          return;
        }
  
        // If not sold, proceed with the purchase
        const signer = provider.getSigner();
        const contractWithSigner = new ethers.Contract(supplyChainAddress, ABI, signer);
        const transaction = await contractWithSigner.purchase(productId);
        await transaction.wait();
  
        console.log('Product purchased:', productId);
        fetchProduct(); // Update the product details after the purchase
      }
    } catch (error) {
      console.error("Error purchasing product:", error);
      alert("Failed to purchase the product. Please try again.");
    }
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Supply Chain DApp</h1>
      </header>
      <main className="App-main">

        {/* Register product */}
        <section className="product-section">
          <h2>Register Product</h2>
          <div className="form-container">
            <input 
              type="text" 
              value={productName} 
              onChange={(e) => setProductName(e.target.value)} 
              placeholder="Product Name" 
              className="form-input"
            />
            <input 
              type="text" 
              value={productOrigin} 
              onChange={(e) => setProductOrigin(e.target.value)} 
              placeholder="Product Origin" 
              className="form-input"
            />
            <button onClick={registerProduct} className="form-button">Register Product</button>
          </div>
        </section>

        {/* Get Product Details */}
        <section className="product-section">
          <h2>Get Product Details</h2>
          <div className="form-container">
            <input 
              type="number" 
              value={productId} 
              onChange={(e) => setProductId(Number(e.target.value))} 
              placeholder="Product ID" 
              className="form-input"
            />
            <button onClick={fetchProduct} className="form-button">Fetch Product</button>
          </div>
          {productDetails && (
            <div className="product-info">
              <p><strong>Name:</strong> {productDetails.name}</p>
              <p><strong>Origin:</strong> {productDetails.origin}</p>
              <p><strong>State:</strong> {['Produced', 'Processed', 'Distributed', 'Sold'][productDetails.state]}</p>
            </div>
          )}
        </section>

        {/* Check Information */}
        <section className="product-section">
          <button onClick={checkInformationTrustful} className="form-button">Check Information Trustful</button>
          {isTrustful !== null && (
            <p className={isTrustful ? 'trustful' : 'not-trustful'}>
              Information is {isTrustful ? 'Trustful' : 'Not Trustful'}
            </p>
          )}
          <button onClick={checkProductLocal} className="form-button">Check if Product is Local</button>
          {isLocal !== null && (
            <p className={isLocal ? 'local' : 'not-local'}>
              Product is {isLocal ? 'Local' : 'Not Local'}
            </p>
          )}
        </section>

        {/* Purchase Product Section */}
        <section className="product-section">
          <h2>Purchase Product</h2>
          <div className="form-container">
            <input 
              type="number" 
              value={productId} 
              onChange={(e) => setProductId(Number(e.target.value))} 
              placeholder="Product ID" 
              className="form-input"
            />
            <button onClick={purchaseProduct} className="form-button">Purchase Product</button>
          </div>
        </section>

        {/* Transfer Product Section */}
        <section className="product-section">
          <h2>Transfer Product</h2>
          <div className="form-container">
            <input 
              type="number" 
              value={productId} 
              onChange={(e) => setProductId(Number(e.target.value))} 
              placeholder="Product ID" 
              className="form-input"
            />
            <input 
              type="text" 
              value={newOwner} 
              onChange={(e) => setNewOwner(e.target.value)} 
              placeholder="New Owner Address" 
              className="form-input"
            />
            <button onClick={transferProductOwnership} className="form-button">Transfer Product</button>
          </div>
        </section>

        {/* Product History */}
        {productHistory.length > 0 && (
          <section className="product-history">
            <h3>Product History</h3>
            <ul>
              {productHistory.map((event, index) => (
                <li key={index}>
                  <p><strong>Name:</strong> {productDetails.name}</p>
                  <p><strong>Origin:</strong> {productDetails.origin}</p>
                  <p><strong>State:</strong> {['Produced', 'Processed', 'Distributed', 'Sold'][event.state]}</p>
                  <p><strong>Owner:</strong> {event.owner}</p>
                  <p><strong>Timestamp:</strong> {new Date(event.timestamp * 1000).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
