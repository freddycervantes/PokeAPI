
function addToPokedex(event) {
  event.preventDefault();

  let name = event.target.pokemon.value;
  let description = event.target.description.value;

  let pokemonContainer = document.createElement('div');
  pokemonContainer.id = name.toLowerCase();

  let pokemonContent = document.createElement('p');
  pokemonContent.innerHTML = `${name} - ${description}`;

  pokemonContainer.appendChild(pokemonContent);

  let list = document.getElementById('pokemon-list');
  list.appendChild(pokemonContainer);

  let loadingIndicator = createLoadingIndicator();
  pokemonContainer.appendChild(loadingIndicator);
}

function placePokemonImage(pokemonData) {
  removeLoadingIndicator();
  let path = pokemonData.sprites.front_default;
  let name = pokemonData.name;

  let image = document.createElement('img');
  image.src = path;
  image.alt = name;

  let pokemonListItem = document.getElementById(name.toLowerCase());
  pokemonListItem.appendChild(image);
}

function fetchPokemon(event) {
  let pokemon = event.target.pokemon.value.toLowerCase();

  let request = new XMLHttpRequest();
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;
  request.open('GET', url);
  request.send();

  request.onreadystatechange = function() {
    // Process response
    if (request.readyState === 4) {
      //response is finished. Response is ready
      if(request.status === 200) {
        // Good to go!
        let response = JSON.parse(request.responseText);
        placePokemonImage(response);

      } else {
        // There was a problem.
        console.log('There was a problem with the request.')
      }
    }
  };
}

function createLoadingIndicator() {
  let loading = document.createElement('p')
  loading.id='loading';
  loading.innerHTML = 'Loading...';
  return loading;
}

function removeLoadingIndicator() {
  let loading = document.getElementById('loading');
  loading.remove();
}

function clearForm() {
  document.getElementById('pokedex').reset();
}

document.addEventListener('DOMContentLoaded', function() {
  let form = document.getElementById('pokedex');
  form.addEventListener('submit', function() {
    addToPokedex(event);
    fetchPokemon(event);
    clearForm();
  });
});

