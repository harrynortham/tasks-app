export default function modal(content) {
  const body = document.body;
  const modal = document.createElement("div");
  modal.classList.add("modal");
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  const deleteButton = document.createElement("span");
  deleteButton.classList.add("delete-project", "fa-solid", "fa-xmark", "fa-xl");
  deleteButton.addEventListener("click", () => {
    modal.remove();
  });
  modalContent.appendChild(deleteButton);
  modalContent.appendChild(content);
  modal.appendChild(modalContent);
  body.appendChild(modal);
}
