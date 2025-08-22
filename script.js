const body = document.body;

// Heading
const heading = document.createElement("h3");
heading.id = "h";
heading.innerText =
  "Please click on the identical tiles to verify that you are not a robot.";
body.appendChild(heading);

// Container for images
const container = document.createElement("div");
body.appendChild(container);

let resetBtn, verifyBtn, resultPara;
let images = [];
let selected = [];

// Shuffle helper
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
    const img = document.createElement("img");
    img.className = cls;
    img.setAttribute("data-ns-test", cls);
    img.dataset.index = index;

    img.addEventListener("click", () => handleClick(cls, index));
    container.appendChild(img);
  });
}

function handleClick(cls, index) {
  if (selected.length === 2) return;
  if (selected.some((s) => s.index === index)) return; // prevent double click

  selected.push({ cls, index });

  if (!resetBtn) {
    resetBtn = document.createElement("button");
    resetBtn.id = "reset";
    resetBtn.innerText = "Reset";
    resetBtn.onclick = generateImages;
    body.appendChild(resetBtn);
  }

  if (selected.length === 2 && !verifyBtn) {
    verifyBtn = document.createElement("button");
    verifyBtn.id = "btn"; // IMPORTANT: test expects #btn
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

generateImages();
