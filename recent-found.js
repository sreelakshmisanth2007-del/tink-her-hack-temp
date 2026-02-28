window.onload = function() {
    renderLostPosts();
};

function renderLostPosts() {
    const grid = document.getElementById('postsGrid');
    const allLost = JSON.parse(localStorage.getItem('allFoundPosts') || "[]");

    grid.innerHTML = ''; // Clear the grid before rendering

    allLost.forEach((post) => {
        const card = document.createElement('div');
        card.className = 'post-card';
        card.innerHTML = `
            <h3>${post.name}</h3>
            <div class="item-img-placeholder">🔍</div>
            <p>📍 ${post.loc}</p>
            <button class="view-btn" onclick="openDetails(${post.id})">Details</button>
        `;
        grid.appendChild(card);
    });
}

// Search and Match Algorithm
function handleLostSearch() {
    const query = document.getElementById('lostSearch').value.toLowerCase();
    const foundItems = JSON.parse(localStorage.getItem('allFoundPosts') || "[]");
    const banner = document.getElementById('matchAlert');

    // Filter cards
    let cards = document.getElementsByClassName('post-card');
    for (let card of cards) {
        let title = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = title.includes(query) ? "block" : "none";
    }

    // Check Found Registry for matches
    if (query.length > 2) {
        const hasMatch = foundItems.some(f => f.name.toLowerCase().includes(query));
        banner.style.display = hasMatch ? "block" : "none";
    }
}

function openDetails(id) {
    const allLost = JSON.parse(localStorage.getItem('allFoundPosts'));
    const item = allLost.find(p => p.id === id);
    const overlay = document.getElementById('detailOverlay');
    
    overlay.style.display = 'flex';
    document.getElementById('popupBody').innerHTML = `
        <div style="text-align:left;">
            <p><b>Item:</b> ${item.name}</p>
            <p><b>Description:</b> ${item.desc}</p>
            <p><b>Contact Info:</b> ${item.contact || 'No number provided'}</p>
            <p><b>Last Seen:</b> ${item.loc} at ${item.time}</p>
            <hr>
            <button class="remove-btn" onclick="deletePost(${id})">Item Returned - Remove Post</button>
        </div>
    `;
}
function closeDetails() {
    const overlay = document.getElementById('detailOverlay');
    const popup = document.getElementById('popupBody');

    if (overlay) {
        overlay.style.display = 'none';
    }

    if (popup) {
        popup.innerHTML = ''; // Clears old content
    }
}

function deletePost(id) {
    if(confirm("Confirm: Has the item been found? This will permanently remove the post.")) {
        let allLost = JSON.parse(localStorage.getItem('allLostPosts'));
        allLost = allLost.filter(p => p.id !== id);
        localStorage.setItem('allLostPosts', JSON.stringify(allLost));
        location.reload(); 
    }
}