const notes = document.getElementById("notes");
const addBtn = document.querySelector(".add-btn");
const removeBtn = document.querySelectorAll(".remove-btn");

const noteTemplate = `<div class="d-flex note p-3 flex-column">
  <div class="d-flex colors top-0">
    <button data-color="red" class="bg-danger"></button>
    <button data-color="blue" class="bg-info"></button>
    <button data-color="yellow" class="bg-warning"></button>
    <button data-color="green" class="bg-success"></button>
  </div>
  <textarea name="text-note" id="text-note" ></textarea>
  <button class="remove-btn">remove</button>
</div>`;

// Handle adding a note
addBtn.addEventListener("click", () => {
  notes.insertAdjacentHTML("afterbegin", noteTemplate);
});

// Handle removing a note
notes.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    e.target.closest(".note").remove();
    updateColorCounts();
  }
});

// Handle coloring a note
notes.addEventListener("click", (e) => {
  if (e.target.closest("button")) {
    const color = e.target.dataset.color;
    const note = e.target.closest(".note");
    const textarea = note?.querySelector("textarea");
    if (textarea) {
      textarea.style.backgroundColor = color;
      updateColorCounts();
    }
  }
});

// Update color counts
function updateColorCounts() {
  const colorCounts = {};

  notes.querySelectorAll(".note textarea").forEach((textarea) => {
    const color = textarea.style.backgroundColor;
    if (color) {
      colorCounts[color] = (colorCounts[color] || 0) + 1;
    }
  });

  const colorContainer = document.getElementById("color-container");
  colorContainer.innerHTML = '';

  for (const color in colorCounts) {
    if (colorCounts.hasOwnProperty(color)) {
      const count = colorCounts[color];
      const colorItem = document.createElement("div");
      colorItem.style.backgroundColor=color
      colorItem.textContent = `${count} ${color}`;
      colorContainer.appendChild(colorItem);
    }
  }
}
