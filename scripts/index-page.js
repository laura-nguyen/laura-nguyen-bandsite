import BandSiteApi from "./band-site-api.js";

const comments = [
    {
        name: "Victor Pinto",
        date: new Date("11/02/2023"),
        text: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    },
    {
        name: "Christina Cabrera",
        date: new Date("10/28/2023"),
        text: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    },
    {
        name: "Isaac Tadesse",
        date: new Date("10/20/2023"),
        text: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    }
];

const commentsList = document.getElementById('comments__list');
const commentForm = document.getElementById('form');
const nameInput = document.getElementById('name');
const commentInput = document.getElementById('comment');

function timeSince(date) {
    const now = new Date();
    const secondsPast = (now.getTime() - date.getTime()) / 1000;

    if (secondsPast < 60) {
        return `${Math.floor(secondsPast)} seconds ago`;
    } else if (secondsPast < 3600) {
        return `${Math.floor(secondsPast / 60)} minutes ago`;
    } else if (secondsPast <= 86400) {
        return `${Math.floor(secondsPast / 3600)} hours ago`;
    } else if (secondsPast <= 2592000) { 
        return `${Math.floor(secondsPast / 86400)} days ago`;
    } else if (secondsPast < 31536000) { 
        return `${Math.floor(secondsPast / 2592000)} months ago`;
    } else if (secondsPast < 63072000) { 
        return `1 year ago`;
    } else { 
        return `${Math.floor(secondsPast / 31536000)} years ago`;
    }
  }

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
    date.textContent = timeSince(comment.date);

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

// replace this function with getComments from API 
function refreshComments() {
    commentsList.innerHTML = '';
    comments.forEach(comment => displayComment(comment));
}

refreshComments();

commentForm.addEventListener('submit', (event) => {
    
    event.preventDefault();

    const nameValue = nameInput.value.trim();
    const commentValue = commentInput.value.trim();

    if (nameValue === "" || commentValue === "") {
      if (nameValue === "") {
        nameInput.classList.add('form__input--error');
      } else {
        nameInput.classList.remove('form__input--error');
      }
      if (commentValue === "") {
        commentInput.classList.add('form__input--error');
      } else {
        commentInput.classList.remove('form__input--error');
      }
      return;
    }

    // fire postComment function 

    const newComment = {
        name: nameInput.value,
        date: new Date(), 
        text: commentInput.value
    };

    nameInput.classList.remove('form__input--error');
    commentInput.classList.remove('form__input--error');

    comments.unshift(newComment);

    refreshComments();

    event.target.reset();

});

const API_KEY = "e72a5484-dff3-4315-ac2b-23edc696c942";
const api = new BandSiteApi(API_KEY);
api.getComments();
api.getShows();