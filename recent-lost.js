window.onload = function() {
    renderLostPage();
};

function renderLostPage() {
    const grid = document.getElementById('lostGrid');
    const posts = JSON.parse(localStorage.getItem('allLostPosts') || "[]");

     console.log("post=",posts);

    // Clear any existing placeholders
    grid.innerHTML = '';

    if (posts.length === 0) {
        grid.innerHTML = "<p>No lost items reported yet. 🔍</p>";
        return;
    }

    posts.forEach((item) => {
        // Create the rectangular box
        const box = document.createElement('div');
        box.className = 'post-card';
        
        box.innerHTML = `
            <h3>${item.name}</h3>
            <div class="item-img-placeholder">🔍</div>
            <p>📍 ${item.loc}</p>
            <button class="details-btn" onclick="openDetails(${item.id})">View Details</button>
        `;
        grid.appendChild(box);
    });
}

function openDetails(id) {
    const posts = JSON.parse(localStorage.getItem('allLostPosts'));
    const item = posts.find(p => p.id === id);
    const overlay = document.getElementById('lostDetailOverlay');
    
    overlay.style.display = 'flex';
    document.getElementById('lPopupBody').innerHTML = `
        <div style="text-align:left;">
            <p><b>Category:</b> ${item.category || item.cat}</p>
            <p><b>Description:</b> ${item.desc}</p>
            <p><b>Contact Info:</b> ${item.contact || 'Not provided'}</p>
            <p><b>Last Seen:</b> ${item.loc} at ${item.time}</p>
            <hr>
            <button class="remove-btn" onclick="removePost(${id})">Item Found - Remove Post</button>
        </div>
    `;
}
function closeLostDetails() {
    const overlay = document.getElementById('lostDetailOverlay');
    
    overlay.style.display = 'none';
    document.getElementById('lPopupBody').innerHTML = '';
}
function removePost(id) {
    if(confirm("Delete this post?")) {
        let posts = JSON.parse(localStorage.getItem('allLostPosts'));
        posts = posts.filter(p => p.id !== id);
        localStorage.setItem('allLostPosts', JSON.stringify(posts));
        renderLostPage(); // Refresh the grid
    }
}