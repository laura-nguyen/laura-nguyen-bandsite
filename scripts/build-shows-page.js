import BandSiteApi from "./band-site-api.js";

const showsList = [
    {
        date: "Mon Sept 09 2024",
        venue: "Ronald Lane",
        location: "San Francisco, CA",
    },
    {
        date: "Tue Sept 17 2024",
        venue: "Pier 3 East",
        location: "San Francisco, CA",
    },
    {
        date: "Sat Oct 12 2024",
        venue: "View Lounge",
        location: "San Francisco, CA",
    },
    {
        date: "Sat Nov 16 2024",
        venue: "Hyatt Agency",
        location: "San Francisco, CA",
    },
    {
        date: "Fri Nov 29 2024",
        venue: "Moscow Center",
        location: "San Francisco, CA",
    },
    {
        date: "Wed Dec 18 2024",
        venue: "Press Club",
        location: "San Francisco, CA",
    }

];

const showsListContainer = document.getElementById('shows__list');
let selectedShowItem = null;

// instead of a hardcoded showeach, retrieve list 

showsList.forEach(show => {
 
    const showItem = document.createElement('div');
    showItem.classList.add('shows__item');

    const dateElement = document.createElement('div');
    dateElement.classList.add('shows__item-detail');

    const dateLabel = document.createElement('h4');
    dateLabel.classList.add('shows__label--mobile');
    dateLabel.textContent = 'Date';

    const dateDetail = document.createElement('p');
    dateDetail.classList.add('shows__item-text', 'shows__item-text--date');
    dateDetail.textContent = show.date;

    dateElement.appendChild(dateLabel);
    dateElement.appendChild(dateDetail);

    const venueElement = document.createElement('div');
    venueElement.classList.add('shows__item-detail');

    const venueLabel = document.createElement('h4');
    venueLabel.classList.add('shows__label--mobile');
    venueLabel.textContent = 'Venue';

    const venueDetail = document.createElement('p');
    venueDetail.classList.add('shows__item-text');
    venueDetail.textContent = show.venue;

    venueElement.appendChild(venueLabel);
    venueElement.appendChild(venueDetail);

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
    showItem.appendChild(venueElement);
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
    
})



