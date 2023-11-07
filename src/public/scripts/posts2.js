document.addEventListener('DOMContentLoaded', function() {
    const postForm = document.getElementById('post-form');
    const postsList = document.querySelector('.post-list');

    postForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const postTitle = document.getElementById('post-tittle');
        const postContent = document.getElementById('post-content');

        const title = postTitle.value;
        const content = postContent.value;

        if (title && content) {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <div class="vote">
                    <div class="post-content">
                        <h2 class="fw-bold">${title}</h2>
                        <p>${content}</p>
                        <div class="voting">
                            <button  class="upvote"><img src="like2.png" height ="30" width="30"/></button>
                            <span class="vote-count">0</span>
                            <button class="downvote"><img src="dislike2.png" height ="30" width="30"/></button>
                        </div>
                    </div>
                </div>
            `;

            postsList.appendChild(postElement);

            postTitle.value = '';
            postContent.value = '';

            let voteCount = 0;
            const upvoteButton = postElement.querySelector('.upvote');
            const downvoteButton = postElement.querySelector('.downvote');
            const voteCountSpan = postElement.querySelector('.vote-count');

            upvoteButton.addEventListener('click', function() {
                voteCount++;
                voteCountSpan.textContent = voteCount;
            });

            downvoteButton.addEventListener('click', function() {
                voteCount--;
                voteCountSpan.textContent = voteCount;
            });
        }
    });
});
