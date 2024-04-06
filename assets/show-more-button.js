const collectionsWrapper = document.getElementById('collections_wrapper');
const productsOnPage = document.getElementById('product-grid');
let nextUrl = productsOnPage.getAttribute('data-next-url');
const buttonShowMore = document.getElementById('show-more-products');
buttonShowMore.addEventListener('click', (e) => {
    fetch(nextUrl)
        .then((res) => res.text())
        .then((html) => {
            const tempElement = document.createElement('div');
            tempElement.innerHTML = html;
            const newProductsGrid = tempElement.querySelector('#product-grid');
            collectionsWrapper.append(newProductsGrid)
            let newUrl = newProductsGrid.getAttribute('data-next-url');
            nextUrl = newUrl
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});