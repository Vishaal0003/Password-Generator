function generatePassword() {
  const length = parseInt(document.getElementById("length").value);
  const includeLower = document.getElementById("includeLower").checked;
  const includeUpper = document.getElementById("includeUpper").checked;
  const includeNumbers = document.getElementById("includeNumbers").checked;
  const includeSymbols = document.getElementById("includeSymbols").checked;
  const useName = document.getElementById("useName").checked;
  const userName = document.getElementById("userName").value.trim();

  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+{}[]<>?/|";

  let characters = "";
  if (includeLower) characters += lower;
  if (includeUpper) characters += upper;
  if (includeNumbers) characters += numbers;
  if (includeSymbols) characters += symbols;

  if (characters === "" && (!useName || userName.length === 0)) {
    document.getElementById("passwordOutput").textContent = "⚠️ No Option Selected!";
    document.getElementById("strengthBar").style.width = "0%";
    document.getElementById("strengthText").textContent = "Strength: N/A";
    return;
  }

  let password = "";

  // Include name at the start if checked
  if (useName && userName.length > 0) {
    const namePart = userName.charAt(0).toUpperCase() + userName.slice(1);
    password += namePart;

    // Fill rest with random chars
    for (let i = password.length; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
  } else {
    // Normal random password
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
  }

  document.getElementById("passwordOutput").textContent = password;
  evaluateStrength(password);
}

function copyPassword() {
  const password = document.getElementById("passwordOutput").textContent;
  if (password && password !== "Click Generate") {
    navigator.clipboard.writeText(password);
    alert("✅ Password copied to clipboard!");
  }
}

function toggleNameInput() {
  const checkbox = document.getElementById("useName");
  const nameInput = document.getElementById("userName");
  nameInput.style.display = checkbox.checked ? "block" : "none";
}

function evaluateStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (password.length >= 12) score++;

  let strength = "", color = "", width = "";
  switch(score) {
    case 0:
    case 1: strength="Very Weak"; color="red"; width="20%"; break;
    case 2: strength="Weak"; color="orange"; width="40%"; break;
    case 3: strength="Medium"; color="yellow"; width="60%"; break;
    case 4: strength="Strong"; color="lightgreen"; width="80%"; break;
    case 5: strength="Very Strong"; color="green"; width="100%"; break;
  }

  document.getElementById("strengthBar").style.width = width;
  document.getElementById("strengthBar").style.background = color;
  document.getElementById("strengthText").textContent = "Strength: " + strength;
}
