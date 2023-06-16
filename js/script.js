let options = document.querySelectorAll(".config input");
const rangeLength = document.querySelector("#range-lenght");
const btn = document.querySelector("#btn");
const res = document.querySelector("#res");
const copyIcon = document.querySelector("#copy-icon");

const patterColor = ["red", "rgb(194, 224, 56)", "rgb(73, 153, 245)"];

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!@#$%&*(){}[],<>:;~",
};

const generatePassword = (rangeValue) => {
  let staticPassword = "";
  let ramdomPassword = "";
  options.forEach((option) => {
    if (option.checked) {
      staticPassword += characters[option.id];
    }
  });

  for (let i = 0; i < rangeValue; i++) {
    ramdomPassword =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    res.innerHTML += `${ramdomPassword}`;
  }

  staticPassword += ramdomPassword;
  copyPassword(staticPassword);
};

const handleMouseMove = () => {
  const rangeColor = document.querySelector("#range");
  let rangeValue = rangeLength.value;
  let colorValue = rangeValue * 4;

  if (rangeValue < 6) {
    rangeColor.style.background = `${patterColor[0]}`;
  } else if (rangeValue < 16) {
    rangeColor.style.background = `${patterColor[1]}`;
  } else {
    rangeColor.style.background = `${patterColor[2]}`;
  }

  rangeColor.style.width = `${colorValue}%`;
  document.querySelector("#lenght").innerHTML = `${rangeValue}`;
  res.innerHTML = "";
  generatePassword(rangeValue);
};

rangeLength.addEventListener("input", () => {
  handleMouseMove();
});

const handleClick = (e) => {
  e.preventDefault();
  handleMouseMove();
  generatePassword();
};

const copyPassword = (staticPassword) => {
  navigator.clipboard.writeText(staticPassword);
};

copyIcon.addEventListener("click", () => {
  copyPassword(res.innerHTML);
});

btn.addEventListener("click", handleClick);

options.forEach((option) => {
  if (option.id === 'lowercase') {
    option.checked = true;
    option.addEventListener('click', (event) => {
      event.preventDefault();
    });
  }
});
