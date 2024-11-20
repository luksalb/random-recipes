const projectName = 'random-recipe-machine';
let recipesData;

var colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
];

var currentId= '',
    currentRecipe = '';

function getRecipes(){
    return $.ajax({
        headers: {
            Accept: 'application/json'
        },
        url:
        'https://raw.githubusercontent.com/adrianosferreira/afrodite.json/refs/heads/master/afrodite.json',
        success: function(jsonRecipes){
            if (typeof jsonRecipes === 'string'){
                recipesData = JSON.parse(jsonRecipes);
                console.log('recipesData');
                console.log(recipesData);
            }
        }
    });
}

function getRandomRecipe(){
    return recipesData.Id[
        Math.floor(Math.random() * recipesData.id.length)
    ];
}

function getRecipe(){
    let randomRecipe = getRandomRecipe();

    currentId = randomRecipe.id;
    currentRecipe = randomRecipe.nome;

    $('#tweet-receita').attr(
        'href',
        'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
        encodeURIComponent('"' + currentId + '"' + currentRecipe)
    );

    $('#facebook-receita').attr(
        'href',
        'https://www.facebook.com/sharer/sharer.php?u=' +
        encodeURIComponent('"' + currentId + '"' + currentRecipe)
    );

    $('.quote-text').animate({opacity: 0}, 500, function(){
        $(this).aniamte({opacity: 1}, 500);
        $('#text').text(randomRecipe.nome);
    });

    $('.quote-receita').animate({opacity: 0}, 500, function(){
        $(this).aniamte({opacity: 1}, 500);
        $('#receita').text(randomRecipe.conteudo);
    });

    var color = Math.floor(Math.random() * colors.length);
    $('html body').animate(
        {
            backgroundColor: color[color],
            color: colors[color]
        },
        1000
    );
    $('.button').animate(
        {
            backgroundColor: colors[color]
        },
        1000
    );
}

$(document).ready(function () {
    getRecipes().then(() => {
        getRecipe();
    });

    $('#new-quote').on('click', getRecipe);
});