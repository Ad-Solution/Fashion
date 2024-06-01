// Dummy ad data
const adData = [
    {
        id: 1,
        category: 'clothing',
        location: 'New York',
        price: 150,
        images: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
        postedTime: '2024-06-01'
    },
    {
        id: 2,
        category: 'accessories',
        location: 'Los Angeles',
        price: 50,
        images: ['img4.jpg', 'img5.jpg', 'img6.jpg'],
        postedTime: '2023-02-01'
    },
    {
        id: 3,
        category: 'beauty-products',
        location: 'Chicago',
        price: 30,
        images: ['img7.jpg', 'img8.jpg', 'img9.jpg'],
        postedTime: '2023-03-01'
    },
    // Additional ads for each category
    {
        id: 4,
        category: 'footwear',
        location: 'San Francisco',
        price: 80,
        images: ['img10.jpg', 'img11.jpg', 'img12.jpg'],
        postedTime: '2023-04-01'
    },
    {
        id: 5,
        category: 'jewelry',
        location: 'Miami',
        price: 200,
        images: ['img13.jpg', 'img14.jpg', 'img15.jpg'],
        postedTime: '2023-05-01'
    },
    {
        id: 6,
        category: 'others',
        location: 'Houston',
        price: 70,
        images: ['img16.jpg', 'img17.jpg', 'img18.jpg'],
        postedTime: '2023-06-01'
    }
];

let filteredAds = [...adData];

function handleSearch() {
    const category = document.getElementById('category').value;
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const location = document.getElementById('location').value;

    filteredAds = adData.filter(ad => {
        return (!category || ad.category === category) &&
            (!minPrice || ad.price >= parseInt(minPrice)) &&
            (!maxPrice || ad.price <= parseInt(maxPrice)) &&
            (!location || ad.location.toLowerCase().includes(location.toLowerCase()));
    });

    displayAds();
}

function displayAds() {
    const adContainer = document.getElementById('adContainer');
    adContainer.innerHTML = '';

    filteredAds.forEach(ad => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card mb-4 ad-card">
                <div id="carousel${ad.id}" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        ${ad.images.map((img, index) => `
                        <div class="carousel-item ${index === 0 ? 'active' : ''}">
                            <img class="d-block w-100" src="${img}" alt="Ad image">
                        </div>`).join('')}
                    </div>
                    <a class="carousel-control-prev" href="#carousel${ad.id}" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carousel${ad.id}" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
                <div class="card-body">
                    <h5 class="card-title"> ${formatCategory(ad.category)}</h5>
                    <p class="card-text">Price: $${ad.price}</p>
                    <p class="card-text">Location: ${ad.location}</p>
                    <p class="card-text">Posted on: ${ad.postedTime}</p>
                    <button class="btn btn-primary" onclick="handleViewDetails(${ad.id})">View Details</button>
                </div>
            </div>`;
        adContainer.appendChild(card);
    });
}

function handleViewDetails(id) {
    const ad = filteredAds.find(p => p.id === id);
    const modal = new bootstrap.Modal(document.getElementById('adModal'));

    document.getElementById('adModalLabel').innerText = ad.location;
    document.getElementById('carouselInner').innerHTML = ad.images.map((img, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <img class="d-block w-100" src="${img}" alt="Ad image">
        </div>`).join('');
    document.getElementById('modalLocation').innerText = `Location: ${ad.location}`;
    document.getElementById('modalPrice').innerText = `Price: $${ad.price}`;
    document.getElementById('modalCategory').innerText = `Category: ${formatCategory(ad.category)}`;
    document.getElementById('modalPostedTime').innerText = `Posted on: ${ad.postedTime}`;

    modal.show();
}

function formatCategory(category) {
    switch (category) {
        case 'clothing': return 'Clothing';
        case 'accessories': return 'Accessories';
        case 'beauty-products': return 'Beauty Products';
        case 'footwear': return 'Footwear';
        case 'jewelry': return 'Jewelry';
        case 'others': return 'Others';
        default: return 'Unknown';
    }
}

// Back to Top button functionality
const backToTopBtn = document.getElementById('backToTopBtn');

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

document.addEventListener('DOMContentLoaded', () => {
    displayAds();
});
