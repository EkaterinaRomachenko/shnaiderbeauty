import { popupOpenedSelector } from "./utils";



export function openPopup(popupSelector) {
  popupSelector.classList.add("popup__opened");
  popupSelector.addEventListener('click', keyHandlerOverlay)
  document.addEventListener('keydown', keyHandlerEsc)
}

export function closePopup(popupSelector) {
  popupSelector.classList.remove("popup__opened");
  popupSelector.removeEventListener('click', keyHandlerOverlay)
  document.removeEventListener('keydown', keyHandlerEsc)
}

// Закрытие popup по нажатию на оверлей
function keyHandlerOverlay(evt) {
  if (evt.target.classList.remove(popupOpenedSelector)) {
    closePopup()
  }
}

// Закрытие по нажатию на Esc
function keyHandlerEsc(evt) {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector(`.${popupOpenedSelector}`)
    popupActive && closePopup(popupActive)
  }
}
