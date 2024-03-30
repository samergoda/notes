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

//get data from local storage
let colorObject = localStorage.getItem("colorCounts");
const myDataObject = colorObject ? JSON.parse(colorObject) : null;
updateColorCounts(myDataObject);
console.log(myDataObject)
let notesArray = localStorage.getItem("notes");
const notesStorage = notesArray ? JSON.parse(notesArray) : [];
console.log(notesStorage)



if (notesStorage.length) {
    console.log(notesStorage);
    let htmlContent ='';

    notesStorage.forEach(note => {
        htmlContent += `
            <div class="d-flex note p-3  flex-column">
                <div class="d-flex colors top-0">
                    <button data-color="red" class="bg-danger"></button>
                    <button data-color="blue" class="bg-info"></button>
                    <button data-color="yellow" class="bg-warning"></button>
                    <button data-color="green" class="bg-success"></button>
                </div>
                <textarea name="text-note" id="text-note" class='bg-${note.color}' >${note.content}</textarea>
                <button class="remove-btn">remove</button>
            </div>
        `;
    });

    notes.innerHTML = htmlContent;
}



function setNotes(){

document.querySelectorAll(".note").forEach(n=>{
        let allNotes = Array.from(document.querySelectorAll(".note")).map(note =>{ 
            console.log(note.querySelector('textarea').style.backgroundColor)
            return{
                color:note.querySelector('textarea').style.backgroundColor,
                content:note.querySelector('textarea').value
            } 
        });
console.log(allNotes)
        localStorage.setItem("notes", JSON.stringify(allNotes));
   
})
}

document.querySelectorAll(".note").forEach(n=>{n.addEventListener('keydown',()=>setNotes())})
// Handle adding a note
addBtn.addEventListener("click", () => {
  notes.insertAdjacentHTML("afterbegin", noteTemplate);
  setNotes()
});










// Handle removing a note
notes.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    e.target.closest(".note").remove();
    updateColorCounts();
    setNotes()
  }
});

// Handle color note
notes.addEventListener("click", (e) => {
  if (e.target.closest("button")) {
      const color = e.target.dataset.color;
      const note = e.target.closest(".note");
      const textarea = note?.querySelector("textarea");
      setNotes()
      if (textarea) {
          textarea.style.backgroundColor = color;
          setNotes()
          updateColorCounts();
    }
  }
});

// Update color counts
function updateColorCounts(myDataObject) {
  const colorCounts = myDataObject ? myDataObject : {};

  notes.querySelectorAll(".note textarea").forEach((textarea) => {
    const color = textarea.style.backgroundColor;
    if (color) {
      colorCounts[color] = (colorCounts[color] || 0) + 1;
    }
  });

  const colorContainer = document.getElementById("color-container");
  colorContainer.innerHTML = "";

  for (const color in colorCounts) {
    if (colorCounts.hasOwnProperty(color)) {
      const count = colorCounts[color];
      const colorItem = document.createElement("div");
      colorItem.style.backgroundColor = color;
      colorItem.textContent = `${count} ${color}`;
      colorContainer.appendChild(colorItem);
    }
  }

  //save colors at local storage
  let saveObject = JSON.stringify(colorCounts);
  localStorage.setItem("colorCounts", saveObject);

  //save notes at local storage
}
