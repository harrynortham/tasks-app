export default function modal(content) {
  const body = document.body;
  const modal = document.createElement("div");
  modal.classList.add("modal");
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  const closeButton = document.createElement("span");
  closeButton.classList.add("modal-close", "fa-solid", "fa-xmark", "fa-xl");
  closeButton.addEventListener("click", () => {
    modal.remove();
  });
  modalContent.appendChild(closeButton);
  modalContent.appendChild(content);
  modal.appendChild(modalContent);
  body.appendChild(modal);
}
