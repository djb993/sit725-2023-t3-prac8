function countValidAnimals(arr) {
    const validAnimals = [ "elephant" , "giraffe" , "lion" , "monkey" , "kangaroo" , "dog" ];
    const animalCount = {};

    arr.forEach((animal) => {
        if (animal != "") {
            let lowerCaseAnimal;
            if (animal != null && animal != undefined) {
                lowerCaseAnimal = animal.toLowerCase(); //lowercase to match the static validAnimals array.
            }
    
            if (validAnimals.includes(lowerCaseAnimal)) {
                // Use lowerCaseAnimal string to index the array - use || 0 as default if null etc. and increment count
                animalCount[lowerCaseAnimal] = (animalCount[lowerCaseAnimal] || 0) + 1;
            }
        }
    else { /*console.log("Empty subTitle Input")*/ }
    });
    // populateTable(animalCount, tableSection);
    return animalCount
}

const populateTable = (animalCount, tableSection) => {
    // Object.keys(animalCount) returns an array of strings representing name-key pairs. Then I'm filtering out those equal to 0.
    const validAnimals = Object.keys(animalCount).filter(animal => animalCount[animal] > 0);
    
    if(validAnimals.length > 0) //Only execute if array is not empty - Condition is required for edge case when I delete every card - I don't want the table heading to show
    {
        // Create table
        let tableHTML = '<table style="margin-bottom: 100px;">' +
                        '<thead><tr><th>Animal</th><th>Number</th></tr></thead>' +
                        '<tbody>';
        // Populate table with both name and number
        validAnimals.forEach((animal) => {
            const count = animalCount[animal];
            tableHTML += `<tr><td>${animal}</td><td>${count}</td></tr>`;
        });
        tableHTML += '</tbody></table>'; // Close table
        tableSection = document.getElementById('table');
        tableSection.innerHTML = tableHTML;
        console.log(tableHTML);
    }
}

const addCards = (items) => {

    items.forEach(item => {
        if(item.subTitle == null || item.subTitle == undefined || item.subTitle == "") { /*console.log("Null, Undefined OR Empty Card subTitle")*/ }
        else {
            const validAnimals = [ "elephant" , "giraffe" , "lion" , "monkey" , "kangaroo" , "dog" ];
            let lowerCaseAnimal = item.subTitle.toLowerCase(); //lowercase to match the static validAnimals array.
            if (validAnimals.includes(lowerCaseAnimal)) {
                let itemToAppend = document.createElement('div');
                itemToAppend.innerHTML = '<div class="col s4 center-align">'+
                        '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="images/'+item.path+'">'+
                        '</div><div class="card-content">'+
                        `<span class="card-title activator grey-text text-darken-4">${item.title}<i class="material-icons right"></i></span><p><a href="#"></a></p></div>`+
                        '<div class="card-reveal">'+
                        '<span class="card-subTitle grey-text text-darken-4">'+item.subTitle+'<i class="material-icons right"></i></span>'+
                        '<p class="card-text">'+item.description+'</p>'+
                        '</div>'+
                        '<div class="card-action">'+
                        `<button class="btn remove-card" data-card-id="${item._id}">Remove</button>`+
                        '</div>'+
                        '</div></div>';
                document.getElementById('card-section').appendChild(itemToAppend);
            } 
        }
    });
    // Listen for remove card click
    document.querySelectorAll('.remove-card').forEach(button => {
        button.addEventListener('click', function() {
          const cardId = this.getAttribute('data-card-id');
          removeCard(cardId);
        });
    });
};

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
                location.reload();
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
                location.reload();
            } else {
                console.error('Error deleting card:', result.message);
            }
        }
    });
}

function getAllAnimals(){
    $.get('/api/animals', (response)=>{
        // response's data is in array format, so we can use it
        if (response.statusCode === 200) {
            const animalTypeArray = response.data.map(animal => animal.subTitle);
            const animalCount = countValidAnimals(animalTypeArray);
            populateTable(animalCount,"");
            addCards(response.data);
        }
    });
}

const initialiseDOM = () => {
    $(document).ready(function () {
        $('.materialboxed').materialbox();
        $('#formSubmit').click(() => {
            formSubmitted();
        });
        $('.modal').modal();
        getAllAnimals();
    });
};

if (typeof module !== 'undefined') {} 
else { initialiseDOM(); }

if (typeof module !== 'undefined') {
    module.exports = { countValidAnimals, addCards };
}
















// const addCards = (items) => {
//     items.forEach(item => {
//         let itemToAppend = '<div class="col s4 center-align">'+
//                 '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.path+'">'+
//                 '</div><div class="card-content">'+
//                 `<span class="card-title activator grey-text text-darken-4">${item.title}<i class="material-icons right">more_vert</i></span><p><a href="#"></a></p></div>`+
//                 '<div class="card-reveal">'+
//                 '<span class="card-title grey-text text-darken-4">'+item.subTitle+'<i class="material-icons right">close</i></span>'+
//                 '<p class="card-text">'+item.description+'</p>'+
//                 '</div>'+
//                 '<div class="card-action">'+
//                 `<button class="btn remove-card" data-card-id="${item._id}">Remove</button>`+
//                 '</div>'+
//                 '</div></div>';
//         $("#card-section").append(itemToAppend)
//     });
//     // Listen for remove card click
//     $(".remove-card").click(function() {
//         const cardId = $(this).data("card-id");
//         removeCard(cardId);
//     });
// }