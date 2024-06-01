// Dummy ad data
const adData = [
    {
        id: 1,
        category: 'tutoring',
        subject: 'Math',
        location: 'New York',
        price: 50,
        images: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
        postedTime: '2023-01-01T10:00:00Z'
    },
    {
        id: 2,
        category: 'courses',
        subject: 'Science',
        location: 'Los Angeles',
        price: 200,
        images: ['img4.jpg', 'img5.jpg', 'img6.jpg'],
        postedTime: '2023-02-01T12:00:00Z'
    },
    {
        id: 3,
        category: 'materials',
        subject: 'History',
        location: 'Chicago',
        price: 30,
        images: ['img7.jpg', 'img8.jpg', 'img9.jpg'],
        postedTime: '2023-03-01T14:00:00Z'
    },
    // Additional ads for each category
    {
        id: 4,
        category: 'workshops',
        subject: 'Programming',
        location: 'San Francisco',
        price: 150,
        images: ['img10.jpg', 'img11.jpg', 'img12.jpg'],
        postedTime: '2023-04-01T14:00:00Z'
    },
    {
        id: 5,
        category: 'events',
        subject: 'Art',
        location: 'Miami',
        price: 100,
        images: ['img13.jpg', 'img14.jpg', 'img15.jpg'],
        postedTime: '2023-05-01T14:00:00Z'
    },
    {
        id: 6,
        category: 'others',
        subject: 'Music',
        location: 'Houston',
        price: 25,
        images: ['img16.jpg', 'img17.jpg', 'img18.jpg'],
        postedTime: '2023-06-01T14:00:00Z'
    }
];

let filteredAds = [...adData];

function handleSearch() {
    const category = document.getElementById('category').value;
    const subject = document.getElementById('subject').value;
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const location = document.getElementById('location').value;

    filteredAds = adData.filter(ad => {
        return (!category || ad.category === category) &&
            (!subject || ad.subject === subject) &&
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
                    <h5 class="card-title">${ad.location}</h5>
                    <p class="card-text">Category: ${formatCategory(ad.category)}</p>
                    <p class="card-text">Subject: ${ad.subject}</p>
                    <p class="card-text">Price: $${ad.price}</p>
                    <p class="card-text">Posted: ${formatDistanceToNow(new Date(ad.postedTime))} ago</p>
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
    document.getElementById('modalPostedTime').innerText = `Posted: ${formatDistanceToNow(new Date(ad.postedTime))} ago`;

    modal.show();
}

function formatCategory(category) {
    switch (category) {
        case 'tutoring': return 'Tutoring';
        case 'courses': return 'Courses';
        case 'materials': return 'Materials';
        case 'workshops': return 'Workshops';
        case 'events': return 'Events';
        case 'others': return 'Others';
        default: return 'Unknown';
    }
}

function formatDistanceToNow(date) {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    const intervals = {
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };

    for (const [key, value] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / value);
        if (interval >= 1) {
            return `${interval} ${key}${interval !== 1 ? 's' : ''} ago`;
        }
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
