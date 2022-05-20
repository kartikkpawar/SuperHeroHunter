const HERO_ID = localStorage.getItem("ssh-hero");
var HERO_NAME;
var HERO_REAL_NAME;
var HERO_GENDER;
var HERO_IMG;
var HERO_TYPE = "good";
// GLOBAL VARIABBLES ENDS
const superHeroImage = document.getElementById("superHeroImage");
const heroName = document.getElementById("heroName");
// Biography elements
const fullName = document.getElementById("name");
const alterEgo = document.getElementById("alterEgo");
const aliases = document.getElementById("aliases");
const pob = document.getElementById("pob");
const fa = document.getElementById("fa");
const publisher = document.getElementById("publisher");
// INFO TYPE selectors
const cat1 = document.getElementById("cat1");
const cat2 = document.getElementById("cat2");
// Info Containers selectors
const powerStatsContainer = document.getElementById("powerStatsContainer");
const biographyContainer = document.getElementById("biographyContainer");
// Favourite/ Unfavourite button
const favIcon = document.getElementById("favIcon");
const favIconRed = document.getElementById("favIconRed");
const loader = document.getElementById("loader");
const bodyContainer = document.getElementById("bodyContainer");

const getHeroById = async (id) => {
  const res = await fetch(
    `https://superheroapi.com/api.php/1911059139094659/${id}`,
    {
      method: "GET",
    }
  );
  return await res.json();
};

getHeroById(HERO_ID)
  .then((hero) => {
    loadHeroDetails(hero);
    HERO_NAME = hero.name;
    HERO_REAL_NAME = hero.biography["full-name"];
    HERO_GENDER = hero.appearance.gender;
    HERO_IMG = hero.image.url;
  })
  .catch((err) => {});

// Setting details to fields
const loadHeroDetails = (hero) => {
  loader.style.display = "none";
  bodyContainer.style.display = "flex";
  loadProgressbar(hero.powerstats);
  setPercentageText(hero.powerstats);
  heroVillanColorScheme(hero.biography.alignment);
  console.log(idHerofav());
  idHerofav() ? showFav(true) : showFav(false);

  superHeroImage.setAttribute("src", hero.image.url);
  heroName.textContent = hero.name + " #" + hero.id;
  fullName.textContent = hero.biography["full-name"];
  alterEgo.textContent = hero.biography["alter-egos"];
  var aliasesList = "";
  hero.biography.aliases.forEach((ali) => {
    aliasesList += ali + ", ";
  });
  aliases.textContent = aliasesList;
  aliasesList = "";
  pob.textContent = hero.biography["place-of-birth"];
  fa.textContent = hero.biography["first-appearance"];
  publisher.textContent = hero.biography.publisher;
};

// Setting color scheme as per the type i.e. hero or villan
const heroVillanColorScheme = (type) => {
  if (type != "bad") return;
  HERO_TYPE = "bad";
  const tags = document.getElementsByClassName("tag");
  Array.from(tags).forEach((ele) => {
    ele.classList.add("tagBad");
  });
  const info = document.getElementsByClassName("info");
  const infoActive = document.getElementsByClassName("infoActive");
  const progressBars = document.getElementsByClassName("progressBar");
  Array.from(info)[0].classList.add("infoBad");
  Array.from(infoActive)[0].classList.add("infoActiveBad");
  Array.from(progressBars).forEach((ele) =>
    ele.classList.add("progressBarBad")
  );
};

// Progressbar helper

const loadProgressbar = (stats) => {
  document.getElementById("intelligenceProgress").style.width =
    stats.intelligence + "%";
  document.getElementById("strenghtProgress").style.width =
    stats.strength + "%";
  document.getElementById("speedProgress").style.width = stats.speed + "%";
  document.getElementById("durabilityProgress").style.width =
    stats.durability + "%";
  document.getElementById("powerProgress").style.width = stats.power + "%";
  document.getElementById("combatProgress").style.width = stats.combat + "%";
};

// Setting percents to text
const setPercentageText = (stats) => {
  document.getElementById("intPer").textContent = `${stats.intelligence}%`;
  document.getElementById("strPer").textContent = `${stats.strength}%`;
  document.getElementById("speedPer").textContent = `${stats.speed}%`;
  document.getElementById("durPer").textContent = `${stats.durability}%`;
  document.getElementById("powPer").textContent = `${stats.power}%`;
  document.getElementById("comPer").textContent = `${stats.combat}%`;
};

// Onclick event listners
cat1.addEventListener("click", (e) => {
  HERO_TYPE == "bad"
    ? cat1.classList.add("infoActiveBad")
    : cat1.classList.add("infoActive");
  cat2.classList.remove("infoActive");
  cat2.classList.remove("infoActiveBad");
  powerStatsContainer.style.display = "flex";
  biographyContainer.style.display = "none";
});

cat2.addEventListener("click", (e) => {
  HERO_TYPE == "bad"
    ? cat2.classList.add("infoActiveBad")
    : cat2.classList.add("infoActive");
  cat1.classList.remove("infoActive");
  cat1.classList.remove("infoActiveBad");
  powerStatsContainer.style.display = "none";
  biographyContainer.style.display = "block";
});

favIcon.addEventListener("click", (e) => {
  const isPresent = localStorage.getItem("ssh-fav");
  if (!isPresent) {
    localStorage.setItem("ssh-fav", JSON.stringify([]));
  }
  const favs = JSON.parse(localStorage.getItem("ssh-fav"));
  const hero = {
    name: HERO_NAME,
    realName: HERO_REAL_NAME,
    gender: HERO_GENDER,
    img: HERO_IMG,
    id: HERO_ID,
  };
  favs.push(hero);
  localStorage.setItem("ssh-fav", JSON.stringify(favs));
  showFav(true);
});

favIconRed.addEventListener("click", (e) => {
  const array = JSON.parse(localStorage.getItem("ssh-fav"));
  const favs = array.filter((fav) => fav.id != HERO_ID);
  localStorage.setItem("ssh-fav", JSON.stringify(favs));
  showFav(false);
});

const idHerofav = () => {
  const storage = localStorage.getItem("ssh-fav");
  if (!storage) {
    return;
  }
  const favs = JSON.parse(storage);
  for (let index = 0; index < favs.length; index++) {
    const element = favs[index];
    if (element.id == HERO_ID) return true;
  }
  return false;
};

const showFav = (type) => {
  if (type) {
    document.getElementById("favIcon").style.display = "none";
    document.getElementById("favIconRed").style.display = "block";
    document.getElementById("favIconRed").style.color =
      HERO_TYPE == "bad" ? "#e21717" : "#4dd637";
  } else {
    document.getElementById("favIcon").style.display = "block";
    document.getElementById("favIconRed").style.display = "none";
  }
};
