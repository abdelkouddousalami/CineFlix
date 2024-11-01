const backgroundImage = document.getElementById("backgroundImage");
const photos = document.querySelectorAll("div.absolute img");

const contentData = [
    {
        title: "Title Film 1",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias nobis doloribus.",
        imageSrc: './images/photo1.jpg',
        rating: "⭐⭐⭐⭐☆"
    },
    {
        title: "Title Film 2",
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.",
        imageSrc: './images/photo2.jpg',
        rating: "⭐⭐⭐⭐⭐"
    }
];

let currentElement; 

photos.forEach((photo, index) => {
    photo.addEventListener("mouseenter", function() {
        let myelement = document.createElement("div");
        let myelement1 = document.createElement("div");
        let myelement2 = document.createElement("div");
        let mypara = document.createElement("p");
        mypara.textContent = contentData[index].text;
        let mytitle = document.createElement("h1");
        mytitle.textContent = contentData[index].title;

        let image = document.createElement("img");
        image.src = contentData[index].imageSrc;

        let ratingsDiv = document.createElement("div");
        ratingsDiv.textContent = contentData[index].rating;
        ratingsDiv.style.fontSize = '1.5em';
        ratingsDiv.style.margin = '10px 0'; 
        ratingsDiv.style.color = '#FFD700';

        // Style the myelement
        myelement.className = "newdiv";
        myelement.style.width = '100%';
        myelement.style.height = '60vh';
        myelement.style.marginTop = '90px';
        myelement.style.display = 'flex'; 
        myelement.style.position = 'absolute';
        myelement.style.top = '0'; 
        myelement.style.left = '0';
        myelement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        myelement.style.color = 'white';
        myelement.style.justifyContent = 'space-between';
        myelement.style.alignItems = 'center'; 

        myelement1.style.width = '40%';
        myelement1.style.height = 'auto';
        myelement2.style.width = '40%';
        myelement2.style.height = 'auto';
        image.style.width = '49%';
        image.style.height = '90%';

        mypara.style.width = '100%'; 
        mypara.style.lineHeight = '1.6'; 
        mypara.style.margin = '10px 0'; 
        mypara.style.fontSize = '16px'; 
        mypara.style.color = '#f0f0f0';

        mytitle.style.fontSize = '2.5em';
        mytitle.style.fontWeight = 'bold'; 
        mytitle.style.margin = '0';
        mytitle.style.textAlign = 'center';
        mytitle.style.textShadow = '1px 1px 2px rgba(0, 0, 0, 0.7)';
        mytitle.style.color = '#FFD700';

        myelement.appendChild(myelement1);
        myelement.appendChild(myelement2);
        myelement2.appendChild(mytitle);
        myelement2.appendChild(ratingsDiv);
        myelement2.appendChild(mypara);
        myelement1.appendChild(image);

        if (currentElement) {
            currentElement.classList.remove("show");
           
        }

        document.body.appendChild(myelement);
        currentElement = myelement; 

        
        setTimeout(() => {
            myelement.classList.add("show");
        }, 50); 

        photo.addEventListener("mouseleave", function() {
            myelement.classList.remove("show");
            
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const movieItems = document.querySelectorAll(".movie-item");

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        
        movieItems.forEach(item => {
            const title = item.querySelector("h1").textContent.toLowerCase();
            item.style.display = title.includes(query) ? "block" : "none";
        });
    });
});
function addToFavorites(movieTitle, imageSrc) {
    let titles = localStorage.getItem("favorites_titles") || "";
    let images = localStorage.getItem("favorites_images") || "";

    if (!titles.includes(movieTitle)) {
        titles += titles ? `,${movieTitle}` : movieTitle;
        images += images ? `,${imageSrc}` : imageSrc;

        localStorage.setItem("favorites_titles", titles);
        localStorage.setItem("favorites_images", images);

        alert(`${movieTitle} has been added to your favorites!`);
    } else {
        alert(`${movieTitle} is already in your favorites.`);
    }
}

function loadFavorites() {
    let titles = localStorage.getItem("favorites_titles");
    let images = localStorage.getItem("favorites_images");

    let slide1 = document.getElementById("slide1");
    let slide2 = document.getElementById("slide2");

    if (!titles || !images) {
        slide1.innerHTML = "<p>No favorites added yet.</p>";
        slide2.innerHTML = "";
    } else {
        let titleList = titles.split(",");
        let imageList = images.split(",");
        
        
        const midIndex = Math.ceil(titleList.length / 2);
        const slide1Titles = titleList.slice(0, midIndex);
        const slide1Images = imageList.slice(0, midIndex);
        const slide2Titles = titleList.slice(midIndex);
        const slide2Images = imageList.slice(midIndex);

        slide1.innerHTML = slide1Titles.map((title, i) => `
    <div class="movie-item" data-title="${title}">
        <img src="${slide1Images[i]}" alt="${title}" class="w-32 h-32 rounded">
        <p>${title}</p>
        <button class="remove-btn text-red-500">Remove</button>
    </div>
`).join("");

slide2.innerHTML = slide2Titles.map((title, i) => `
    <div class="movie-item" data-title="${title}">
        <img src="${slide2Images[i]}" alt="${title}" class="w-32 h-32 rounded">
        <p>${title}</p>
        <button class="remove-btn text-red-500">Remove</button>
    </div>
`).join("");

    }
}

if (window.location.pathname.includes("favorites.html")) {
    loadFavorites();
}
document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const movieItem = event.target.closest('.movie-item');
        const title = movieItem.getAttribute('data-title');
        removeFavorite(title);
    });
});
function removeFavorite(title) {
    let titles = localStorage.getItem("favorites_titles").split(",");
    let images = localStorage.getItem("favorites_images").split(",");

    const index = titles.indexOf(title);
    if (index !== -1) {
        titles.splice(index, 1);
        images.splice(index, 1);
    }

    localStorage.setItem("favorites_titles", titles.join(","));
    localStorage.setItem("favorites_images", images.join(","));

    loadFavorites();
}
const movies = [
    { title: "Horror", image: "images/photo.jpg" },
    { title: "Sea", image: "images/photo1.jpg" },
    { title: "After", image: "images/photo2.jpg" },
    { title: "Joker", image: "images/photo3.jpg" },
    { title: "Jumanji", image: "images/photo4.jpg" },
    { title: "Dark", image: "images/photo5.jpg" },
];

let currentIndex = 0;

function updateMovieDisplay() {
    const movieItems = document.querySelectorAll('.movie-item');

    movieItems.forEach((item, index) => {
        const movie = movies[(currentIndex + index) % movies.length]; 
        item.querySelector('h1').textContent = movie.title;
        item.querySelector('img').src = movie.image;
    });
}

function nextImage() {
    currentIndex = (currentIndex + 1) % movies.length;
    updateMovieDisplay();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + movies.length) % movies.length;
    updateMovieDisplay();
}

document.querySelector('.btn1').addEventListener('click', prevImage);
document.querySelector('.btn2').addEventListener('click', nextImage);

updateMovieDisplay();
function submitReview() {
    const message = document.getElementById('message').value;
    const rating = document.querySelector('input[name="rating"]:checked');
    
    if (!message || !rating) {
      alert('Please provide both a message and a rating.');
      return;
    }
    
    const reviewDisplay = document.getElementById('review-display');
    const review = document.createElement('div');
    review.classList.add('single-review');
    
    review.innerHTML = `
      <p><strong>Rating:</strong> ${'⭐'.repeat(rating.value)}</p>
      <p><strong>Review:</strong> ${message}</p>
      <hr>
    `;
    
    reviewDisplay.appendChild(review);
  
    document.getElementById('message').value = '';
    rating.checked = false;
  }
  document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".movie-item img");
  
    images.forEach(image => {
      image.classList.add("float");
  
      image.addEventListener("mouseover", () => {
        image.classList.remove("float");
      });
  
      image.addEventListener("mouseout", () => {
        image.classList.add("float");
      });
    });
  });
  
  