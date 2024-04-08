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
  const select = selectSingle.querySelector('.__select__input'); // Добавляем получение самого селекта
  let lastSelectedLabel;
  let optionsDisplayed = new Set();

  // Получаем изначальное значение варианта из query параметра
  const urlParams = new URLSearchParams(window.location.search);
  const initialVariant = urlParams.get('variant');

  // Устанавливаем значение по умолчанию, если параметр variant не найден в URL
  if (initialVariant) {
    select.value = initialVariant;
  } else {
    // Если параметр variant не найден в URL, устанавливаем значение по умолчанию
    select.value = selectSingle.querySelector('.__select__input:checked').value;
  }

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

      // Добавляем параметр variant в URL
      const selectedValue = evt.target.getAttribute('data-value');
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('variant', selectedValue);
      // Обновляем URL страницы с новыми параметрами
      history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);

      // Выполняем запрос на option.url
      fetchOptionUrl(evt.target.getAttribute('data-url'));
    });

    // Check if option already displayed, if not, display it
    const optionText = label.textContent.trim();
    if (!optionsDisplayed.has(optionText)) {
      optionsDisplayed.add(optionText);
    } else {
      label.style.display = 'none';
    }
  });

  // Добавляем обработчик события изменения выбора в селекте
  select.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    // Добавляем параметр variant в URL
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('variant', selectedValue);
    // Обновляем URL страницы с новыми параметрами
    history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);

    // Выполняем запрос на option.url
    fetchOptionUrl(event.target.getAttribute('data-url'));
  });
});

// Функция для выполнения запроса на option.url
function fetchOptionUrl(url) {
  if (!url) return; // Проверка наличия URL
  fetch(url)
    .then(response => {
      console.log(response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(html => {
      const tempElement = document.createElement('div');
      tempElement.innerHTML = html;
      const newElement = tempElement.querySelector('#check_variant');
      const oldElement = document.querySelector('#check_variant');
      oldElement.innerHTML = newElement.innerHTML
    })
    .catch(error => console.error('There has been a problem with your fetch operation:', error));
}