// 1. Mobile Menu Logic
const btn = document.getElementById("menu-btn");
const menu = document.getElementById("mobile-menu");
const icon = btn.querySelector("i");

btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
  if (menu.classList.contains("hidden")) {
    icon.classList.replace("fa-xmark", "fa-bars");
  } else {
    icon.classList.replace("fa-bars", "fa-xmark");
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    menu.classList.add("hidden");
    icon.classList.replace("fa-xmark", "fa-bars");
  }
});

// 2. Statistics & Live Demand Logic
const liveDemandEl = document.getElementById("liveDemand");
const MS_PER_UNIT = 34560; // Logic for 2500 units/day

function getCurrentDemand() {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.floor((now - midnight) / MS_PER_UNIT);
}

function animateValue(obj, start, end, duration) {
  if (!obj) return;
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(
      progress * (end - start) + start,
    ).toLocaleString();
    if (progress < 1) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
}

function animateCounters() {
  const counters = document.querySelectorAll(".stat-counter");
  const targetDemand = getCurrentDemand();
  animateValue(liveDemandEl, 0, targetDemand, 2000);

  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    animateValue(counter, 0, target, 2000);
  });
}

// 3. Donor Data & Display Logic
let donors = [
  { name: "Atul Paul", group: "A+", location: "Dhaka", phone: "01700000000" },
  {
    name: "Sifat Ahmed",
    group: "B+",
    location: "Chittagong",
    phone: "01800000000",
  },
  { name: "Rahat Kabir", group: "O+", location: "Dhaka", phone: "019XXXXXXXX" },
  {
    name: "Nila Islam",
    group: "AB-",
    location: "Sylhet",
    phone: "016XXXXXXXX",
  },
];

function displayDonors(data) {
  const list = document.getElementById("donor-list");
  if (!list) return;
  list.innerHTML = "";

  data.forEach((donor) => {
    list.innerHTML += `
            <div class="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-lg border border-gray-100 dark:border-gray-700 hover:-translate-y-2 transition-all duration-300">
                <div class="flex justify-between items-center mb-6">
                    <div class="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center font-bold text-red-600 dark:text-red-400 text-xl hover:bg-red-200 dark:hover:bg-red-800">${donor.group}</div>
                    <span class="text-xs font-bold text-green-500 bg-green-50 px-3 py-1 rounded-full uppercase">Available</span>
                </div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">${donor.name}</h3>
                <p class="text-gray-500 text-sm mt-1"><i class="fa-solid fa-location-dot mr-2"></i>${donor.location}</p>
                <div class="mt-6 pt-6 border-t border-gray-50 dark:border-gray-700 flex justify-between items-center">
                    <span class="text-gray-400 text-xs italic">Verified Donor</span>
                    <a href="tel:${donor.phone}" class="text-red-600 font-bold hover:underline hover:scale-105 transition-all">Call Now</a>
                </div>
            </div>`;
  });
}

// 4. Search & Registration Logic
function filterDonors() {
  const group = document.getElementById("blood-filter").value;
  const loc = document.getElementById("location-filter").value.toLowerCase();
  const filtered = donors.filter(
    (d) =>
      (group === "all" || d.group === group) &&
      d.location.toLowerCase().includes(loc),
  );
  displayDonors(filtered);
}

const regForm = document.getElementById("registration-form");
if (regForm) {
  regForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("reg-name").value;
    const phone = document.getElementById("reg-phone").value;
    const group = document.getElementById("reg-group").value;
    const location = document.getElementById("reg-area").value;

    donors.unshift({ name, phone, group, location });
    displayDonors(donors);

    // Modern Popup
    Swal.fire({
      title: "Registration Successful!",
      text: `Thank you ${name}, for joining LifeFlow.`,
      icon: "success",
      confirmButtonColor: "#dc2626",
      background: document.documentElement.classList.contains("dark")
        ? "#1f2937"
        : "#fff",
      color: document.documentElement.classList.contains("dark")
        ? "#fff"
        : "#000",
    });
    this.reset();
  });
}

// 5. Initializations
window.onload = () => {
  displayDonors(donors);
  animateCounters();

  // Live ticking demand
  setInterval(() => {
    const currentVal = getCurrentDemand();
    if (liveDemandEl) {
      liveDemandEl.innerText = currentVal.toLocaleString();
    }
  }, 5000);
};
function loadVolunteers() {
  const container = document.getElementById("dynamic-volunteers");
  if (!container) return;

  const storedVolunteers =
    JSON.parse(localStorage.getItem("volunteerList")) || [];
  container.innerHTML = ""; // Clear previous dynamic content

  storedVolunteers.forEach((vol) => {
    const card = `
            <div class="group relative bg-gray-50 dark:bg-gray-900 p-6 rounded-[2rem] text-center border border-gray-100 dark:border-gray-700 hover:border-red-500 transition-all duration-300">
                <div class="relative w-32 h-32 mx-auto mb-6">
                    <div class="absolute inset-0 bg-red-600 rounded-full rotate-6 group-hover:rotate-12 transition-transform"></div>
                    <img src="https://ui-avatars.com/api/?name=${vol.name.replace(/\s+/g, "+")}&background=random" class="relative w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-lg">
                </div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">${vol.name}</h3>
                <p class="text-red-600 font-semibold text-sm mb-4 tracking-wider uppercase">${vol.area}</p>
                <div class="text-gray-400 text-xs">Available: ${vol.time}</div>
            </div>`;
    container.innerHTML += card;
  });
}

// Call this inside window.onload or DOMContentLoaded
window.addEventListener("DOMContentLoaded", loadVolunteers);