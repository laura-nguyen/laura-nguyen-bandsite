import BandSiteApi from "./band-site-api.js";

// const comments = [
//     {
//         name: "Victor Pinto",
//         date: new Date("11/02/2023"),
//         text: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
//     },
//     {
//         name: "Christina Cabrera",
//         date: new Date("10/28/2023"),
//         text: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
//     },
//     {
//         name: "Isaac Tadesse",
//         date: new Date("10/20/2023"),
//         text: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
//     }
// ];

const commentsList = document.getElementById('comments__list');
const commentForm = document.getElementById('form');
const nameInput = document.getElementById('name');
const commentInput = document.getElementById('comment');

function timeSince(date) {
    const now = new Date();
    const secondsPast = (now.getTime() - date.getTime()) / 1000;

    if (secondsPast < 61) {
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
    // Timestamp is in ms since epoch - have to convert 
    // need to make sure the time date works 
    // date.textContent = new Date(comment.timestamp).toDateString();
    date.textContent = timeSince(new Date(comment.timestamp));

    const text = document.createElement('p');
    text.classList.add('comments__item-text');
    text.textContent = comment.comment;

    info.appendChild(name);
    info.appendChild(date);

    details.appendChild(info);
    details.appendChild(text);

    commentItem.appendChild(avatar);
    commentItem.appendChild(details);
    commentsList.appendChild(commentItem);
}

const allComments = new BandSiteApi("e72a5484-dff3-4315-ac2b-23edc696c942");

async function submitComment(newComment) {
    try {
        await allComments.postComment(newComment);
    
        renderComments();
    
        
    
      } catch (error) {
        console.error('Error posting comment:', error);
      }
}


commentForm.addEventListener('submit', async (event) => {
    
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


    const newComment = {
        name: nameInput.value,
        // timestamp: new Date(), 
        comment: commentInput.value
    };

    nameInput.classList.remove('form__input--error');
    commentInput.classList.remove('form__input--error');

    // called post comment function. need to figure this out 
    // unshift not working 
    // page looks like it's refreshing. need to fix 
    submitComment(newComment);

    event.target.reset();

});

async function renderComments() {
    try {
    
        // this displays the shows in an array 
      commentsList.innerHTML = '';
      const comments = await allComments.getComments();
    
      comments.forEach((comment) => {
        displayComment(comment)});

    } catch (error) {
      console.error('Error rendering comments:', error);
    }
  }
  
renderComments();