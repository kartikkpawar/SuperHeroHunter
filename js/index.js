const input = document.getElementById("searchbar");
const searchButton = document.getElementById("searchButton");
const searchResultContainer = document.getElementById("searchResultContainer");
const searchResults = document.getElementsByClassName("searchResult");
const warningText = document.getElementById("warningText");
const favButton = document.getElementById("favButton");

input.addEventListener("keyup", async (event) => {
  if (input.value == "" || input.value.length < 3) {
    warningText.style.display = "block";
    searchResultContainer.style.display = "none";
    return;
  }
  warningText.style.display = "none";
  const res = await searchApiCall(input.value.replace(" ", "%20"));
  if (res.response == "error") return;
  res?.results?.forEach((hero) => {
    searchResultContainer.appendChild(resultBuilder(hero));
  });
  onClickForResults();
  showSearchResults();
});

// calling the search api
const searchApiCall = async (value) => {
  const res = await fetch(
    `https://superheroapi.com/api.php/1911059139094659/search/${value}`,
    {
      method: "GET",
    }
  );
  return await res.json();
};

// displaying the search result
const showSearchResults = () => {
  searchResultContainer.style.display = "block";
};

// creating the search result div
const resultBuilder = (data) => {
  const div = document.createElement("div");
  const img = document.createElement("img");
  const span = document.createElement("span");
  div.classList.add("searchResult");
  img.classList.add("serachHeroImage");
  span.classList.add("searchHeroName");
  div.appendChild(img);
  div.appendChild(span);
  div.setAttribute("data-id", data.id);
  img.setAttribute("src", data.image.url);
  span.innerText = data?.name + ", " + data.appearance.gender;
  return div;
};

// setting on click event listnetrs for the search result
const onClickForResults = () => {
  Array.from(searchResults).forEach((res) => {
    res.addEventListener("click", (e) => {
      saveSearch(res.getAttribute("data-id"));
    });
  });
};
// Saving the search to localstorage and shifting to new page
const saveSearch = (hero) => {
  localStorage.setItem("ssh-hero", hero);
  input.value = "";
  searchResultContainer.style.display = "none";
  window.location.href = "../pages/superhero.html";
};

favButton.addEventListener("click", (e) => {
  window.location.href = "../pages/favourites.html";
});
