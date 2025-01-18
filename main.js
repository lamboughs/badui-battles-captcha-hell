const $ = (q, multiple = false) =>
  multiple ? document.querySelectorAll(q) : document.querySelector(q);
const alphaNum =
  "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";

window.onload = () => {
  console.log("ready...");

  const captchaLength = 6;
  const validLength = 4;
  let feedback = "Please solve the captcha first";
  let captcha = getCaptchaText(captchaLength);
  let isLoginButtonDisabled = false;

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
      feedbackContainer.innerHTML = "Captcha verified! You can now login";
    } else {
      feedbackContainer.innerHTML = "Incorrect Captcha";
    }
  };
  
  [usernameInput, passwordInput].forEach((input) => {
    input.onkeyup = () => {
      captcha = getCaptchaText(captchaLength);
      captchaContainer.innerHTML = captcha;
      toggleDisabledProperty([usernameInput, passwordInput]);
      captchaInput.value = "";
      verifyButton.innerHTML = "Verify Captcha";
      feedbackContainer.innerHTML = "Please solve the captcha first";

      
      if(input.value.length >= validLength) {
        isLoginButtonDisabled = !isLoginFieldsValid(usernameInput.value, passwordInput.value, validLength);
        loginButton.disabled = isLoginButtonDisabled;
      }
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

const isLoginFieldsValid = (username, password, validLength) => {
  if(username.length >= validLength && password.length >= validLength) {
    return true;
  }

  return false;
}
