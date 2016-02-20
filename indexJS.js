
if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
};

var db;
var request = indexedDB.open("MyTestDatabase");
request.onerror = function(event){
	alert("WTF!");
};

// Do something when all the data is added to the database.
transaction.oncomplete = function(event) {
  alert("All done!");
};

transaction.onerror = function(event) {
  alert("We dun fucked up!");
};

request.onupgradeneeded = function(event){
	db = evetn.target.result;

	// Create an objectStore to hold information about our customers. We're
  	// going to use "ssn" as our key path because it's guaranteed to be unique
  	var objectStore = db.createObjetStore("customers",{keyPath: "ssn"});

  	// Create an index to search customers by name. We may have duplicates
  	// so we can't use a unique index.
  	objectStore.createIndex("name", "name", { unique: false });

  	// Create an index to search customers by email. We want to ensure that
  	// no two customers have the same email, so use a unique index.
  	objectStore.createIndex("email", "email", { unique: true });

  	// Use transaction oncomplete to make sure the objectStore creation is 
  // finished before adding data into it.
  objectStore.transaction.oncomplete = function(event) {
    // Store values in the newly created objectStore.
    var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
    for (var i in customerData) {
      customerObjectStore.add(customerData[i]);
    }

	var objectStore = transaction.objectStore("customers");
	for (var i in customerData) {
  		var request = objectStore.add(customerData[i]);
  		request.onsuccess = function(event) {
    // event.target.result == customerData[i].ssn;
  	};
  };
};