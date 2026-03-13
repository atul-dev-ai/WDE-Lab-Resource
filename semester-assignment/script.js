// Theme Toggle Logic
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = themeToggleBtn.querySelector("i");

// Check for saved user preference in local storage
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-theme");
  themeIcon.classList.replace("fa-moon", "fa-sun");
}

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  if (document.body.classList.contains("dark-theme")) {
    themeIcon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
  }
});

// Mobile Menu Toggle (Basic implementation)
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
  navLinks.style.flexDirection = "column";
  navLinks.style.position = "absolute";
  navLinks.style.top = "80px";
  navLinks.style.left = "0";
  navLinks.style.width = "100%";
  navLinks.style.backgroundColor = "var(--surface-color)";
  navLinks.style.padding = "20px";
  navLinks.style.boxShadow = "0 10px 10px rgba(0,0,0,0.1)";
});

// Dummy function for Search Button to prevent errors
// function filterDonors() {
//   Swal.fire({
//     title: "Searching...",
//     text: "Looking for donors in your area!",
//     icon: "info",
//     confirmButtonColor: "#dc2626",
//   });
// }


// Dummy Donors Data
const donorsData = [
  { name: "Rahim Uddin", group: "A+", location: "Mirpur, Dhaka", phone: "01700000001", lastDonation: "2 months ago" },
  { name: "Sanjida Akter", group: "O+", location: "Manikganj", phone: "01700000002", lastDonation: "Ready to donate" },
  { name: "Karim Hassan", group: "B+", location: "Uttara, Dhaka", phone: "01700000003", lastDonation: "4 months ago" },
  { name: "Atul Paul", group: "AB+", location: "Savar, Dhaka", phone: "01609398958", lastDonation: "1 month ago" },
  { name: "Rafiq Islam", group: "A-", location: "Gulshan, Dhaka", phone: "01700000005", lastDonation: "Ready to donate" },
  { name: "Mahmud Ali", group: "O-", location: "Mohammadpur, Dhaka", phone: "01700000006", lastDonation: "5 months ago" }
];

// Function to render donors
function renderDonors(donors) {
  const donorList = document.getElementById('donor-list');
  donorList.innerHTML = ''; // Clear previous list
  
  if(donors.length === 0) {
    donorList.innerHTML = '<p style="text-align:center; grid-column: 1/-1; color: var(--text-secondary); font-weight: bold; padding: 20px;">No donors found matching your criteria. Try another location or blood group.</p>';
    return;
  }

  donors.forEach(donor => {
    const card = document.createElement('div');
    card.className = 'donor-card';
    card.innerHTML = `
      <div class="donor-header">
        <div class="donor-info">
          <h3>${donor.name}</h3>
          <p><i class="fa-solid fa-location-dot" style="color: var(--primary-color);"></i> ${donor.location}</p>
        </div>
        <div class="blood-badge">${donor.group}</div>
      </div>
      <div class="donor-footer">
        <span class="last-donate"><i class="fa-regular fa-clock"></i> ${donor.lastDonation}</span>
        <a href="tel:${donor.phone}" class="contact-btn"><i class="fa-solid fa-phone"></i> Call</a>
      </div>
    `;
    donorList.appendChild(card);
  });
}

// Initial load all dummy donors
document.addEventListener("DOMContentLoaded", () => {
  renderDonors(donorsData);
});

// Search Filter Logic
function filterDonors() {
  const bloodGroup = document.getElementById('blood-filter').value;
  const location = document.getElementById('location-filter').value.toLowerCase().trim();

  const filteredData = donorsData.filter(donor => {
    // Check blood group (if 'all' is selected, return true)
    const matchBlood = (bloodGroup === 'all') || (donor.group === bloodGroup);
    
    // Check location (if empty, return true)
    const matchLocation = donor.location.toLowerCase().includes(location);
    
    return matchBlood && matchLocation;
  });

  renderDonors(filteredData);
}