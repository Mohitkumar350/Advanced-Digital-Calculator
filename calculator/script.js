  // ---- DOM Elements ----
const display = document.getElementById('display');
const toggleAdvancedBtn = document.getElementById('toggleAdvanced');
const advancedSection = document.getElementById('advanced');
const shareBtn = document.getElementById('shareWhatsApp');
const calculator = document.querySelector('.calculator');

// ---- Append Values to Display ----
function append(value) {
  display.value += value;
}

// ---- Append Trigonometric and Log functions ----
function appendTrig(func) {
  display.value += func;
}

// ---- Append Pi ----
function appendPi() {
  display.value += Math.PI.toFixed(6); // Use fixed value for better readability
}

// ---- Clear Display ----
function clearDisplay() {
  display.value = '';
}

// ---- Delete Last Character ----
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// ---- Calculate Result ----
function calculate() {
  try {
    // Replace math functions for eval()
    let expression = display.value
      .replace(/sin\(/g, 'Math.sin(')
      .replace(/cos\(/g, 'Math.cos(')
      .replace(/tan\(/g, 'Math.tan(')
      .replace(/sqrt\(/g, 'Math.sqrt(')
      .replace(/log\(/g, 'Math.log10('); // Base-10 log

    display.value = eval(expression);
  } catch {
    display.value = 'Error';
  }
}

// ---- Toggle Advanced Section ----
toggleAdvancedBtn.addEventListener('click', () => {
  if (advancedSection.style.display === 'grid') {
    advancedSection.style.display = 'none';
    toggleAdvancedBtn.textContent = 'Show Advanced';
  } else {
    advancedSection.style.display = 'grid';
    toggleAdvancedBtn.textContent = 'Hide Advanced';
  }
});

// ---- WhatsApp Share ----
shareBtn.addEventListener('click', () => {
  const text = `Here is my calculation result: ${display.value}`;
  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
});

// ---- Dark/Light Mode Toggle ----
const modeToggle = document.createElement('button');
modeToggle.textContent = '🌙 Light Mode';
modeToggle.style.width = '100%';
modeToggle.style.marginBottom = '10px';
modeToggle.style.padding = '10px';
modeToggle.style.fontWeight = 'bold';
modeToggle.style.background = '#222';
modeToggle.style.color = '#fff';
modeToggle.style.border = 'none';
modeToggle.style.borderRadius = '8px';
modeToggle.style.cursor = 'pointer';
modeToggle.style.boxShadow = '0 0 6px #00f7ff';

// Insert mode toggle button at the top of calculator
calculator.insertBefore(modeToggle, calculator.firstChild);

modeToggle.addEventListener('click', () => {
  calculator.classList.toggle('light-mode');
  if (calculator.classList.contains('light-mode')) {
    modeToggle.textContent = '🌙 Dark Mode';
    modeToggle.style.background = '#ddd';
    modeToggle.style.color = '#000';
  } else {
    modeToggle.textContent = '🌙 Light Mode';
    modeToggle.style.background = '#222';
    modeToggle.style.color = '#fff';
  }
});

// ---- Keyboard Support ----
document.addEventListener('keydown', (e) => {
  if (!isNaN(e.key) || ['+', '-', '*', '/', '.', '(', ')', '%'].includes(e.key)) {
    append(e.key);
  } else if (e.key === 'Enter') {
    calculate();
  } else if (e.key === 'Backspace') {
    deleteLast();
  }
});
