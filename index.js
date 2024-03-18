const imagesWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");
let searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const card = document.querySelector(".card");
const lightBox = document.querySelector(".light-box");
const hideBtn = document.getElementById("hide-btn");
const lightBoxDownloadBtn = document.getElementById("lightDBtn");

///////////////
const apiKey = "VlXMx8crhCHzQRQRRXF3HA6R7NiSWSRszI0RrnTGDDNoa62nQV851hW3";
const perPage = 15;
let curPage = 1;
let searchQuery = false;
///////////////

function generateHTML(images) {
  imagesWrapper.innerHTML += images
    .map(
      (img) =>
        `<li class="card" onclick="showLightBox('${img.src.large2x}','${img.photographer}')" >
    <img src="${img.src.large2x}" alt="img" />
    <div class="details">
      <div class="photographer">
        <p><img src="images/camera.png" alt="camera" /></p>
        <span>${img.photographer}</span>
      </div>
      <button onclick="downloadImage('${img.src.large2x}');event.stopPropagation();" >
        <img class="download" src="images/download.png" alt="download" />
      </button>
    </div>
  </li>`
    )
    .join("");
}
// function getImages(apiURL) {
//   fetch(apiURL, {
//     headers: { Authorization: apiKey },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       generateHTML(data.photos);
//     });
// }
async function getImages(apiURL) {
  try {
    loadMoreBtn.innerText = "Loading...";
    const res = await fetch(apiURL, {
      headers: { Authorization: apiKey },
    });
    const data = await res.json();
    // console.log(data);
    loadMoreBtn.innerText = "Load more";
    loadMoreBtn.classList.remove("disable");
    generateHTML(data.photos);
  } catch {
    alert("Failed to load images.");
  }
}
getImages(
  `https://api.pexels.com/v1/curated?page=${curPage}&per_page=${perPage}`
);
// LoadMore images Button
function getMoreImages() {
  curPage++;
  let apiURL = `https://api.pexels.com/v1/curated?page=${curPage}&per_page=${perPage}`;

  apiURL = searchInput
    ? `https://api.pexels.com/v1/search?query=${searchQuery}&page=${curPage}&per_page=${perPage}`
    : apiURL;
  getImages(apiURL);
}
loadMoreBtn.addEventListener("click", getMoreImages);

//Search functionality when click Enter
function loadSearchedImages(e) {
  if (e.target.value === "") return;
  if (e.key === "Enter") {
    // console.log("Enter Pressed");
    curPage = 1;
    searchQuery = e.target.value;
    imagesWrapper.innerHTML = "";
    getImages(
      `https://api.pexels.com/v1/search?query=${searchQuery}&page=${curPage}&per_page=${perPage}`
    );
  }
}
searchInput.addEventListener("keyup", loadSearchedImages);

//For Search Button
function searchImages() {
  curPage = 1;
  searchQuery = searchInput.value;
  imagesWrapper.innerHTML = "";
  getImages(
    `https://api.pexels.com/v1/search?query=${searchQuery}&page=${curPage}&per_page=${perPage}`
  );
}
searchBtn.addEventListener("click", searchImages);

// Download image functionality

const downloadImage = (imgURL) => {
  // console.log(imgURL);
  try {
    fetch(imgURL)
      .then((res) => res.blob())
      .then((file) => {
        // console.log(file);
        const a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = new Date().getTime();
        a.click();
      });
  } catch {
    () => alert("Failed to Download image!");
  }
};

//Show lightbox(img,name)  when clicked on the image card

const showLightBox = (img, name) => {
  lightBox.classList.remove("show-box");
  lightBox.querySelector(".pop-img").src = img;
  lightBox.querySelector("h2").innerText = name;
  lightBoxDownloadBtn.setAttribute("data-img", img);
};
// Hide the lightbox on close btn
function hideLightBox() {
  lightBox.classList.add("show-box");
}
hideBtn.addEventListener("click", hideLightBox);

//LightBox Download Btn

lightBoxDownloadBtn.addEventListener("click", (e) =>
  downloadImage(e.target.dataset.img)
);
