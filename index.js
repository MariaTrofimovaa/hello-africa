document.addEventListener("DOMContentLoaded", () => {
  /*
   * Multilingual dropdown list
   */

  // $(document).ready(function () {
  //   $("a.dropdown-a").on("click", function (e) {
  //     e.preventDefault();
  //   });
  //   $(".dropdown-li").hover(
  //     function () {
  //       clearTimeout($.data(this, "timer"));
  //       $("ul, .disabled_langs", this).stop(true, true).slideDown(200);
  //     },
  //     function () {
  //       $.data(
  //         this,
  //         "timer",
  //         setTimeout(
  //           $.proxy(function () {
  //             $("ul, .disabled_langs", this)
  //               .stop(true, true)
  //               .slideUp(200);
  //           }, this),
  //           100
  //         )
  //       );
  //     }
  //   );
  // });

  /*
   * Video for mobile version
   */
  const windowInnerWidth = window.innerWidth;

  if (windowInnerWidth <= 475) {
    let movie = document.querySelector("video");
    // change "#" to video path
    movie.setAttribute("src", "#");
    document.querySelector("video").play();
  }
});

/*
 * Move partner block
 */

// function checkScreenWidth() {
//   const partnerDiv = document.querySelector(".partner");
//   const contentDiv = document.querySelector(".content-block");
//   const screenWidth = window.innerWidth;
//   if (screenWidth <= 850) {
//     contentDiv.parentNode.insertBefore(partnerDiv, contentDiv);
//   } else {
//     partnerDiv.parentNode.insertBefore(
//       partnerDiv,
//       partnerDiv.parentNode.firstChild
//     );
//   }
// }

// window.addEventListener("DOMContentLoaded", checkScreenWidth);
// window.addEventListener("resize", checkScreenWidth);

// ******************

// function checkScreenWidth() {
//   const screenWidth = window.innerWidth;
//   const partnerDiv = document.querySelector(".partner");
//   const contentDiv = document.querySelector(".content-block");
//   const parentDiv = contentDiv.parentNode;

//   if (screenWidth <= 850) {
//     // Переносим <div class="partner"> перед <div class="content-block">
//     if (!parentDiv.contains(partnerDiv)) {
//       parentDiv.insertBefore(partnerDiv, contentDiv);
//       partnerDiv.removeAttribute("style"); // Сбрасываем инлайновые стили
//     }
//   } else {
//     // Возвращаем <div class="partner"> на исходное место
//     if (partnerDiv.parentNode !== parentDiv) {
//       parentDiv.insertBefore(partnerDiv, contentDiv);
//       partnerDiv.removeAttribute("style"); // Сбрасываем инлайновые стили
//     }
//   }
// }

// window.addEventListener("DOMContentLoaded", checkScreenWidth);
// window.addEventListener("resize", checkScreenWidth);

// **************
function checkScreenWidth() {
  const screenWidth = window.innerWidth;
  const partnerDiv = document.querySelector(".partner");
  const contentDiv = document.querySelector(".content-block");
  const parentDiv = contentDiv.parentNode;

  if (screenWidth <= 850) {
    // Переносим <div class="partner"> перед <div class="content-block">
    if (!parentDiv.contains(partnerDiv)) {
      parentDiv.insertBefore(partnerDiv, contentDiv);
      partnerDiv.classList.remove("partner-original"); // Удаляем класс, который применяет стили
    }
  } else {
    // Возвращаем <div class="partner"> на исходное место
    if (partnerDiv.parentNode !== parentDiv) {
      parentDiv.insertBefore(partnerDiv, contentDiv);
      partnerDiv.classList.add("partner-original"); // Применяем класс с исходными стилями
      partnerDiv.removeAttribute("style"); // Удаляем инлайновые стили, если они были применены
    }
  }
}

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

function handleSubmit(event, url) {
  event.preventDefault();

  const hostname = new URL(url).hostname;

  let formData = {};
  let formFields = document.getElementsByTagName("input");

  for (let i = 0; i < formFields.length; i++) {
    let fieldName = formFields[i].name;
    let fieldValue = formFields[i].value;

    formData[fieldName] = fieldValue;
  }

  formData["source"] = hostname;

  axios
    .post("http://localhost:8080/api/v1/client", formData)
    .then((response) => {
      console.log("Данные формы успешно отправлены на сервер");
      gratitudePopupShow();
    })
    .catch((error) => {
      console.error("Ошибка при отправке данных формы:", error.message);
    });

  return false;
}