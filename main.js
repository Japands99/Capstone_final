let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

const sr = ScrollReveal({
    distance: '60px',
    duration: 2500,
    delay: 400,
    reset: true
})

sr.reveal('.text',{delay: 200, origin: 'top'})
sr.reveal('.from-container from',{delay: 800, origin: 'left'})
sr.reveal('.heading',{delay: 800, origin: 'top'})
sr.reveal('.rent-container .box',{delay: 600, origin: 'top'})
sr.reveal('.services-container .box',{delay: 600, origin: 'top'})
sr.reveal('.about-container .box',{delay: 600, origin: 'top'})
sr.reveal('.reviews-container .box',{delay: 600, origin: 'top'})
sr.reveal('.newsletter .box',{delay: 400, origin: 'bottom'})


document.addEventListener('DOMContentLoaded', function () {
    const reviewForm = document.getElementById('review-form');
    const reviewInput = document.getElementById('review-input');
    const reviewListUl = document.getElementById('review-list-ul');
  
    reviewForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const reviewText = reviewInput.value.trim(); 
  
      if (reviewText) {

        const reviewItem = document.createElement('li');
        reviewItem.textContent = reviewText;
  

        reviewListUl.appendChild(reviewItem);
  

        reviewInput.value = '';

        reviewItem.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  document.addEventListener("DOMContentLoaded", function() {
    const dropdownBtn = document.getElementById("dropdownBtn");
    const dropdownContent = document.getElementById("dropdownContent");

    // Toggle the dropdown menu when the button is clicked
    dropdownBtn.addEventListener("click", function() {
        dropdownContent.classList.toggle("show");
    });

    // Close the dropdown menu when clicking outside of it
    window.addEventListener("click", function(event) {
        if (!event.target.matches("#dropdownBtn")) {
            if (dropdownContent.classList.contains("show")) {
                dropdownContent.classList.remove("show");
            }
        }
    });

    // Add click event listeners for each menu item
    const myProfile = document.getElementById("myProfile");
    const settings = document.getElementById("settings");
    const inbox = document.getElementById("inbox");
    const editProfile = document.getElementById("editProfile");
    const help = document.getElementById("help");
    const logout = document.getElementById("logout");

    myProfile.addEventListener("click", function() {
        // Handle the "My Profile" action here
        alert("My Profile clicked");
    });

    settings.addEventListener("click", function() {
        // Handle the "Settings" action here
        alert("Settings clicked");
    });

    inbox.addEventListener("click", function() {
        // Handle the "Inbox" action here
        alert("Inbox clicked");
    });

    editProfile.addEventListener("click", function() {
        // Handle the "Edit Profile" action here
        alert("Edit Profile clicked");
    });

    help.addEventListener("click", function() {
        // Handle the "Help" action here
        alert("Help clicked");
    });

    logout.addEventListener("click", function() {
        const logoutBtn = document.querySelector('.logout-btn');
    });
});

// Get a NodeList of all buttons with the "btn" class inside the "services-container"
var modalButtons = document.querySelectorAll('.services-container .btn.showModal');

// Loop through the NodeList and add a click event listener to each button
modalButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        // Get the modal element corresponding to the clicked button
        var modalId = button.getAttribute('data-modal-target');
        var modal = document.getElementById(modalId);

        if (modal) {
            modal.style.display = 'block'; // Display the modal
        }
    });
});

// Get the modal element
var modal = document.getElementById('popupModal');

// Close the modal when the close button is clicked
var closeModal = document.getElementById('closeModal');
closeModal.addEventListener('click', function () {
    modal.style.display = 'none';
});

// Close the modal when the user clicks outside of it
window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
