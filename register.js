const patientTab = document.getElementById("patientTab");
    const doctorTab = document.getElementById("doctorTab");
    const patientForm = document.getElementById("patientForm");
    const doctorForm = document.getElementById("doctorForm");

    // Tab Switching
    patientTab.addEventListener("click", () => {
      patientTab.classList.add("active");
      doctorTab.classList.remove("active");
      patientForm.classList.add("active");
      doctorForm.classList.remove("active");
    });

    doctorTab.addEventListener("click", () => {
      doctorTab.classList.add("active");
      patientTab.classList.remove("active");
      doctorForm.classList.add("active");
      patientForm.classList.remove("active");
    });

    // Patient Registration
    patientForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Patient Registered: " + document.getElementById("p_username").value);
       window.location.href = "patient.html";
    });


    // Doctor Registration
    doctorForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Doctor Registered: " + document.getElementById("d_username").value);
      window.location.href = "doctor.html";
    });