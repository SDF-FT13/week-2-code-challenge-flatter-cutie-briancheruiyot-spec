// Your code here
const characterSpan = document.createElement('span')
characterSpan.textContent = character.name;
const characterBar = document.getElementById('character-bar')
characterBar.appendChild(characterSpan)


function fetchCharacters() {
  fetch('http://localhost:3000/characters')
  .then(response => response.json())
  .then(characters => {
    characters.forEach(character => {
      characterSpan.addEventListener('click', () => displayCharacterDetails(character.id));
    })
  })
}

const characterName = document.getElementById('name')
const characterImage = document.getElementById('image')

function displayCharacterDetails(characterId) {
  fetch(`http://localhost:3000/characters/${characterId}`)
  .then(response => response.json())
  .then(character => {
    currentCharacter = character;
    characterName.textContent = character.name;
    characterImage.src = character.image;
    voteCount.textContent = character.votes;
  })
}