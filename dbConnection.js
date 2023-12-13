//Use here of a destructuring assignemnt e.g. const {x,y,z} to extract specific properties from MongoDB module
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb'); //MongoClient enables database & collection interation, ServerApiVersion represesnts MongoDB version as constant.

//Assisgn link to connect to MongoDB server -> mongodb-scheme : IPaddress : Port
const uri = "mongodb://127.0.0.1:27017";
// const uri = "mongodb://localhost:27017";

//Create instance of MongoClient with specified URI and other settings
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: false,
    }
});

// client.connect();
// Launch the database and refer to as collection
async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('Animals');
        console.log(collection);
    } catch(ex) {
        console.error(ex);
    }
}
runDBConnection();

//Export client to make it available in other modules
module.exports = client;
