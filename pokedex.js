document.getElementById('pokemonForm').addEventListener('submit', function (e) {
  e.preventDefault();
  
  // Mostrar indicador de carregamento
  document.getElementById('loadingIndicator').style.display = 'block';

  pegaPokemons(quantidade.value);

  // Ocultar indicador de carregamento após a conclusão da busca (pode ser ajustado conforme necessário)
  setTimeout(function () {
      document.getElementById('loadingIndicator').style.display = 'none';
  }, 2000); // Por exemplo, oculta após 2 segundos (ajuste conforme necessário)
});


pegaPokemons(1);

function pegaPokemons(quantidade) {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=' + quantidade)
        .then(response => response.json())
        .then(allpokemon => {
            const requests = allpokemon.results.map(val => fetch(val.url).then(response => response.json()));
            
            Promise.all(requests)
                .then(pokemonDetails => {
                    const pokemons = pokemonDetails.map((pokemonSingle, index) => ({
                        nome: allpokemon.results[index].name,
                        imagem: pokemonSingle.sprites.front_default,
                        types: pokemonSingle.types[0].type.name,
                        number: pokemonSingle.id
                    }));

                    //Finalizamos nossas requisições.
                    const pokemonBoxes = document.querySelector('.pokemon-boxes');
                    pokemonBoxes.innerHTML = "";

                    pokemons.forEach(val => {
                        pokemonBoxes.innerHTML += `
                            <div class="pokemon-box">
                                <img src="${val.imagem}" />
                                <p>${val.nome}</p>
                                <p>${val.types}</p>
                                <p>${val.number}</p>
                            </div>`;
                    });
                    console.log(pokemons)
                })
                .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
}
