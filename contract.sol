// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    // Definisce gli stati possibili per un prodotto
    enum State {Produced, Processed, Distributed, Sold}

    struct Product {
        uint256 id;
        string name;
        string origin;
        State state;
        address owner;
        bool isTrustful;
    }

    struct ProductHistory {
        State state;
        address owner;
        uint256 timestamp;
    }

    mapping(uint256 => Product) public products;  // mapping che associa un id a un prodotto
    mapping(uint256 => ProductHistory[]) public productHistories; // mapping che associa un id di prodotto a un array di cronologie
    mapping(string => bool) public trustfulProducts; // mapping che associa i nomi dei prodotti a un booleano per indicare se il prodotto è affidabile
    
    uint256 public productCounter;
    string[] public localOrigins;
    event ProductStateChange(uint256 id, State state);

    // GLi array passati come parametri vengono utilizzati per popolare le variabili globali localOrigins e trustfulProducts
    constructor(string[] memory _localOrigins, string[] memory _trustfulProducts) {
        localOrigins = _localOrigins;
        for (uint i = 0; i < _trustfulProducts.length; i++) {
            trustfulProducts[_trustfulProducts[i]] = true;
        }
    }

    // Funzione che permette di registrare un nuovo prodotto
    function registerProduct(string memory _name, string memory _origin) public {
        productCounter++;
        bool trustful = trustfulProducts[_name];
        products[productCounter] = Product(
            productCounter,
            _name,
            _origin,
            State.Produced,
            msg.sender,
            trustful
        );
        productHistories[productCounter].push(ProductHistory({
            state: State.Produced,
            owner: msg.sender,
            timestamp: block.timestamp
        }));
        emit ProductStateChange(productCounter, State.Produced);
    }

    // Funzione che permette al proprietario del prodotto di aggiornare il suo stato
    function updateProductState(uint256 _id, State _state) public {
        require(products[_id].owner == msg.sender, "Only the product owner can update the state");
        products[_id].state = _state;
        productHistories[_id].push(ProductHistory({
            state: _state = _state,
            owner: msg.sender,
            timestamp: block.timestamp
        }));
        emit ProductStateChange(_id, State.Processed);
    }

    // Funzione che consente al proprietario attuale di trasferire la proprietà di un prodotto a un nuovo proprietario
    function transferOwnership(uint256 _id, address _newOwner) public {
        require(products[_id].owner == msg.sender, "Only the product owner can transfer ownership");
        products[_id].owner = _newOwner;
        productHistories[_id].push(ProductHistory({
            state: products[_id].state,
            owner: _newOwner,
            timestamp: block.timestamp
        }));
    }

    // Funzione per ottenere i dettagli di un prodotto 
    function getProduct(uint256 _id) public view returns (Product memory) {
        return products[_id];
    }

    // Funzione per ottenere i dettagli della conologia di un prodotto
    function getProductHistory(uint256 _id) public view returns (ProductHistory[] memory) {
        return productHistories[_id];
    }

    // Funzione di verifica se un prodotto è locale (basato sull’origine)
    function isProductLocal(uint256 _id) public view returns (bool) {
        Product memory product = products[_id];
        for (uint i = 0; i < localOrigins.length; i++) {
            if (keccak256(abi.encodePacked(localOrigins[i])) == keccak256(abi.encodePacked(product.origin))) {
                return true;
            }
        }
        return false;
    }

    // Funzione di verifica se un prodotto è affidabile (basato sul nome)
    function isInformationTrustful(uint256 _productId) public view returns (bool) {
        Product memory product = products[_productId];
        return (keccak256(abi.encodePacked(product.id)) == keccak256(abi.encodePacked(_productId))) && product.isTrustful;
    }

    // Funzione che permette all'attuale proprietario del prodotto di "acquistarlo"
    function purchase(uint256 _id) public {
        require(_id <= productCounter && _id > 0, "Invalid product ID");  // verifica che il prodotto eista
        require(products[_id].state != State.Sold, "Product is already sold");  // verifica che il prodotto non sia già stato venduto
        require(products[_id].owner == msg.sender, "Only the current owner can purchase this product"); // verifica che solo il proprietario può acquistare il prodotto

        // Trasferisce il "titolo" di proprietario al nuovo proprietario (msg.sender)
        products[_id].owner = msg.sender;
        products[_id].state = State.Sold;

        // Aggiorna la cronolgia del prodotto
        productHistories[_id].push(ProductHistory({
            state: State.Sold,
            owner: msg.sender,
            timestamp: block.timestamp
        }));

        // segnala il cambiamento di stato
        emit ProductStateChange(_id, State.Sold);
    }

    // Funzione che trasferisce il prodotto ad un altro utente
    function transfer(uint256 _id, address _newOwner) public {  
        require(_id <= productCounter && _id > 0, "Invalid product ID");  // verifica che il prodotto eista
        require(products[_id].owner == msg.sender, "Only the owner can transfer the product");  // verifica che il sender sia il proprietario
        require(products[_id].state != State.Sold, "Cannot transfer product in 'Sold' state");  // verifica che il prodotto non sia già stato venduto

        // Effettuo il trasferimento
        products[_id].owner = _newOwner;

        // Aggiorno la cronolgia del prodotto
        productHistories[_id].push(ProductHistory({
            state: products[_id].state = State.Distributed,
            owner: _newOwner,
            timestamp: block.timestamp
        }));

        // segnala il cambiamento di stato
        emit ProductStateChange(_id, State.Distributed);
    } 
}

// TEST: 
// contract address: 0x7f0ab5c00019fc07c1d71c0e42dccfaef846b482
// _localOrigins: ["italia"]
// _trustfulProducts: ["pizza","pasta"]