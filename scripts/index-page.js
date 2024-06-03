import BandSiteApi from './band-site-api.js';

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
    date.textContent = timeSince(new Date(comment.timestamp));

    const text = document.createElement('p');
    text.classList.add('comments__item-text');
    text.textContent = comment.comment;

    const activityButtons = document.createElement('div');
    activityButtons.classList.add('comments__btn-activity');

    const likeWrapper = document.createElement('div');
    likeWrapper.classList.add('comments__btn-activity-wrapper--like');

    const likeButton = document.createElement('button');
    likeButton.classList.add('comments__btn-activity--like');

    const likeCounter = document.createElement('p');
    likeCounter.textContent = `${comment.likes || 0}`;

    likeButton.addEventListener('click', async () => {
        try {
          await allComments.likeComment(comment.id);
          renderComments();
        }
        catch {
          console.error('Error liking comment:', error);
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('comments__btn-activity--delete');

    deleteButton.addEventListener('click', async () => {
        try {
          await allComments.deleteComment(comment.id);
          renderComments();
        }
        
        catch {
          console.error('Error deleting comment:', error);
        }
        
    });

    likeWrapper.append(likeButton);
    likeWrapper.append(likeCounter);

    activityButtons.append(likeWrapper);
    activityButtons.append(deleteButton);

    info.appendChild(name);
    info.appendChild(date);

    details.appendChild(info);
    details.appendChild(text);
    details.appendChild(activityButtons);

    commentItem.appendChild(avatar);
    commentItem.appendChild(details);
    commentsList.appendChild(commentItem);
}

const apiKey = "e72a5484-dff3-4315-ac2b-23edc696c942";
const allComments = new BandSiteApi(apiKey);

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
        name: nameValue,
        comment: commentValue
    };

    nameInput.classList.remove('form__input--error');
    commentInput.classList.remove('form__input--error');

    await submitComment(newComment);
    event.target.reset();
});

async function renderComments() {
    try {
  
        const comments = await allComments.getComments();
        commentsList.innerHTML = ''; 
        comments.forEach((comment) => {
            displayComment(comment);
        });
    } catch (error) {
        console.error('Error rendering comments:', error);
    }
}

renderComments(); 