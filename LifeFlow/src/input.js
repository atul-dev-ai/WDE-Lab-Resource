const btn = document.getElementById("menu-btn");
const menu = document.getElementById("mobile-menu");
const icon = btn.querySelector("i");

// মেনু টগল ফাংশন
btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");

  // আইকন চেঞ্জ লজিক
  if (menu.classList.contains("hidden")) {
    icon.classList.replace("fa-xmark", "fa-bars");
  } else {
    icon.classList.replace("fa-bars", "fa-xmark");
  }
});

// উইন্ডো রিসাইজ হ্যান্ডেলার (মোবাইল মেনু রিসেট করার জন্য)
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    // md: 768px
    menu.classList.add("hidden");
    icon.classList.replace("fa-xmark", "fa-bars");
  }
});

// 1. Logic for Real-time Blood Demand (Bangladesh Context)
const liveDemandEl = document.getElementById("liveDemand");
const MS_PER_UNIT = 34560; // 2500 units per day logic

function getCurrentDemand() {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.floor((now - midnight) / MS_PER_UNIT);
}

// 2. Generic Count-up Animation for all counters
function animateCounters() {
  const counters = document.querySelectorAll(".stat-counter");
  const speed = 100; // Animation speed

  // First handle the Live Demand specifically
  const targetDemand = getCurrentDemand();
  animateValue(liveDemandEl, 0, targetDemand, 2000);

  // Handle other counters
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    animateValue(counter, 0, target, 2000);
  });
}

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(
      progress * (end - start) + start,
    ).toLocaleString();
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// 3. Live Ticking for the main demand counter
function startLiveTicking() {
  setInterval(() => {
    const currentVal = getCurrentDemand();
    const displayedVal = parseInt(liveDemandEl.innerText.replace(/,/g, ""));

    if (currentVal > displayedVal) {
      liveDemandEl.innerText = currentVal;
      // Flash effect
      liveDemandEl.classList.add("text-red-600", "scale-110");
      setTimeout(
        () => liveDemandEl.classList.remove("text-red-600", "scale-110"),
        1000,
      );
    }
  }, 5000);
}

window.onload = () => {
  animateCounters();
  startLiveTicking();
};

// Doner section scroll animation

// Data handling
let donors = [
  { name: "Atul Paul", group: "A+", location: "Dhaka", phone: "01700000000" },
  {
    name: "Sifat Ahmed",
    group: "B+",
    location: "Chittagong",
    phone: "01800000000",
  },
  {
    name: "Rahat Kabir",
    group: "O+",
    location: "Dhaka",
    phone: "019XXXXXXXX",
    lastDonate: "1 month ago",
  },
  {
    name: "Nila Islam",
    group: "AB-",
    location: "Sylhet",
    phone: "016XXXXXXXX",
    lastDonate: "3 months ago",
  },
];

// Display Function
function displayDonors(data) {
    const list = document.getElementById('donor-list');
    list.innerHTML = '';
    
    data.forEach(donor => {
        list.innerHTML += `
            <div class="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-lg border border-gray-100 dark:border-gray-700 hover:-translate-y-2 transition-all">
                <div class="flex justify-between items-center mb-6">
                    <div class="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center font-bold text-red-600 dark:text-red-400 text-xl">${donor.group}</div>
                    <span class="text-xs font-bold text-green-500 bg-green-50 px-3 py-1 rounded-full uppercase">Available</span>
                </div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">${donor.name}</h3>
                <p class="text-gray-500 text-sm mt-1"><i class="fa-solid fa-location-dot mr-2"></i>${donor.location}</p>
                <div class="mt-6 pt-6 border-t border-gray-50 dark:border-gray-700 flex justify-between items-center">
                    <span class="text-gray-400 text-xs italic">Verified Donor</span>
                    <a href="tel:${donor.phone}" class="text-red-600 font-bold hover:underline">Call Now</a>
                </div>
            </div>
        `;
    });
}

// Search Logic
function filterDonors() {
    const group = document.getElementById('blood-filter').value;
    const loc = document.getElementById('location-filter').value.toLowerCase();
    
    const filtered = donors.filter(d => 
        (group === 'all' || d.group === group) && d.location.toLowerCase().includes(loc)
    );
    displayDonors(filtered);
}

// Registration Logic
document.getElementById('registration-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newDonor = {
        name: document.getElementById('reg-name').value,
        phone: document.getElementById('reg-phone').value,
        group: document.getElementById('reg-group').value,
        location: document.getElementById('reg-area').value
    };

    donors.unshift(newDonor); // Add to list at the top
    displayDonors(donors);     // Refresh list
    alert("Registration Successful!");
    this.reset();
});

// Initial Load
window.addEventListener('DOMContentLoaded', () => {
    displayDonors(donors);
});

// Donor Registration from here
