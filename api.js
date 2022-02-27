const addPlayersAdd = document.getElementById("player-add");
const searchButton = () => {
  addPlayersAdd.textContent = "";
  const inputField = document.getElementById("input-field");
  const input = inputField.value;
  fetch(
    `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${input}`
  )
    .then((res) => res.json())
    .then((data) => showPlayer(data.player));

  document.getElementById("display").style.display = "block";

  inputField.value = "";
};

searchButton();
const showPlayer = (players) => {
  if (players <= 0) {
    document.getElementById("error-message").style.display = "block";
    document.getElementById("display").style.display = "none";
    return;
  }
  document.getElementById("error-message").style.display = "none";
  document.getElementById("display").style.display = "none";
  for (const player of players) {
    const div = document.createElement("div");
    div.classList.add("col-lg-4");
    div.classList.add("mb-4");
    div.innerHTML = `
        <img class='img-fluid' src='${player.strThumb}' alt='${player.strPlayer} photo' />
        <h3>${player.strPlayer}</h3>
        <h4>${player.strNationality}</h4>
        <h5>${player.dateBorn}</h5>
        <p>${player.strPosition}</p>
        <button onclick="playerDetail('${player.idPlayer}')" type="button" class="btn btn-outline-secondary">See more</button>
    `;

    addPlayersAdd.appendChild(div);
  }
};

const playerDetail = (playerId) => {
  console.log(playerId);
  fetch(
    `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}`
  )
    .then((res) => res.json())
    .then((data) => {
      const player = data.players[0];
      addPlayersAdd.textContent = "";
      const div = document.createElement("div");
      div.innerHTML = `
      
      <div class="card mb-3" style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${player.strThumb}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${player.strPlayer}</h5>
            <p class="card-text">${player.strDescriptionEN}</p>
            <p class="card-text"><small class="text-muted">${player.strHeight}</small></p>
          </div>
        </div>
      </div>
    </div>
      
      `;
      addPlayersAdd.appendChild(div);
    });
};
