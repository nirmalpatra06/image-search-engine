const imagesWrapper = document.querySelector(".images");
const apiKey = "VlXMx8crhCHzQRQRRXF3HA6R7NiSWSRszI0RrnTGDDNoa62nQV851hW3";

const perPage = 15;
let curPage = 1;

function generateHTML(images) {
  imagesWrapper.innerHTML += images
    .map(
      (img) =>
        `<li class="card">
    <img src="${img.src.large2x}" alt="img" />
    <div class="details">
      <div class="photographer">
        <p><img src="images/camera.png" alt="camera" /></p>
        <span>${img.photographer}</span>
      </div>
      <button>
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
  const res = await fetch(apiURL, {
    headers: { Authorization: apiKey },
  });
  const data = await res.json();
  console.log(data);
  generateHTML(data.photos);
}
getImages(
  `https://api.pexels.com/v1/curated?page=${curPage}&per_page=${perPage}`
);
