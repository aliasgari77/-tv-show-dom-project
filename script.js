function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
}

window.onload = setup;

function getEpisodeName(singleEpisode) {
  return `${singleEpisode.name} - ${
    singleEpisode.season < 10
      ? "S0" + singleEpisode.season
      : "S" + singleEpisode.season
  }${
    singleEpisode.season < 10
      ? "E0" + singleEpisode.number
      : "E" + singleEpisode.number
  }
`;
}

function displayEpisode(singleEpisode) {
  let main = document.querySelector("main");
  let article = document.createElement("article");

  let h1 = document.createElement("h1");
  h1.innerText = getEpisodeName(singleEpisode); //
  let img = document.createElement("img");
  img.src = singleEpisode.image.medium;

  let div = document.createElement("div");
  div.innerHTML = singleEpisode.summary; //
  article.appendChild(h1);
  article.appendChild(img);
  article.appendChild(div);
  main.appendChild(article);
  article.className = "episode";
}

const allEpisodes = getAllEpisodes();
allEpisodes.forEach((episode) => displayEpisode(episode));
fillDropList(allEpisodes);

searchField = document.querySelector("#search-field");
searchField.addEventListener("keyup", searchEpisode);

function ShowCount(resultCounter, allCounter) {
  result = document.querySelector("#search-count");
  result.innerText = `Displaying ${resultCounter}/${allCounter} episodes..`;
}

function searchEpisode(e) {
  inputValue = searchField.value;
  console.log(inputValue);
  console.log(
    allEpisodes.filter((episode) =>
      episode.name.toLowerCase().includes(inputValue.toLowerCase())
    )
  );

  let main = document.querySelector(".all-episodes");
  main.innerHTML = "";
  searchResult = allEpisodes.filter(
    (episode) =>
      episode.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      episode.summary.toLowerCase().includes(inputValue.toLowerCase())
  );

  searchResult.forEach((filtered) => displayEpisode(filtered));
  ShowCount(searchResult.length, allEpisodes.length);
}

function fillDropList(episodes) {
  let episodeList = document.querySelector("#episodesDropList");
  episodes.forEach((item) => {
    let option = document.createElement("option");
    option.text = getEpisodeName(item);
    option.value = item.id;
    episodeList.add(option);
  });
}

document
  .querySelector("#episodesDropList")
  .addEventListener("change", selectSingleEpisode);

function selectSingleEpisode(e) {
  if (e.target.value == 0) {
    allEpisodes.forEach((episode) => displayEpisode(episode));
  } else {
    let singleResult = allEpisodes.filter(
      (episode) => episode.id == e.target.value
    );
    let main = document.querySelector(".all-episodes");
    main.innerHTML = "";
    displayEpisode(singleResult[0]);
  }
}
