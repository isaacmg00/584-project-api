const year = new Date().getFullYear();
let month = new Date().getUTCMonth() + 1;
month = "0" + month;
let day = new Date().getDate();
let homeTeamTag;
const urlDate = year + month + day;
let numGames = 0;
let [gamesList, homeTeams, awayTeams, homeScores, awayScores] = [
  [],
  [],
  [],
  [],
  [],
];
const url = "https://data.nba.net/10s/prod/v1/" + urlDate + "/scoreboard.json";

const promise = fetch(url);

promise
  .then(function (response) {
    const processingPromise = response.json();
    return processingPromise;
  })
  .then(function (processedResponse) {
    const numGames = processedResponse.numGames;
    console.log(numGames);

    const htmlHeading = document.getElementById("heading");
    htmlHeading.innerText = `There are ${numGames} games being played today`;
    for (let i = 0; i < numGames; i++) {
      console.log(i);

      currentGame = processedResponse.games[i];
      gamesList[i] = currentGame;
      homeTeams[i] = currentGame.hTeam.triCode;
      awayTeams[i] = currentGame.vTeam.triCode;
      homeScores[i] = currentGame.hTeam.score;
      awayScores[i] = currentGame.vTeam.score;
    }

    for (let i = 0; i < numGames; i++) {
      let divID = "game" + i;
      let element = document.getElementById(divID);
      element.classList.add("game");
    }
    const games = processedResponse.games[0];
    console.log(gamesList);
    console.log(homeTeams);
    console.log(awayTeams);
    console.log(homeScores);
    console.log(awayScores);
    return numGames;
  })
  .then(function (numGames) {
    try {
      console.log(numGames);
      for (let i = 0; i < numGames; i++) {
        let homeTeamTag = document.getElementById(`game${i}home`);
        homeTeamTag.innerText = `${homeTeams[i]} (HOME): ${homeScores[i]}`;
        homeTeamTag.classList.add("homeTeam");
        homeTeamTag.classList.add(homeTeams[i]);

        let awayTeamTag = document.getElementById(`game${i}away`);
        awayTeamTag.innerText = `${awayTeams[i]} (AWAY): ${awayScores[i]}`;
        awayTeamTag.classList.add("awayTeam");
        awayTeamTag.classList.add(awayTeams[i]);
      }
    } catch {}
  });
