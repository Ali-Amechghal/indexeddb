/**
 * Javascrip Api to work with indexedDB
 * This Api , use a same principals as MongoDB
 * StoreObject is an collection
 * 
 * @author Ali-Amechghal
 * @param root
 * @param factory
 */

(function(root, factory) {
	if (define  === 'function' && define.amd){
		define(function(){
			return this.indxdb =  factory();
		});
	}else if (typeof exports === 'object'){
		module.exports = factory();
	}else{
		root.indxdb=factory();
	}
}(this, function(){

	var root =  this ||  global;
	var previous = root.indxdb;
        var __indexedDBObject = root.indexedDB;
	
	indxdb = {};
    indxdb.permissions = {
	    readOnly:'readOnly',
        readWrite : 'readWrite'
    }

	indxdb.isIndexedDBSUpported = (root.indexedDB) ?  true :  false;
	indxdb.currentDB = {};

	/**
	 * Create a new database or replace the existent one 
	   if the new equal to true 
       @param name : database name ,
	   @param new : boolean type if true if theres aleardy a database with a 
	   given name it will be returened insted of creating a new one
	 
	 */
	indxdb.createDataBase= function(_name, _replaceIfExist,_version){
		if(!name ||  name === "undefined")
			throw new Error("Invalid databasename");

		var _request = indxdb.open(_name,_version);
		var _exist = true;
		_request.onupgradeneeded= function(_e){
			_exist =  false;
			if(!_replaceIfExist){
				_e.target.transaction.abort();
				throw new Error("Database alreadyExists");
			}
		}
		_request.onsuccess =  function(event){
			indxdb.currentDB = event.target.result;
		}
		_request.onerror =  function(event){
			throw new Error(event.target.error);
		}
	}
	/**
	 * 
	 * add new ObjectStore as Collection , specifing a permission
	 *  (readOnly or readWrite)
	 *  @param collectionName , name of objectstore
	 *  @param permission , collection permission (readOnly , readWrite)
	 */
	indxdb.addCollection =function(_collectionName, _permission){
		if(!indxdb.permissions._permission)
			throw new Error('Invalid Permission , persmission should be on (indxdb.permissions.readOnly or indxdb.permissions.readWrite ');
		if(!_collectionName  || _collectionName === "undefined")
			throw new Error("invalid collection name , empty or invalid string");
		var _collection = indexedDB.currentDB.createObjectStore(_collectionName,_permission);
		return _collection;

	}
	/**
	 * Add one or multiple index to the collection
	 * @param collectionObject , the colletion
	 * @param indexName , the name of the property object to create index on
	 * @param constraintsArray , the constratins array
	 */
	indexedDB.setIndex=function(collectionObject, _indexColumn, constraintArray){

	}

	return indxdb;
}));
