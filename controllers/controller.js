//Access mongodb property
const { ObjectId } = require('mongodb');
//Enable access to the functions in animal.js
let collection = require('../models/animal');

const postAnimal = (req,res) =>
{
    //Retrieve animal information from client input
    let animal = req.body;
    let subTitle = animal.subTitle;

    //Call postAnimal from animal.js -> send client input as an argument - return (err,result) as callback output.
    collection.postAnimal(animal, (err,result) =>
    {
        if (animal.subTitle === "" || animal.subTitle === null || animal.subTitle === undefined) {
            res.json({statusCode:400,data:result,message:'Invalid Subtitle'});
        }
        else if (subTitle.toLowerCase() !== "elephant" && subTitle.toLowerCase() !== "giraffe" && subTitle.toLowerCase() !== "lion" && subTitle.toLowerCase() !== "monkey" && subTitle.toLowerCase() !== "kangaroo" && subTitle.toLowerCase() !== "dog") {
            res.json({statusCode:400,data:result,message:'Invalid Subtitle'});
        }
        else if (!err) {
            res.json({statusCode:201,data:result,message:'Success'});
        }
    });
}

const getAllAnimals = (req,res) =>
{
    //Call getAllAnimals from animal.js & return (err,result) as callback output.
    collection.getAllAnimals((err,result) =>
    {
        //Notify if success
        if (!err) {
            res.json({statusCode:200,data:result,message:'success'});
        }
    });
}

const deleteAnimal = (req,res) =>
{
    collection.deleteAnimal(req.params.id, (err,result) =>
    {
        //Notify if success
        if (!err) {
            res.json({statusCode:204,data:result,message:'success'});
        }
        else {
            // Check for specific error conditions
            if (err) {
                console.error('Error deleting animal:', err);
                res.status(500).json({ statusCode: 500, error: err, message: 'Internal Server Error' });
            }
        }
    });
}

// const deleteAnimal = (req,res) =>
// {
//     //Retrieve animal information from client input
//     let animal = req.body;
//     console.log("delete: "+req.body);
//     //Call deletAnimal from animal.js -> send client input as an argument - return (err,result) as callback output.
//     collection.deleteCard(animal, (err,result) =>
//     {
//         //Notify if success
//         if (!err) {
//             res.json({statusCode:201,data:result,message:'success'});
//         }
//     });
// }





//Export postAnimal & getAllAnimals functions from controller.js
module.exports = {postAnimal, getAllAnimals, deleteAnimal}