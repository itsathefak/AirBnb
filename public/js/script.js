"use strict";

// Bootstrap validation logic
window.addEventListener(
  "load",
  function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName("needs-validation");

    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  },
  false
);

// Newsletter form submission logic
document
  .getElementById("newsletter-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const successMessage = document.getElementById("success-message");
    const errorMessage = document.getElementById("error-message");

    successMessage.style.display = "none";
    errorMessage.style.display = "none";

    try {
      const response = await fetch("/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        successMessage.style.display = "block";
        document.getElementById("email").value = ""; // Clear email input
      } else {
        const errorData = await response.json();
        errorMessage.textContent = errorData.message || "Failed to subscribe.";
        errorMessage.style.display = "block";
      }
    } catch (error) {
      errorMessage.textContent = "An unexpected error occurred.";
      errorMessage.style.display = "block";
    }
  });
