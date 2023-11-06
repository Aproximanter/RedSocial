const upvoteButtons = document.querySelectorAll('.upvote');
const downvoteButtons = document.querySelectorAll('.downvote');
const scoreElements = document.querySelectorAll('.score');

upvoteButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        scoreElements[index].textContent = parseInt(scoreElements[index].textContent) + 1;
    });
});

downvoteButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        scoreElements[index].textContent = parseInt(scoreElements[index].textContent) - 1;
    });
});
