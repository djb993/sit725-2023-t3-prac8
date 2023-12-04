let express = require('express');
let app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri = "mongodb://localhost:27017";
const uri = "mongodb://127.0.0.1:27017";
let port = process.env.port || 3000;
let collection;

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('Animals');
        console.log(collection);
    } catch(ex) {
        console.error(ex);
    }
}

app.get('/', function (req,res) {
    res.render('indexMongo.html');
});

app.get('/api/animals', (req,res) => {
    getAllAnimals((err,result)=>{
        if (!err) {
            res.json({statusCode:200, data:result, message:'get all animals successful'});
        }
    });
});

app.post('/api/animal', (req,res)=>{
    let animal = req.body;
    postAnimal(animal, (err, result) => {
        if (!err) {
            res.json({statusCode:201, data:result, message:'success'});
        }
    });
});

app.delete('/api/animal/:id', async (req, res) => {
    try {
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount > 0) {
            res.status(200).json({ statusCode: 200, message: 'Animal deleted successfully' });
        } else {
            res.status(404).json({ statusCode: 404, message: 'Animal not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
    }
});


function postAnimal(animal,callback) {
    collection.insertOne(animal,callback);
}

function getAllAnimals(callback){
    collection.find({}).toArray(callback);
}

app.listen(port, ()=>{
    console.log('express server started');
    runDBConnection();
});