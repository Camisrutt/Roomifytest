// swipe.js

// Variables to manage profiles and state
let profiles = [];
let currentProfileIndex = 0;
let isDragging = false;
let startX = 0;
let currentX = 0;

// DOM Elements
const cardElement = document.getElementById('profile-card');
const container = document.getElementById('swipe-container');

// Fetch profiles from the serverless function
async function fetchProfiles() {
  try {
    const response = await fetch('/api/get_profiles');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    profiles = data.profiles;
    if (profiles.length > 0) {
      loadProfile(profiles[currentProfileIndex]);
    } else {
      cardElement.style.display = 'none';
      alert('No profiles available.');
    }
  } catch (error) {
    console.error('Error fetching profiles:', error);
    alert('Failed to load profiles.');
  }
}

// Load a profile into the card
function loadProfile(profile) {
  const imgElement = cardElement.querySelector('img');
  imgElement.src = profile.image || 'images/default-profile.jpg'; // Use a default image if none provided
  imgElement.alt = profile.name || 'Profile Image';

  cardElement.querySelector('h2').textContent = `${profile.name}, ${profile.age}`;
  const infoParagraphs = cardElement.querySelectorAll('p');
  infoParagraphs[0].innerHTML = `<strong>Occupation:</strong> ${profile.occupation}`;
  infoParagraphs[1].innerHTML = `<strong>Location:</strong> ${profile.location}`;
  infoParagraphs[2].innerHTML = `<strong>About Me:</strong> ${profile.bio}`;
}

// Update the profile card to show the next or previous profile
function updateProfile(index) {
  if (profiles.length === 0) {
    cardElement.style.display = 'none';
    alert('No profiles available.');
    return;
  }

  if (index >= 0 && index < profiles.length) {
    loadProfile(profiles[index]);
    cardElement.style.transform = 'translateX(0) rotate(0)';
    container.classList.remove('like', 'nope');
  } else {
    cardElement.style.display = 'none';
    alert('No more profiles to display.');
  }
}

// Handle the left arrow click (dislike)
document.getElementById('left-arrow').addEventListener('click', () => {
  container.classList.add('nope');
  setTimeout(() => {
    currentProfileIndex = (currentProfileIndex + 1) % profiles.length;
    updateProfile(currentProfileIndex);
    container.classList.remove('nope');
  }, 300);
});

// Handle the right arrow click (like)
document.getElementById('right-arrow').addEventListener('click', () => {
  container.classList.add('like');
  setTimeout(() => {
    currentProfileIndex = (currentProfileIndex + 1) % profiles.length;
    updateProfile(currentProfileIndex);
    container.classList.remove('like');
  }, 300);
});

// Touch and mouse events for card swiping
cardElement.addEventListener('mousedown', startDragging);
cardElement.addEventListener('touchstart', startDragging);
document.addEventListener('mousemove', drag);
document.addEventListener('touchmove', drag);
document.addEventListener('mouseup', stopDragging);
document.addEventListener('touchend', stopDragging);

function startDragging(event) {
  isDragging = true;
  startX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
  currentX = startX;
  cardElement.style.transition = 'none';
}

function drag(event) {
  if (!isDragging) return;

  const x = event.type === 'mousemove' ? event.clientX : event.touches[0].clientX;
  const deltaX = x - startX;
  currentX = x;
  cardElement.style.transform = `translateX(${deltaX}px) rotate(${deltaX * 0.05}deg)`;

  if (deltaX > 0) {
    container.classList.add('like');
    container.classList.remove('nope');
  } else {
    container.classList.add('nope');
    container.classList.remove('like');
  }
}

function stopDragging() {
  if (!isDragging) return;

  isDragging = false;
  const deltaX = currentX - startX;
  cardElement.style.transition = 'transform 0.3s ease';

  if (Math.abs(deltaX) > 100) {
    if (deltaX > 0) {
      document.getElementById('right-arrow').click();
    } else {
      document.getElementById('left-arrow').click();
    }
  } else {
    cardElement.style.transform = 'translateX(0) rotate(0)';
    container.classList.remove('like', 'nope');
  }
}

// Load user name from localStorage
document.addEventListener('DOMContentLoaded', function () {
  fetchProfiles();
  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  if (userData.name) {
    document.getElementById('nav-username').textContent = userData.name.split(' ')[0];
  }
});

// Logout function
function logout() {
  localStorage.removeItem('userData');
  window.location.href = 'login-page.html';
}
