import bestSeller from "./bestSeller.js";

const carousel = document.getElementById("carousel");

carousel.innerHTML = bestSeller
  .map((item) => {
    return `
      <div class="flex-none relative">
        <img
          src=${item.img}
          alt="Best Seller"
          class="w-[163px] md:w-full rounded-xl" />

        <div
          id="detail-product"
          class="absolute bottom-4 md:bottom-9 left-4 md:left-6">
          <p class="text-sm md:text-2xl py-2 px-4 bg-white/50 rounded-xl w-max">
            ${item.price}
          </p>
          <p class="text-white text-2xl md:text-5xl">${item.title}</p>
        </div>
      </div>
    `;
  })
  .join("");

const arrowIcons = document.querySelectorAll("#arrow-icons button");
const carouselImg = carousel.querySelectorAll("img");
const detailProduct = carousel.querySelectorAll("#detail-product");

carouselImg[0].classList.add("active");

for (let i = 0; i < detailProduct.length; i++) {
  if (!carouselImg[i].classList.contains("active")) {
    detailProduct[i].classList.add("hidden");
  }
}

let firstImgWidth =
  window.innerWidth > 700
    ? carouselImg[0].naturalWidth + 36
    : carouselImg[0].naturalWidth - 300 / 2.5;

let index = 0;

if (window.innerWidth > 700) {
  document.documentElement.style.setProperty("--wactive", 354 + "px");
  document.documentElement.style.setProperty("--hactive", 472 + "px");
} else {
  document.documentElement.style.setProperty("--wactive", 192 + "px");
  document.documentElement.style.setProperty("--hactive", 256 + "px");
}

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;

    if (icon.id == "left" && index != 0) {
      carouselImg[index].classList.remove("active");
      detailProduct[index].classList.add("hidden");
      index--;
      carouselImg[index].classList.add("active");
      detailProduct[index].classList.remove("hidden");
    } else if (icon.id == "right" && index != carouselImg.length - 1) {
      carouselImg[index].classList.remove("active");
      detailProduct[index].classList.add("hidden");
      index++;
      carouselImg[index].classList.add("active");
      detailProduct[index].classList.remove("hidden");
    }
  });
});

const hamburgerMenu = document.getElementById("hamburger-menu");
const mobileMenu = document.getElementById("mobile-menu");
const getLi = mobileMenu.querySelectorAll("li");

hamburgerMenu.onclick = () => {
  mobileMenu.classList.toggle("hidden");

  getLi.forEach((item) => {
    item.onclick = () => {
      mobileMenu.classList.toggle("hidden");
    };
  });
};
