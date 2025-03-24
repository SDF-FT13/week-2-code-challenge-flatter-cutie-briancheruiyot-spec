// Your code here
const characterSpan = document.createElement('span')
const characterBar = document.getElementById('character-bar')

let currentCharacter = null;

function fetchCharacters() {
  fetch('http://localhost:3000/characters')
  .then(response => response.json())
  .then(characters => {
    characters.forEach(character => {
      const characterSpan = document.createElement('span');
      characterSpan.textContent = character.name;
      characterSpan.addEventListener('click', () => displayCharacterDetails(character.id));
      characterBar.appendChild(characterSpan);
    })
  })
}

const characterName = document.getElementById('name')
const characterImage = document.getElementById('image')
const voteCount = document.getElementById('vote-count')

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

const votesForm= document.getElementById('votes-form');
const votesInput = document.getElementById('votes');
const resetBtn = document.getElementById('reset-btn');

votesForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (currentCharacter) {
    const votesToAdd = parseInt(votesInput.value);
    if (!isNaN(votesToAdd)) {
      currentCharacter.votes += votesToAdd;
      voteCount.textContent = currentCharacter.votes;
      votesInput.value = '';
      //Extra Bonus
      patchCharacterVotes(currentCharacter.id, currentCharacter.votes);
    }
  }
});

resetBtn.addEventListener('click', () => {
  if (currentCharacter) {
    currentCharacter.votes = 0;
    voteCount.textContent = 0;
  }
});

fetchCharacters()