const comments = [
    {
        name: "Victor Pinto",
        date: "11/02/2023",
        text: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    },
    {
        name: "Christina Cabrera",
        date: "10/28/2023",
        text: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    },
    {
        name: "Isaac Tadesse",
        date: "10/20/2023",
        text: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    }
];

const commentsList = document.getElementById('comments__list');
const commentForm = document.getElementById('form');
const nameInput = document.getElementById('name');
const commentInput = document.getElementById('comment');


function displayComment(comment) {
    const commentItem = document.createElement('div');
    commentItem.classList.add('comments__item');

    const avatar = document.createElement('div');
    avatar.classList.add('comments__avatar--grey');

    const details = document.createElement('div');
    details.classList.add('comments__item-details');

    const info = document.createElement('div');
    info.classList.add('comments__item-info');

    const name = document.createElement('p');
    name.classList.add('comments__item-name');
    name.textContent = comment.name;

    const date = document.createElement('p');
    date.classList.add('comments__item-date');
    date.textContent = new Date(comment.date).toLocaleDateString();

    const text = document.createElement('p');
    text.classList.add('comments__item-text');
    text.textContent = comment.text;

    info.appendChild(name);
    info.appendChild(date);

    details.appendChild(info);
    details.appendChild(text);

    commentItem.appendChild(avatar);
    commentItem.appendChild(details);
    commentsList.appendChild(commentItem);
}

function clearAllComments() {
    while (commentsList.firstChild) {
        commentsList.removeChild(commentsList.firstChild);
    }
}

function refreshComments() {
    clearAllComments();
    comments.forEach(comment => displayComment(comment));
}

refreshComments();

commentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newComment = {
        name: nameInput.value,
        date: new Date().toLocaleDateString(), 
        text: commentInput.value
    };
    comments.unshift(newComment);

    refreshComments();
    
    event.target.reset();
});