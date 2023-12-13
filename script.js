let hasReloaded = false;
const validAnimals = [ "elephant" , "giraffe" , "lion" , "monkey" , "kangaroo" , "dog" ];

function countValidAnimals(arr) {
    const animalCount = {};

    arr.forEach(animal => {
        const lowerCaseAnimal = animal.toLowerCase(); //lowercase to match the static validAnimals array.

        if (validAnimals.includes(lowerCaseAnimal)) {
            // Use lowerCaseAnimal string to index the array - use || 0 as default if null etc. and increment count
            animalCount[lowerCaseAnimal] = (animalCount[lowerCaseAnimal] || 0) + 1;
        }
    });
    populateTable(animalCount);
}

const populateTable = (animalCount) => {
    // Object.keys(animalCount) returns an array of strings representing name-key pairs. Then I'm filtering out those equal to 0.
    const validAnimals = Object.keys(animalCount).filter(animal => animalCount[animal] > 0);
    
    if(validAnimals.length > 0) //Only execute if array is not empty - Condition is required for edge case when I delete every card - I don't want the table heading to show
    {
        // Create table
        let tableHTML = '<table style="margin-bottom: 100px;">' +
                        '<thead><tr><th>Animal</th><th>Number</th></tr></thead>' +
                        '<tbody>';
        // Populate table with both name and number
        validAnimals.forEach(animal => {
            const count = animalCount[animal];
            tableHTML += `<tr><td>${animal}</td><td>${count}</td></tr>`;
        });
        tableHTML += '</tbody></table>'; // Close table

        const tableSection = document.getElementById('table');
        tableSection.innerHTML = tableHTML;
        console.log(tableHTML);
    }
}

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
                '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.path+'">'+
                '</div><div class="card-content">'+
                '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#"></a></p></div>'+
                '<div class="card-reveal">'+
                '<span class="card-title grey-text text-darken-4">'+item.subTitle+'<i class="material-icons right">close</i></span>'+
                '<p class="card-text">'+item.description+'</p>'+
                '</div>'+
                '<div class="card-action">'+
                `<button class="btn remove-card" data-card-id="${item._id}">Remove</button>`+
                '</div>'+
                '</div></div>';
        $("#card-section").append(itemToAppend)
    });
    // Listen for remove card click
    $(".remove-card").click(function() {
        const cardId = $(this).data("card-id");
        removeCard(cardId);
    });
}

const formSubmitted = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.subTitle = $('#subTitle').val();
    formData.path = $('#path').val();
    formData.description = $('#description').val();

    console.log(formData);
    postAnimal(formData);
}

function postAnimal(animal){
    $.ajax({
        url:'/api/animal',
        type:'POST',
        data:animal,
        success: (result)=>{
            if (result.statusCode === 201) {
                alert('animal post successful');
            }
        }
    });
}

function removeCard(cardId) {
    // Send a request to delete this card from the MongoDB database
    $.ajax({
        url: `/api/animal/${cardId}`,
        type: 'DELETE',
        success: (result) => {
            if (result.statusCode === 204) {
                // Remove the entire card from the DOM
                $(`.remove-card[data-card-id="${cardId}"]`).closest('.col').remove();
            } else {
                console.error('Error deleting card:', result.message);
            }
        }
    });
}

function getAllAnimals(){
    $.get('/api/animals', (response)=>{
        // response's data is in array format, so we can use it
        if (response.statusCode === 201) {
            const animalTypeArray = response.data.map(animal => animal.subTitle);
            countValidAnimals(animalTypeArray);
            addCards(response.data);
        }
    });
}

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#formSubmit').click(()=>{
        formSubmitted();
    });
    $('.modal').modal();
    getAllAnimals();
});