const { ObjectId } = require('mongodb');
//Import file dbConnection.js from parent directory (../)
let client = require('../dbConnection');
//Access current MongoDB database from dbconnection
let collection = client.db().collection('Animals');

//Define function to add a new animal to the MongoDB Database
function postAnimal(animal, callback) 
{
    // MongoDB performs insertion of animal into collection and executes the callback function (check controller.js for call)
    collection.insertOne(animal, callback);
}

//Define function to delete animal to the MongoDB Database
async function deleteAnimal(animalID, callback) {
    try {
        const result = await collection.deleteOne({ _id: new ObjectId(animalID) });

        //Conditionals for understanding outcome and specific errors.
        if (result.deletedCount > 0) {
            console.log('Card deleted successfully');
            callback(null, { statusCode: 204, message: 'Card deleted successfully' });
        } else {
            console.log('Card not found');
            console.log(cardId);
            callback({ statusCode: 404, message: 'Card not found' }, null);
        }
    } catch (error) {
        console.error('Error deleting card:', error);
        callback({ statusCode: 500, message: 'Internal Server Error' }, null);
    }
}

//Define function to retrieve all items from collection
function getAllAnimals(callback) {
    //query empty objects {} (all objects), convert to array and execute callback of potential errors and results (check controller.js for call)
    // Use the toArray method with a promise
    collection.find({}).toArray()
    .then(result => callback(null, result))
    .catch(error => callback(error, null));
}

//Export to make functions available in other modules
module.exports = {postAnimal, getAllAnimals, deleteAnimal}