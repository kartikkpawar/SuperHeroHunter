const favsContainer = document.getElementById("favsContainer");
const alertMsg = document.getElementById("alert");
const storage = localStorage.getItem("ssh-fav");
const loadFavs = () => {
  if (!storage) return (alertMsg.style.display = "block");
  alertMsg.style.display = "none";
  const favs = JSON.parse(localStorage.getItem("ssh-fav"));
  favs.length > 0
    ? favs.forEach((f) => {
        favsContainer.append(favDivCreater(f));
      })
    : (alertMsg.style.display = "block");
};

const favDivCreater = (favs) => {
  const fav = document.createElement("div");
  const favDetails = document.createElement("div");
  const favHeroInfoContainer = document.createElement("div");
  const favImage = document.createElement("img");
  const favName = document.createElement("span");
  const favRealName = document.createElement("span");
  const favGender = document.createElement("span");
  const heartIcon = document.createElement("i");
  //   Adding classes to the elements
  fav.classList.add("fav");
  favDetails.classList.add("favDetails");
  favHeroInfoContainer.classList.add("favHeroInfoContainer");
  favImage.classList.add("favImage");
  favName.classList.add("favName");
  favRealName.classList.add("favRealName");
  favGender.classList.add("favGender");

  //   Settimg content to fields
  favName.textContent = favs.name;
  favRealName.textContent = favs.realName;
  favGender.textContent = favs.gender;
  favImage.setAttribute("src", favs.img);
  heartIcon.setAttribute("class", "bx bxs-heart bx-md favIconRed");

  //   Setting onclick listners
  heartIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    const array = JSON.parse(localStorage.getItem("ssh-fav"));
    const favsA = array.filter((fav) => fav.id != favs.id);
    localStorage.setItem("ssh-fav", JSON.stringify(favsA));
    window.location.reload();
  });
  fav.addEventListener("click", (e) => {
    saveSearch(favs.id);
  });

  //   Appending all childs to thier parent node
  favHeroInfoContainer.appendChild(favName);
  favHeroInfoContainer.appendChild(favRealName);
  favHeroInfoContainer.appendChild(favGender);
  favDetails.appendChild(favImage);
  favDetails.appendChild(favHeroInfoContainer);
  fav.appendChild(favDetails);
  fav.appendChild(heartIcon);
  return fav;
};

const saveSearch = (hero) => {
  localStorage.setItem("ssh-hero", hero);
  window.location.href = "../pages/superhero.html";
};

loadFavs();
