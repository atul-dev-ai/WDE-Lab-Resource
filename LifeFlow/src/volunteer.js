document
  .getElementById("volunteerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // নতুন ভলান্টিয়ার অবজেক্ট
    const newVolunteer = {
      name: document.getElementById("v-name").value,
      phone: document.getElementById("v-phone").value,
      area: document.getElementById("v-area").value,
      time: document.getElementById("v-time").value,
    };

    // আগের জমানো ভলান্টিয়ার লিস্ট নিয়ে আসা (যদি থাকে)
    let volunteers = JSON.parse(localStorage.getItem("volunteerList")) || [];
    volunteers.unshift(newVolunteer); // নতুনজনকে শুরুতে যোগ করা

    // আবার localStorage-এ সেভ করা
    localStorage.setItem("volunteerList", JSON.stringify(volunteers));

    Swal.fire({
      title: "Application Received!",
      text: `Hi ${newVolunteer.name}, your info is saved locally.`,
      icon: "success",
      confirmButtonColor: "#dc2626",
    }).then(() => {
      window.location.href = "index.html";
    });
  });
