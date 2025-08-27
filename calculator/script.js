 const display = document.getElementById('display');

function append(value) {
  display.value += value;
}

function appendTrig(func) {
  display.value += func;
}

function clearDisplay() {
  display.value = '';
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    display.value = eval(display.value.replace(/sin\(/g, "Math.sin(")
                                       .replace(/cos\(/g, "Math.cos(")
                                       .replace(/tan\(/g, "Math.tan(")
                                       .replace(/sqrt\(/g, "Math.sqrt("));
  } catch {
    display.value = 'Error';
  }
}

/* WhatsApp Share */
document.getElementById("shareWhatsApp").addEventListener("click", function() {
  const url = window.location.href;
  const text = "Check out this awesome calculator: " + url;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
});
