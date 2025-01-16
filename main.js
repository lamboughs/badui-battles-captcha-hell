const $ = (q, multiple = false) =>
  multiple ? document.querySelectorAll(q) : document.querySelector(q);
const alphaNum =
  "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";

window.onload = () => {
  console.log("ready...");

  let feedback = "Please solve captcha first";
  let captcha = getCaptchaText(captchaLength);
  const captchaLength = 1;

  const feedbackContainer = $(".feedback");
  const captchaContainer = $(".captcha-text");

  const [usernameInput, passwordInput, captchaInput] = $(
    ".form-group input",
    true
  );
  const [verifyButton, loginButton] = $(".form-group button", true);

  disablePasteOnInputs([usernameInput, passwordInput, captchaInput]);

  feedbackContainer.innerHTML = feedback;
  captchaContainer.innerHTML = captcha;

  verifyButton.onclick = () => {
    if (captchaInput.value === captcha) {
      toggleDisabledProperty([usernameInput, passwordInput]);
      verifyButton.innerHTML = "Verified!";
    }
  };

  [usernameInput, passwordInput].forEach((input) => {
    input.onkeyup = () => {
      captcha = getCaptchaText(captchaLength);
      captchaContainer.innerHTML = captcha;
      toggleDisabledProperty([usernameInput, passwordInput]);
      captchaInput.value = "";
      verifyButton.innerHTML = "Verify Captcha";
    };
  });
};

function disablePasteOnInputs(inputs) {
  inputs.forEach((input) => {
    input.onpaste = (pasteEvent) => pasteEvent.preventDefault();
  });
}

function toggleDisabledProperty(inputs) {
  inputs.forEach((input) => {
    input.disabled = !input.disabled;
  });
}

function getCaptchaText(captchaLength) {
  let tmpText = "";
  while (tmpText.length < captchaLength) {
    tmpText += alphaNum[getRandomNumber()];
  }

  return tmpText;
}

const getRandomNumber = () => {
  return Math.floor(Math.random() * alphaNum.length);
};
