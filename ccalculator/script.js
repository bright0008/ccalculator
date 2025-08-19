// Get display element
const display = document.querySelector(".display-box h1");
let currentInput = "";

// Update display
function updateDisplay() {
    display.innerText = currentInput || "0";
}

// Handle button clicks
function handleButton(value) {
    if (value === "C") {
        currentInput = "";
    } else if (value === "⌫") {
        currentInput = currentInput.slice(0, -1);
    } else if (value === "=") {
        try {
            currentInput = eval(
                currentInput.replace(/x/g, "*").replace(/÷/g, "/")
            ).toString();
        } catch {
            currentInput = "Error";
        }
    } else {
        currentInput += value;
    }
    updateDisplay();
}

// Attach click listeners
document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
        let value = button.innerText.trim();

        if (button.classList.contains("button2")) {
            value = "⌫"; // backspace button
        }

        handleButton(value);
    });
});

// Keyboard support
document.addEventListener("keydown", e => {
    if (!isNaN(e.key) || ["+", "-", "*", "/", "."].includes(e.key)) {
        currentInput += e.key;
    } else if (e.key === "Enter") {
        try {
            currentInput = eval(currentInput).toString();
        } catch {
            currentInput = "Error";
        }
    } else if (e.key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
    } else if (e.key.toLowerCase() === "c") {
        currentInput = "";
    }
    updateDisplay();
});

// Initialize display
updateDisplay();