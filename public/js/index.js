document.addEventListener("DOMContentLoaded", () => {
  /*
   * Multilingual dropdown list
   */

  $(document).ready(function () {
    $("a.dropdown-a").on("click", function (e) {
      e.preventDefault();
    });
    $(".dropdown-li").hover(
      function () {
        clearTimeout($.data(this, "timer"));
        $("ul, .disabled_langs", this).stop(true, true).slideDown(200);
      },
      function () {
        $.data(
          this,
          "timer",
          setTimeout(
            $.proxy(function () {
              $("ul, .disabled_langs, .disabled_langs_mob", this)
                .stop(true, true)
                .slideUp(200);
            }, this),
            100
          )
        );
      }
    );
  });

  /*
   * Video for mobile version
   */
  const windowInnerWidth = window.innerWidth;

  if (windowInnerWidth <= 475) {
    let movie = document.querySelector("video");
    // change "#" to video path
    movie.setAttribute(
      "src",
      "https://helloafrica.io/background-video_mob.mp4"
    );
    document.querySelector("video").play();
  }
});

/*
 * Move partner block
 */

// function checkScreenWidth() {
//   const screenWidth = window.innerWidth;
//   const partnerDiv = document.querySelector(".partner");
//   const contentDiv = document.querySelector(".content-block");
//   const contactsInfoDiv = document.querySelector(".contacts-info");

//   if (screenWidth <= 850) {
//     if (partnerDiv.nextElementSibling !== contentDiv) {
//       contentDiv.parentNode.insertBefore(partnerDiv, contentDiv);
//     }
//   } else if (screenWidth === 851) {
//     if (partnerDiv.nextElementSibling !== contactsInfoDiv) {
//       contentDiv.parentNode.insertBefore(
//         partnerDiv,
//         contactsInfoDiv.nextSibling
//       );
//     }
//   }
// }

// window.addEventListener("DOMContentLoaded", checkScreenWidth);
// window.addEventListener("resize", checkScreenWidth);

function movePrimaryButton() {
  const screenWidth = window.innerWidth;
  const aboutText = document.querySelector(".about-block");
  const primaryButton = document.querySelector(".primary-button");

  if (screenWidth <= 850 && aboutText && primaryButton) {
    // Перемещаем .primary-button после .about-text
    aboutText.parentNode.insertBefore(primaryButton, aboutText.nextSibling);
  }
}

// Вызовем функцию после полной загрузки страницы и при изменении размера окна
window.addEventListener("DOMContentLoaded", movePrimaryButton);
window.addEventListener("resize", movePrimaryButton);

/*
 * Set preloader
 */

setTimeout(function () {
  let preloader = document.querySelector(".preloader");
  preloader.classList.add("hide");
}, 2000);

/*
 * Popup actions
 */

function popupShow() {
  let popup = document.querySelector(".popup_menu");
  let overlay = document.querySelector(".overlay");
  popup.style.display = "block";
  overlay.style.display = "block";
}

function closePopup() {
  let popup = document.querySelector(".popup_menu");
  let overlay = document.querySelector(".overlay");
  popup.style.display = "none";
  overlay.style.display = "none";
}

function overlayClose() {
  let popup = document.querySelector(".popup_menu");
  let popupG = document.querySelector(".popup_menu-gratitude");
  let overlay = document.querySelector(".overlay");
  popup.style.display = "none";
  popupG.style.display = "none";
  overlay.style.display = "none";
}

function gratitudePopupShow() {
  closePopup();
  let popup = document.querySelector(".popup_menu-gratitude");
  let overlay = document.querySelector(".overlay");
  popup.style.display = "block";
  overlay.style.display = "block";
}

function gratitudeClosePopup() {
  let popup = document.querySelector(".popup_menu-gratitude");
  popup.style.display = "none";
  overlayClose();
}

/*
 * Form submit action
 */

function handleSubmit(event, url) {
  event.preventDefault();

  const submitButton = document.querySelector(".download-modal-btn");
  submitButton.disabled = true;
  const form = document.forms.myForm;

  const hostname = new URL(url).hostname;

  let formData = {};
  let formFields = document.getElementsByTagName("input");

  for (let i = 0; i < formFields.length; i++) {
    let fieldName = formFields[i].name;
    let fieldValue = formFields[i].value;

    formData[fieldName] = fieldValue;
  }

  formData["source"] = hostname;
  formData["url"] = url;

  axios
    .post("/api/v1/client", formData)
    .then((response) => {
      console.log("Данные формы успешно отправлены на сервер");
      gratitudePopupShow();
      form.reset();
    })
    .catch((error) => {
      console.error("Ошибка при отправке данных формы:", error.message);
    })
    .finally(() => {
      submitButton.disabled = false;
    });

  return false;
}

function changeLanguage(event, lang) {
  event.preventDefault();
  const hostname = window.location.hostname;
  const port = window.location.port;
  const newUrl = `https://${hostname}:${port}/${lang}`;
  window.location.href = newUrl;
}

const copyEmails = document.querySelectorAll(".copy-email");
copyEmails.forEach((element) => {
  element.addEventListener("mouseenter", handleEmailMouseEnter);
  element.addEventListener("mouseleave", handleEmailMouseLeave);
});

function handleEmailMouseEnter(event) {
  const email = event.target.dataset.email;
  event.target.addEventListener("click", () => {
    copyToClipboard(email, event.target);
  });
  event.target.style.cursor = "pointer";
}

function handleEmailMouseLeave(event) {
  event.target.removeEventListener("click", copyToClipboard);
  event.target.style.cursor = "auto";
}

function copyToClipboard(text, element) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  const notification = document.createElement("span");
  notification.classList.add("copy-notification");
  notification.textContent = "Copied";
  element.parentNode.insertBefore(notification, element.nextSibling);

  setTimeout(() => {
    notification.remove();
  }, 2000);
}
