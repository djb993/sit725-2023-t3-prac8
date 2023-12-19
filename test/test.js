const { expect } = require('chai');
const { countValidAnimals, addCards } = require('../script');
const { JSDOM } = require('jsdom');
// Mock or stub jQuery and DOM-related dependencies are needed for testing
const mockJQuery = require('jquery'); // Use a mocking library if available
// Mock the document object
const mockDocument = {
    ready: (callback) => callback(),
};
// Mock the window object
const mockWindow = {
    $: mockJQuery,
    document: mockDocument,
};
// Here I'm setting up the global object for the test environment
global.window = mockWindow;
global.document = mockDocument;

var request = require("request");


describe("ZOO TEST SUITE \n ----------------", function() {

    // << FUNCTION TESTS >>
    describe('Function Tests (countValidAnimals)', function () {

            it('Verify Count with Duplicate Animals in Array', function () {
                const inputArray = ["elephant", "giraffe", "lion", "monkey", "kangaroo", "dog", "dog", "lion"];
                const animalCount = countValidAnimals(inputArray);
                //Assertion:
                expect(animalCount).to.deep.equal({ elephant: 1, giraffe: 1, lion: 2, monkey: 1, kangaroo: 1, dog: 2 });
            });
            it('Verify Count with Varied Case in Array', function () {
                const inputArray = ["Elephant", "giraffe", "Lion", "MONKEY", "Kangaroo", "Dog"];
                const animalCount = countValidAnimals(inputArray);
                // Assertion:
                expect(animalCount).to.deep.equal({ elephant: 1, giraffe: 1, lion: 1, monkey: 1, kangaroo: 1, dog: 1 });
            });
            it('Verify Count with Non-Animal Elements in Array', function () {
                const inputArray = ["elephant", "car", "lion", "apple", "kangaroo", "dog"];
                const animalCount = countValidAnimals(inputArray);
                // Assertion:
                expect(animalCount).to.deep.equal({ elephant: 1, lion: 1, kangaroo: 1, dog: 1 });
            });
            it('Verify Count with Null and Undefined Elements in Array', function () {
                const inputArray = ["elephant", null, , undefined, "dog", "lion"];
                const animalCount = countValidAnimals(inputArray);
                // Assertion:
                expect(animalCount).to.deep.equal({ elephant: 1, lion: 1, dog: 1 });
            });
            it('Verify Count with Empty Array', function () {
                const inputArray = [""];
                const animalCount = countValidAnimals(inputArray);
                expect(animalCount).to.deep.equal({});
            });
    });

    describe('Function Tests (addCards)', function () {

        it('Verify Cards Added & Properties Matching Based on Input', function () {
            const dom = new JSDOM('<html><body><div id="card-section"></div></body></html>');
            global.document = dom.window.document;
            // Mock Data
            const items = [
                { title: 'Animal 1', subTitle: 'Dog', description: 'Description 1', path: 'path1.jpg', _id: '1' },
                { title: 'Animal 2', subTitle: 'Kangaroo', description: 'Description 2', path: 'path2.jpg', _id: '2' },
            ];
            addCards(items); // Call addCards function with the mock data
            const cardElements = document.querySelectorAll('.card');
            // Assertion: check amount of cards  
            expect(cardElements).to.have.lengthOf(items.length);
            // Assertions: Check first item values
            expect(cardElements[0].querySelector('.card-title').textContent).to.equal(items[0].title);
            expect(cardElements[0].querySelector('.card-subTitle').textContent).to.equal(items[0].subTitle);
            expect(cardElements[0].querySelector('.card-text').textContent).to.equal(items[0].description);
        });

        it('Correctly Handle No Matching SubTitles in Array', function () {
            const dom = new JSDOM('<html><body><div id="card-section"></div></body></html>');
            global.document = dom.window.document;
            // Mock Data
            const items = [
                { title: 'Animal 1', subTitle: 'Bear', description: 'Description 1', path: 'path1.jpg', _id: '1' },
                { title: 'Animal 2', subTitle: 'Pigeon', description: 'Description 2', path: 'path2.jpg', _id: '2' },
                { title: 'Animal 3', subTitle: "Shark", description: 'Description 3', path: 'path3.jpg', _id: '3' },
                { title: 'Animal 4', subTitle: 'Rabbit', description: 'Description 4', path: 'path4.jpg', _id: '4' }
            ];
            addCards(items); // Call addCards function with the mock data
            const cardElements = document.querySelectorAll('.card');
            // Assertion: check amount of cards 
            expect(cardElements).to.have.lengthOf(0);
        });

        it('Correctly Handle Null, Undefined and Empty SubTitles in Array', function () {
            const dom = new JSDOM('<html><body><div id="card-section"></div></body></html>');
            global.document = dom.window.document;
            // Mock Data
            const items = [
                { title: 'Animal 1', subTitle: null, description: 'Description 1', path: 'path1.jpg', _id: '1' },
                { title: 'Animal 2', subTitle: undefined, description: 'Description 2', path: 'path2.jpg', _id: '2' },
                { title: 'Animal 3', subTitle: "", description: 'Description 3', path: 'path3.jpg', _id: '3' },
                { title: 'Animal 4', subTitle: 'Dog', description: 'Description 4', path: 'path4.jpg', _id: '4' }
            ];
            addCards(items); // Call addCards function with the mock data
            const cardElements = document.querySelectorAll('.card');
            // Assertion: check amount of cards 
            expect(cardElements).to.have.lengthOf(1);
        });
        // Clean up the global object after tests
        after(function () {
            delete global.window;
            delete global.document;
        });
    });

    // << CHECK SERVER TESTS >>
    describe("Check Server Connection", function() {
        var url = "http://localhost:3000";
        // Status 200 (HTTP OK) indicates that a server successfully processed a client request.
        it("Server successfully processed client request (200)", function(done) {
            request(url, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done()
            });
        });
        // Check Status Output On Non-Existent Route
        it('Non-existent route appropriatley designated (404)', function (done) {
            request.get(url + '/nonexistent-route', function (error, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
        // Check availability of static files:
        it("Check static file accessibility: index.html", function(done) {
            request(url + "/index.html", function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            }); 
        });
        it("Check static file accessibility: styles.css", function(done) {
            request(url + "/styles.css", function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it("Check static file accessibility: script.js", function(done) {
            request(url + "/script.js", function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it("Check availability of custom endpoint: /api/animals", function(done) {
            request(url + "/api/animals", function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it('Confirm JSON structure at endpoint: /api/animals ', function(done) {
            request(url + "/api/animals", function(error, response, body) {
                // Parse the JSON response
                const jsonResponse = JSON.parse(body);
                expect(jsonResponse).to.have.property('statusCode').to.equal(201);
                expect(jsonResponse).to.have.property('data').to.be.an('array');
                done();
            });
        });
    });

    // << DATABASE TESTS >>
    describe("Check Database Communication", function () {
        // << DECLARE >>
        let insertResult;
        // << INITIALISE >>
        const dbClient = require("../dbConnection");
        let item = { name: "testAnimal", type: "testType" };
        // << ESTABLISH CONNECTION >>
        before(async function () { await dbClient.connect(); });
        // << CLOSE CONNECTION >>
        after(async function () { await dbClient.close(); });

        // << BEGIN TESTING >>
        it("Client Object Exported from MongoDB module", function (done) {
            expect(dbClient).to.be.an("object");
            done();
        });
        it("Connected with MongoDB Server", function (done) {
            expect(dbClient.topology.s.state).to.equal("connected");
            done();
        });
        it("Connected with 'zooDatabase' Database", function (done) {
            expect(dbClient.s.options.dbName).to.equal("zooDatabase");
            done();
        });

        // <<ASYNCHRONOUS TESTING>>  //Perform CRUD Operations:
        it("Create Item in Animals Collection", async function () {
            try {
                // << CHECK ANIMALS COLLECTION EXISTS>> 
                const collections = await dbClient.db().listCollections().toArray();
                if (collections.map(collection => collection.name).includes("Animals")) {} //No Output here, I only want a warning if Animals Collection doesn't exist.
                else { console.log("    ! WARNING: Animals Collection Not Found & Will Be Created:"); }
                
                // << CREATE ANIMALS COLLECTION BY INSERTING AN ITEM>>
                insertResult = await dbClient.db().collection("Animals").insertOne(item); //collection() function will create an Animals collection if it doesn't already exist.
                expect(insertResult.insertedId).to.not.be.undefined;
                return Promise.resolve();

            } catch (error) {
                console.error("Error adding item to Animals collection:", error);
                return Promise.reject(error);
            }
        });
        it("Read Item in Animals Collection", async function () {
            try {
                const findResult = await dbClient.db().collection("Animals").findOne({ name: "testAnimal" });
                expect(findResult).to.deep.equal(item); //.deep keyword ensures that the nested property "name" inside the object is compared for equality.
                item._id = insertResult.insertedId;
                return Promise.resolve();
            } catch (error) {
                console.error("Error reading Animals collection:", error);
                return Promise.reject(error);
            }
        });
        it("Update Item in Animals Collection", async function () {
            try {
                const updateResult = await dbClient.db().collection("Animals").updateOne({ name: "testAnimal" }, { $set: { type: "updatedType" } });
                expect(updateResult.modifiedCount).to.equal(1);
                return Promise.resolve();
            } catch (error) {
                console.error("Error reading Animals collection:", error);
                return Promise.reject(error);
            }
        });
        it("Delete Item in Animals Collection", async function () {
            try {
                const deleteResult = await dbClient.db().collection("Animals").deleteOne({ name: "testAnimal" });
                expect(deleteResult.deletedCount).to.equal(1);
                return Promise.resolve();
            } catch (error) {
                console.error("Error reading Animals collection:", error);
                return Promise.reject(error);
            }
        });
    });
});