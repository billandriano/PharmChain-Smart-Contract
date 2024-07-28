// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract PharmaChain {

    enum Role { Admin, Supplier, LogisticEmployee, Inspector }

    enum Location { Supplier, Transport, Manufacturer, LogisticWarehouse, Distributor, PharmacyWarehouse }

    enum ProductStatus { Created, Shipped, InTransit, Delivered }

    struct Product {
        string id;
        string name;
        string manufacturer;
        uint256 quantity;
        string origin;
        string destination;
        string date_of_departure;
        string expected_arrival_date;
        string status;
        bool exists;
    }

    struct ShipmentHistory {
        uint256 timestamp;
        string origin;
        string destination;
        string date_of_departure;
        string expected_arrival_date;
        string status;
    }

    struct User {
        address userAddress;
        Role role;
        bool exists; // To check if the user is registered
    }

    struct ProductDetails {
        string id;
        string name;
        string manufacturer;
        uint256 quantity;
        string origin;
        string destination;
        string date_of_departure;
        string expected_arrival_date;
        string status;
    }

    mapping(address => User) public users;
    mapping(string => Product) public products;
    mapping(string => ShipmentHistory[]) public shipmentHistories;
    mapping(string => bool) public locations;
    mapping(string => bool) public statuses;

    string[] public locationList;
    string[] public productIds;

    address public owner;
    uint256 public productCounter;

    constructor() {
        owner = msg.sender;
        users[owner] = User(owner, Role.Admin, true);

        // Initialize the locations mapping and locationList
        _addInitialLocations("Supplier");
        _addInitialLocations("Transport");
        _addInitialLocations("Manufacturer");
        _addInitialLocations("LogisticWarehouse");
        _addInitialLocations("Distributor");
        _addInitialLocations("PharmacyWarehouse");

        statuses["Created"] = true;
        statuses["Shipped"] = true;
        statuses["InTransit"] = true;
        statuses["Delivered"] = true;
    }

    modifier onlyRole(Role _role) {
        require(users[msg.sender].exists, "User is not registered");
        require(users[msg.sender].role == _role, "Access denied: Role mismatch");
        _;
    }

    modifier onlyAdmin() {
        require(users[msg.sender].exists, "User is not registered");
        require(users[msg.sender].role == Role.Admin, "Access denied: Only Admin can perform this action");
        _;
    }

    modifier onlyRegisteredUser() {
        require(users[msg.sender].exists, "User is not registered");
        _;
    }

    // Function to add initial locations during contract deployment
    function _addInitialLocations(string memory _location) private {
        locations[_location] = true;
        locationList.push(_location);
    }

    function addUser(address _userAddress, Role _role) public onlyAdmin {
        users[_userAddress] = User(_userAddress, _role, true);
    }

    function removeUser(address _userAddress) public onlyAdmin {
        delete users[_userAddress];
    }

    function addLocation(string memory _location) public onlyAdmin {
        require(!locations[_location], "Location already exists");
        locations[_location] = true;
        locationList.push(_location);
    }

    function removeLocation(string memory _location) public onlyAdmin {
        require(locations[_location], "Location does not exist");
        delete locations[_location];

        for (uint256 i = 0; i < locationList.length; i++) {
            if (keccak256(bytes(locationList[i])) == keccak256(bytes(_location))) {
                locationList[i] = locationList[locationList.length - 1];
                locationList.pop();
                break;
            }
        }
    }

    function addProduct(
        string memory _name, 
        string memory _manufacturer, 
        uint256 _quantity, 
        string memory _origin, 
        string memory _destination, 
        string memory _date_of_departure, 
        string memory _expected_arrival_date, 
        string memory _status
    ) public onlyRegisteredUser {
        require(locations[_origin], "Invalid origin location");
        require(locations[_destination], "Invalid destination location");
        require(statuses[_status], "Invalid status");
        require(isNextOrSameLocation(_origin, _destination), "Invalid destination: Not the next location");
        string memory productId = string(abi.encodePacked("P", uint2str(productCounter)));
        productCounter++;
        require(!products[productId].exists, "Product ID already exists"); // Ensure unique ID
        products[productId] = Product(
            productId, 
            _name, 
            _manufacturer, 
            _quantity, 
            _origin, 
            _destination, 
            _date_of_departure, 
            _expected_arrival_date, 
            _status, 
            true
        );
        productIds.push(productId); // Store the product ID

        // Add initial shipment history
        shipmentHistories[productId].push(ShipmentHistory(block.timestamp, _origin, _destination, _date_of_departure, _expected_arrival_date, _status));
        
        // Display the product ID as output
        emit ProductAdded(productId);
    }

    event ProductAdded(string productId);

    function updateProductLocation(
        string memory _productId, 
        string memory _origin, 
        string memory _destination, 
        string memory _date_of_departure, 
        string memory _expected_arrival_date, 
        string memory _status
    ) public onlyRole(Role.Inspector) onlyRegisteredUser {
        require(products[_productId].exists, "Product does not exist");
        require(locations[_destination], "Invalid new location");
        require(statuses[_status], "Invalid status");
        require(isNextOrSameLocation(products[_productId].destination, _destination), "Invalid destination: Not the next or same location");
        require(isValidOrigin(products[_productId].origin, products[_productId].destination, _origin), "Invalid origin: Must be same as previous origin or previous destination");
        require(isNextOrSameStatus(products[_productId].status, _status), "Invalid status: Not the next or same status");

        Product storage product = products[_productId];

        product.origin = _origin;
        product.destination = _destination;
        product.date_of_departure = _date_of_departure;
        product.expected_arrival_date = _expected_arrival_date;
        product.status = _status;

        // Add to shipment history
        shipmentHistories[_productId].push(ShipmentHistory(block.timestamp, _origin, _destination, _date_of_departure, _expected_arrival_date, _status));
    }

    function isNextOrSameLocation(string memory currentLocation, string memory nextLocation) internal view returns (bool) {
        uint currentIndex = getLocationIndex(currentLocation);
        uint nextIndex = getLocationIndex(nextLocation);
        return nextIndex == currentIndex || nextIndex == currentIndex + 1;
    }

    function isValidOrigin(string memory previousOrigin, string memory previousDestination, string memory newOrigin) internal pure returns (bool) {
        return (keccak256(bytes(newOrigin)) == keccak256(bytes(previousOrigin)) || keccak256(bytes(newOrigin)) == keccak256(bytes(previousDestination)));
    }

    function isNextOrSameStatus(string memory currentStatus, string memory nextStatus) internal pure returns (bool) {
        ProductStatus current = stringToProductStatus(currentStatus);
        ProductStatus next = stringToProductStatus(nextStatus);
        return next == current || next == ProductStatus(uint(current) + 1);
    }

    function stringToProductStatus(string memory status) internal pure returns (ProductStatus) {
        if (keccak256(bytes(status)) == keccak256(bytes("Created"))) {
            return ProductStatus.Created;
        } else if (keccak256(bytes(status)) == keccak256(bytes("Shipped"))) {
            return ProductStatus.Shipped;
        } else if (keccak256(bytes(status)) == keccak256(bytes("InTransit"))) {
            return ProductStatus.InTransit;
        } else if (keccak256(bytes(status)) == keccak256(bytes("Delivered"))) {
            return ProductStatus.Delivered;
        }
        revert("Invalid status");
    }

    function getLocationIndex(string memory location) internal view returns (uint) {
        for (uint i = 0; i < locationList.length; i++) {
            if (keccak256(bytes(locationList[i])) == keccak256(bytes(location))) {
                return i;
            }
        }
        revert("Location not found");
    }

    // Function to get the index of an enum value
    function getIndex(ProductStatus status) public pure returns (uint) {
        return uint(status);
    }

    function getProduct(string memory _productId) public view onlySupplierOrLogisticIfUpToManufacturer(_productId) onlyRegisteredUser returns (Product memory) {
        return products[_productId];
    }

    function getProductHistory(string memory _productId) public view onlyRegisteredUser returns (ShipmentHistory[] memory) {
        return shipmentHistories[_productId];
    }

    function getAllLocations() public view onlyRegisteredUser returns (string[] memory) {
        return locationList;
    }

    // Utility function to convert uint256 to string
    function uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function productStatusToString(ProductStatus status) internal pure returns (string memory) {
        if (status == ProductStatus.Created) {
            return "Created";
        } else if (status == ProductStatus.Shipped) {
            return "Shipped";
        } else if (status == ProductStatus.InTransit) {
            return "InTransit";
        } else if (status == ProductStatus.Delivered) {
            return "Delivered";
        }
        return "";
    }

    // Modifier to restrict getProduct access based on role and location
    modifier onlySupplierOrLogisticIfUpToManufacturer(string memory _productId) {
        require(products[_productId].exists, "Product does not exist");
        Product memory product = products[_productId];
        if (users[msg.sender].role == Role.Supplier) {
            require(
                keccak256(bytes(product.origin)) == keccak256(bytes("Supplier")) ||
                keccak256(bytes(product.destination)) == keccak256(bytes("Transport")) ||
                keccak256(bytes(product.destination)) == keccak256(bytes("Manufacturer")),
                "Access denied: Product location is beyond Manufacturer for Supplier"
            );
        }
        if (users[msg.sender].role == Role.LogisticEmployee) {
            require(
                keccak256(bytes(product.origin)) == keccak256(bytes("Supplier")) ||
                keccak256(bytes(product.destination)) == keccak256(bytes("Transport")) ||
                keccak256(bytes(product.destination)) == keccak256(bytes("Manufacturer")) ||
                keccak256(bytes(product.destination)) == keccak256(bytes("LogisticWarehouse")),
                "Access denied: Product location is beyond LogisticWarehouse for LogisticEmployee"
            );
        }
        _;
    }
}
