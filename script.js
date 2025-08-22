const body = document.body;

// Create heading
const heading = document.createElement("h3");
heading.id = "h";
heading.innerText =
  "Please click on the identical tiles to verify that you are not a robot.";
body.appendChild(heading);

// Container for images
const container = document.createElement("div");
container.style.display = "grid";
container.style.gridTemplateColumns = "repeat(3, 100px)";
container.style.gap = "10px";
body.appendChild(container);

// Buttons and result paragraph
let resetBtn, verifyBtn, resultPara;

let images = [];
let selected = [];

// Utility: Shuffle array
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generate 6 images (5 unique + 1 duplicate)
function generateImages() {
  container.innerHTML = "";
  if (resetBtn) resetBtn.remove();
  if (verifyBtn) verifyBtn.remove();
  if (resultPara) resultPara.remove();

  selected = [];

  const classes = ["img1", "img2", "img3", "img4", "img5"];
  const dupIndex = Math.floor(Math.random() * 5);
  const duplicateClass = classes[dupIndex];

  images = [...classes, duplicateClass];
  shuffle(images);

  images.forEach((cls, index) => {
    const div = document.createElement("div");
    div.className = cls; // CSS from styles.css will apply
    div.dataset.index = index;

    div.addEventListener("click", () => handleClick(cls, index));
    container.appendChild(div);
  });
}

function handleClick(cls, index) {
  if (selected.length === 2) return;

  // prevent double clicking same tile
  if (selected.some((s) => s.index === index)) return;

  selected.push({ cls, index });

  // Show reset button if not already
  if (!resetBtn) {
    resetBtn = document.createElement("button");
    resetBtn.id = "reset";
    resetBtn.innerText = "Reset";
    resetBtn.onclick = generateImages;
    body.appendChild(resetBtn);
  }

  // Show verify only when exactly 2 selected
  if (selected.length === 2 && !verifyBtn) {
    verifyBtn = document.createElement("button");
    verifyBtn.id = "verify";
    verifyBtn.innerText = "Verify";
    verifyBtn.onclick = handleVerify;
    body.appendChild(verifyBtn);
  }
}

function handleVerify() {
  if (verifyBtn) verifyBtn.remove();

  resultPara = document.createElement("p");
  resultPara.id = "para";

  if (selected[0].cls === selected[1].cls) {
    resultPara.innerText = "You are a human. Congratulations!";
  } else {
    resultPara.innerText =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  body.appendChild(resultPara);
}

// Initialize
generateImages();
