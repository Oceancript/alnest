// Получаем все селекты на странице
const selectSingles = document.querySelectorAll('.__select');

// Добавляем обработчик события клика для всего документа
document.addEventListener('click', (event) => {
  // Для каждого селекта
  selectSingles.forEach((selectSingle) => {
    // Проверяем, произошел ли клик вне области селекта
    if (!selectSingle.contains(event.target)) {
      // Если клик произошел вне селекта, закрываем его
      selectSingle.setAttribute('data-state', '');
    }
  });
});

// Обрабатываем каждый селект независимо от других
selectSingles.forEach((selectSingle) => {
  const selectSingle_title = selectSingle.querySelector('.__select__title');
  const selectSingle_labels = selectSingle.querySelectorAll('.__select__label');
  let lastSelectedLabel;
  let optionsDisplayed = new Set();

  // Toggle menu
  selectSingle_title.addEventListener('click', () => {
    if ('active' === selectSingle.getAttribute('data-state')) {
      selectSingle.setAttribute('data-state', '');
    } else {
      selectSingle.setAttribute('data-state', 'active');
    }
  });

  // Close when click to option and manage selection
  selectSingle_labels.forEach((label) => {
    label.addEventListener('click', (evt) => {
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
    
    // Check if option already displayed, if not, display it
    const optionText = label.textContent.trim();
    if (!optionsDisplayed.has(optionText)) {
      optionsDisplayed.add(optionText);
    } else {
      label.style.display = 'none';
    }
  });
});