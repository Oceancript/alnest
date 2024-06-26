const filtersButton = document.getElementById('filters_button')
const sortingButton = document.getElementById('sorting_button')
const sortingCollapse = document.getElementById('sorting_collapse')
const filterCollapse = document.getElementById('filter_collapse')

filtersButton.addEventListener('click', toggleFilters);
sortingButton.addEventListener('click', toggleSorting);

async function toggleFilters() {
    const isSortingOpen = sortingCollapse.classList.contains('active')
    if(isSortingOpen) {
        sortingCollapse.classList.add('no_animate')
        sortingCollapse.classList.remove('active')
        sortingButton.classList.remove('active')
    }
    setTimeout(() => {
        sortingCollapse.classList.remove('no_animate')
        filterCollapse.classList.toggle('active')
    }, 1)
}

async function toggleSorting() {
    const isFiltersOpen = filterCollapse.classList.contains('active')
    if(isFiltersOpen) {
        filterCollapse.classList.add('no_animate')
        filterCollapse.classList.remove('active')
        sortingButton.classList.remove('active')
    }

    await setTimeout( () => {
        filterCollapse.classList.remove('no_animate')
        sortingCollapse.classList.toggle('active')
        sortingButton.classList.toggle('active')
    }, 1)
}


// visibility button clear filters
document.addEventListener('DOMContentLoaded', function () {
  var clearFiltersButton = document.getElementById('clearFiltersButton');
  function updateClearFiltersButton() {
    var hasActiveFilters = false;
    var filterCheckboxes = document.querySelectorAll('.checkbox_filters');
    filterCheckboxes.forEach(function (checkbox) {
      if (checkbox.checked) {
        hasActiveFilters = true;
      }
    });
    if (hasActiveFilters) {
      clearFiltersButton.style.display = 'block';
    } else {
      clearFiltersButton.style.display = 'none';
    }
  }

  var filterCheckboxes = document.querySelectorAll('.checkbox_filters');
  filterCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', updateClearFiltersButton);
  });
  updateClearFiltersButton();
});
//end