import BandSiteApi from "./band-site-api.js";

// const showsList = [
//     {
//         date: "Mon Sept 09 2024",
//         place: "Ronald Lane",
//         location: "San Francisco, CA",
//     },
//     {
//         date: "Tue Sept 17 2024",
//         place: "Pier 3 East",
//         location: "San Francisco, CA",
//     },
//     {
//         date: "Sat Oct 12 2024",
//         place: "View Lounge",
//         location: "San Francisco, CA",
//     },
//     {
//         date: "Sat Nov 16 2024",
//         place: "Hyatt Agency",
//         location: "San Francisco, CA",
//     },
//     {
//         date: "Fri Nov 29 2024",
//         place: "Moscow Center",
//         location: "San Francisco, CA",
//     },
//     {
//         date: "Wed Dec 18 2024",
//         place: "Press Club",
//         location: "San Francisco, CA",
//     }

// ];

const showsListContainer = document.getElementById('shows__list');
let selectedShowItem = null;

// instead of a hardcoded showeach, retrieve list 

function createShow(show) {
 
    const showItem = document.createElement('div');
    showItem.classList.add('shows__item');

    const dateElement = document.createElement('div');
    dateElement.classList.add('shows__item-detail');

    const dateLabel = document.createElement('h4');
    dateLabel.classList.add('shows__label--mobile');
    dateLabel.textContent = 'Date';

    const dateDetail = document.createElement('p');
    dateDetail.classList.add('shows__item-text', 'shows__item-text--date');
    // does it need to be a string or a date 
    dateDetail.textContent = new Date(show.date).toDateString();

    dateElement.appendChild(dateLabel);
    dateElement.appendChild(dateDetail);

    const placeElement = document.createElement('div');
    placeElement.classList.add('shows__item-detail');

    const placeLabel = document.createElement('h4');
    placeLabel.classList.add('shows__label--mobile');
    placeLabel.textContent = 'Venue';

    const placeDetail = document.createElement('p');
    placeDetail.classList.add('shows__item-text');
    placeDetail.textContent = show.place;

    placeElement.appendChild(placeLabel);
    placeElement.appendChild(placeDetail);

    const locationElement = document.createElement('div');
    locationElement.classList.add('shows__item-detail');

    const locationLabel = document.createElement('h4');
    locationLabel.classList.add('shows__label--mobile');
    locationLabel.textContent = 'Location';

    const locationDetail = document.createElement('p');
    locationDetail.classList.add('shows__item-text');
    locationDetail.textContent = show.location;

    locationElement.appendChild(locationLabel);
    locationElement.appendChild(locationDetail);

    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('shows__btn-wrapper');

    const buyButton = document.createElement('button');
    buyButton.classList.add('shows__btn');
    buyButton.textContent = 'Buy Tickets';

    buttonWrapper.appendChild(buyButton);

    showItem.appendChild(dateElement);
    showItem.appendChild(placeElement);
    showItem.appendChild(locationElement);
    showItem.appendChild(buttonWrapper);

    showsListContainer.appendChild(showItem);

    showItem.addEventListener('click', () => {
        if (selectedShowItem) {
            selectedShowItem.classList.remove('shows__item--selected');
        }
        showItem.classList.add('shows__item--selected');
        selectedShowItem = showItem;
    });
    
}

let showDates = new BandSiteApi("e72a5484-dff3-4315-ac2b-23edc696c942");

//returns a promise after awaiting the get request
console.log(showDates.getShows());


async function displayShows() {
    try {
        // this displays the shows in an array 
      const shows = await showDates.getShows();
      
      console.log(shows);
      shows.forEach((show) => {
        createShow(show)});

    } catch (error) {
      console.error('Error retrieving shows:', error);
    }
  }
  
  displayShows();