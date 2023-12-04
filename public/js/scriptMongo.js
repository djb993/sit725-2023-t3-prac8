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
            if (result.statusCode === 200) {
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
        if (response.statusCode === 200) {
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