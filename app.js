document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('productList');
    const productForm = document.getElementById('productForm');
    const productNameInput = document.getElementById('productName');
    const productPriceInput = document.getElementById('productPrice');

    // Charger les produits depuis localStorage et les afficher
    function loadProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        productList.innerHTML = '';
        products.forEach(product => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.textContent = `${product.name} - ${product.price}DH`;
            productList.appendChild(li);
        });
    }

    // Ajouter un produit dans localStorage
    function addProduct(name, price) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.push({ name, price });
        localStorage.setItem('products', JSON.stringify(products));
    }

    // Gérer la soumission du formulaire d'ajout de produit
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = productNameInput.value.trim();
        const price = parseFloat(productPriceInput.value.trim());
        if (name && !isNaN(price)) {
            addProduct(name, price);
            loadProducts();
            productForm.reset();
            $('#addProductModal').modal('hide');
        }
    });

    // Charger les produits à l'initialisation
    loadProducts();
});
