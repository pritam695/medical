  const appointments = [
    { doctor: "Dr. Mehta", date: "2025-09-15", time: "10:30 AM" },
    { doctor: "Dr. Sharma", date: "2025-09-20", time: "4:00 PM" }
  ];

  const records = [
    "2025-07-10: Blood Test - Normal",
    "2025-06-20: Prescription for Diabetes",
    "2025-05-05: Annual Health Checkup"
  ];

  // Elements
  const appointmentsModal = document.getElementById('appointments-modal');
  const recordsModal = document.getElementById('records-modal');
  const bookModal = document.getElementById('book-modal');

  const appointmentsList = document.getElementById('appointments-list');
  const recordsList = document.getElementById('records-list');
  const bookForm = document.getElementById('book-form');

  // Open Book Appointment
  document.getElementById('book-appointment').addEventListener('click', () => {
    bookModal.classList.add('active');
  });

  // Handle booking form
  bookForm.addEventListener('submit', e => {
    e.preventDefault();
    const doctor = document.getElementById('doctor').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (!doctor || !date || !time) {
      alert("Please fill all fields!");
      return;
    }

    // Save appointment
    appointments.push({ doctor, date, time });
    alert(`Appointment booked with ${doctor} on ${date} at ${time}`);

    // Close modal
    bookModal.classList.remove('active');
    bookForm.reset();
  });

  // Show appointments
  document.getElementById('my-appointments').addEventListener('click', () => {
    appointmentsList.innerHTML = "";
    if (appointments.length === 0) {
      appointmentsList.innerHTML = "<li>No appointments found.</li>";
    } else {
      appointments.forEach(app => {
        const li = document.createElement("li");
        li.textContent = `${app.date} at ${app.time} with ${app.doctor}`;
        appointmentsList.appendChild(li);
      });
    }
    appointmentsModal.classList.add('active');
  });

  // Show health records
  document.getElementById('health-records').addEventListener('click', () => {
    recordsList.innerHTML = "";
    if (records.length === 0) {
      recordsList.innerHTML = "<li>No records available.</li>";
    } else {
      records.forEach(r => {
        const li = document.createElement("li");
        li.textContent = r;
        recordsList.appendChild(li);
      });
    }
    recordsModal.classList.add('active');
  });

  // Close modal
  document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const modalId = e.target.getAttribute('data-close');
      document.getElementById(modalId).classList.remove('active');
    });
  });

  // Close when clicking outside modal content
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.remove('active');
    });
  });