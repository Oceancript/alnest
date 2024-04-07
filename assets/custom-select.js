
const selectSingle = document.querySelector('.__select');
const selectSingle_title = selectSingle.querySelector('.__select__title');
const selectSingle_labels = selectSingle.querySelectorAll('.__select__label');
let lastSelectedLabel;

// Toggle menu
selectSingle_title.addEventListener('click', () => {
  if ('active' === selectSingle.getAttribute('data-state')) {
    selectSingle.setAttribute('data-state', '');
  } else {
    selectSingle.setAttribute('data-state', 'active');
  }
});

// Close when click to option and manage selection
for (let i = 0; i < selectSingle_labels.length; i++) {
  selectSingle_labels[i].addEventListener('click', (evt) => {
    evt.stopPropagation();
    if (lastSelectedLabel) {
      lastSelectedLabel.style.display = 'block'; // Show the last selected label
      lastSelectedLabel.style.textAlign = "center";
    }
    selectSingle_title.textContent = evt.target.textContent;
    selectSingle.setAttribute('data-state', '');
    evt.target.style.display = 'none'; // Hide the selected label from the list
    lastSelectedLabel = evt.target; // Keep reference to the last selected label
  });
}


            
