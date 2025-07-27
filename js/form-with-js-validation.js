window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const commentsInput = document.getElementById("comments");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const commentsInfo = document.getElementById("comments-info");
  const commentsCounter = document.getElementById("comments-counter");

  const formErrorsField = document.getElementById("form-errors");
  const form_errors = [];

  const namePattern = /^[A-Za-z\s\-']+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showMessage(el, message) {
    el.textContent = message;
    el.style.display = "block";
    el.classList.add("flash-error");
    setTimeout(() => {
      el.style.display = "none";
      el.classList.remove("flash-error");
    }, 3000);
  }

  function recordError(field, type, message) {
    form_errors.push({
      field,
      type,
      message
    });
    formErrorsField.value = JSON.stringify(form_errors);
  }

  // === name validation ===
  nameInput.addEventListener("input", () => {
    const val = nameInput.value.trim();

    if (val === "") {
      nameInput.setCustomValidity("Name is required.");
      showMessage(nameError, "Name is required.");
      recordError("name", "empty", "Name field left empty.");
    } else if (!namePattern.test(val)) {
      nameInput.setCustomValidity("Invalid characters.");
      showMessage(nameError, "Only letters, spaces, hyphens, and apostrophes allowed.");
      recordError("name", "invalid_characters", "Illegal characters in name.");
    } else {
      nameInput.setCustomValidity("");
    }
  });

  // === email validation ===
  emailInput.addEventListener("input", () => {
    const val = emailInput.value.trim();

    if (val === "") {
      emailInput.setCustomValidity("Email is required.");
      showMessage(emailError, "Email is required.");
      recordError("email", "empty", "Email field left empty.");
    } else if (!emailPattern.test(val)) {
      emailInput.setCustomValidity("Invalid email format.");
      showMessage(emailError, "Please enter a valid email address.");
      recordError("email", "format", "Email format incorrect.");
    } else {
      emailInput.setCustomValidity("");
    }
  });

  // === comments validation + character counter ===
  commentsInput.addEventListener("input", () => {
    const val = commentsInput.value.trim();
    const len = val.length;
    const remaining = 450 - len;

    commentsCounter.textContent = `${remaining} characters remaining`;
    commentsCounter.style.color = remaining <= 50 ? "red" : "#444";

    if (val === "") {
      commentsInput.setCustomValidity("Comment is required.");
      showMessage(commentsInfo, "Comment is required.");
      recordError("comments", "empty", "Comments field left empty.");
    } else if (len < 2 || len > 450) {
      commentsInput.setCustomValidity("Comment must be between 2 and 450 characters.");
      showMessage(commentsInfo, "Enter a comment between 2 and 450 characters.");
      recordError("comments", "length", `Comment too ${len < 2 ? "short" : "long"}.`);
    } else {
      commentsInput.setCustomValidity("");
    }
  });

  // === submit ===
  form.addEventListener("submit", (e) => {
    const currentErrors = [];

    if (!nameInput.checkValidity()) {
      currentErrors.push({ field: "name", message: nameInput.validationMessage });
    }
    if (!emailInput.checkValidity()) {
      currentErrors.push({ field: "email", message: emailInput.validationMessage });
    }
    if (!commentsInput.checkValidity()) {
      currentErrors.push({ field: "comments", message: commentsInput.validationMessage });
    }

    currentErrors.forEach(err => {
      recordError(err.field, "submit_check", err.message);
    });

    if (currentErrors.length > 0) {
      e.preventDefault();
    } else {
      formErrorsField.value = JSON.stringify(form_errors);
    }
  });
});
