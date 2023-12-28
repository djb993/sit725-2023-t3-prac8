const { expect } = require("chai");
const request = require("request");

describe("API TEST SUITE \n ----------------", function(){
    let url = 'http://localhost:3000/api/animal';
    let animalID = {};

    const animals = [
        { name: 'Elephant', path: 'images/elephant.jpg', title: 'Elephant', subTitle: 'elephant' },
        { name: 'Giraffe', path: 'images/giraffe.jpg', title: 'Giraffe', subTitle: 'giraffe' },
        { name: 'Lion', path: 'images/lion.jpg', title: 'Lion', subTitle: 'lion' },
        { name: 'Monkey', path: 'images/monkey.jpg', title: 'Monkey', subTitle: 'monkey' },
        { name: 'Kangaroo', path: 'images/kangaroo.jpg', title: 'Kangaroo', subTitle: 'kangaroo' },
        { name: 'Dog', path: 'images/puppy.jpg', title: 'Dog', subTitle: 'dog' }
    ];

    const invalidAnimals = [
        { name: 'Invalid', path: 'images/elephant.jpg', title: 'Elephant', subTitle: 'crocodile' },
        { name: 'Empty', path: 'images/giraffe.jpg', title: 'Giraffe', subTitle: '' },
        { name: 'Null', path: 'images/lion.jpg', title: 'Lion', subTitle: null },
        { name: 'Undefined', path: 'images/monkey.jpg', title: 'Monkey', subTitle: undefined }
    ];


    describe('GET API', function(){
        it('GET api/animals (200)', function(done){
            request(url+"s", function(error, response, body){
                let responseObj = JSON.parse(body);
                expect(responseObj.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe('POST API', function(){
        for (let i=0; i < animals.length; i++) {       
            it('POST '+ animals[i].name +' (201)', function(done){
                request.post({url,form:animals[i]}, function(error, response, body){
                    let responseObj = JSON.parse(body);
                    animalID[i] = responseObj.data.insertedId;
                    expect(responseObj.statusCode).to.equal(201);
                    done();
                });
            });       
        }
        animalID = {};
        for (let i=0; i < invalidAnimals.length; i++) {   
            it('POST '+ invalidAnimals[i].name +' SubTitle (400)', function(done){
                request.post({url,form:invalidAnimals[i]}, function(error, response, body){
                    let responseObj = JSON.parse(body);
                    animalID[i] = responseObj.data.insertedId;
                    expect(responseObj.statusCode).to.equal(400);
                    done();
                });
            });   
        }   
    }); 

    describe('DELETE API', function(){
        for (let i=0; i < animals.length; i++) {   
            it('DELETE '+ animals[i].name +' (204)', function(done){
                request.delete({url:url+"/"+animalID[i],form:animals[0]}, function(error, response, body){
                    let responseObj = JSON.parse(body);
                    expect(responseObj.statusCode).to.equal(204);
                    done();
                });
            });
        }
        it('DELETE Non-existent object (500)', function(done){
            request.delete({url:url+"/"+"12345",form:animals[0]}, function(error, response, body){
                let responseObj = JSON.parse(body);
                expect(responseObj.statusCode).to.equal(500);
                done();
            });
        });

    });

});
