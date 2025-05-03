fetch('https://blog.linuskang.au/v1/recent-posts', {
    headers: {
        'Accept': 'application/json'
    }
})
.then(response => response.json())
.then(posts => {
    const container = document.getElementById('recent-posts');
    container.innerHTML = '';

    posts.slice(0, 3).forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('card--blog');
        const tagsHtml = post.tags && post.tags.length
            ? `<div class="tags">${post.tags.map(tag => `<span class="tag-badge">${tag}</span>`).join(' ')}</div>`
            : '';
        postEl.innerHTML = `
            <a href="https://blog.linuskang.au/post/${post.slug}" target="_blank">
                <span>📝</span> ${post.title} <small>(${post.date})</small>
                <p>${post.preview}</p>
                ${tagsHtml}
            </a>
        `;
        container.appendChild(postEl);
    });
})
.catch(error => {
    document.getElementById('recent-posts').innerHTML = `<p>Error loading posts</p>`;
    console.error('Failed to load posts:', error);
});