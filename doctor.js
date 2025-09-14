const appointments = [
      { patient: "John Doe", date: "2025-09-15", time: "10:00 AM" },
      { patient: "Jane Smith", date: "2025-09-16", time: "2:00 PM" },
      { patient: "Michael Johnson", date: "2025-09-17", time: "11:30 AM" },
    ];

    const medicalHistory = [
      "2024-12-15: Flu vaccination",
      "2024-10-10: Blood test - normal",
      "2024-08-05: Diagnosed with mild asthma",
      "2024-05-20: Annual physical exam",
    ];

    const modalAppointment = document.getElementById('modal-appointment');
    const modalConsult = document.getElementById('modal-consult');
    const modalUpload = document.getElementById('modal-upload');
    const modalHistory = document.getElementById('modal-history');

    const appointmentList = document.getElementById('appointment-list');
    const historyList = document.getElementById('history-list');

    const consultForm = document.getElementById('consult-form');
    const consultMessage = document.getElementById('consult-message');

    const uploadForm = document.getElementById('upload-form');
    const uploadMessage = document.getElementById('upload-message');

    function openModal(modal) { modal.classList.add('active'); }
    function closeModal(modal) { modal.classList.remove('active'); }

    function populateAppointments() {
      appointmentList.innerHTML = '';
      if (appointments.length === 0) {
        appointmentList.innerHTML = '<li>No upcoming appointments.</li>';
      } else {
        appointments.forEach(app => {
          const li = document.createElement('li');
          li.textContent = `${app.date} at ${app.time} - Patient: ${app.patient}`;
          appointmentList.appendChild(li);
        });
      }
    }

    function populateHistory() {
      historyList.innerHTML = '';
      if (medicalHistory.length === 0) {
        historyList.innerHTML = '<li>No medical history found.</li>';
      } else {
        medicalHistory.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          historyList.appendChild(li);
        });
      }
    }

    document.getElementById('view-appointment').addEventListener('click', () => { populateAppointments(); openModal(modalAppointment); });
    document.getElementById('consult-patient').addEventListener('click', () => { consultForm.reset(); consultMessage.style.display = 'none'; openModal(modalConsult); });
    document.getElementById('upload-prescription').addEventListener('click', () => { uploadForm.reset(); uploadMessage.style.display = 'none'; openModal(modalUpload); });
    document.getElementById('view-medical-history').addEventListener('click', () => { populateHistory(); openModal(modalHistory); });

    document.querySelectorAll('.close-btn').forEach(btn => {
      btn.addEventListener('click', e => closeModal(e.target.closest('.modal')));
    });

    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', e => { if (e.target === modal) closeModal(modal); });
    });

    consultForm.addEventListener('submit', e => {
      e.preventDefault();
      consultMessage.style.display = 'block';
      consultForm.reset();
    });

    uploadForm.addEventListener('submit', e => {
      e.preventDefault();
      const fileInput = document.getElementById('prescription-file');
      if (fileInput.files.length === 0) { alert('Please select a file to upload.'); return; }
      const fileName = fileInput.files[0].name;
      uploadMessage.textContent = `Prescription "${fileName}" uploaded successfully!`;
      uploadMessage.style.display = 'block';
      uploadForm.reset();
    });