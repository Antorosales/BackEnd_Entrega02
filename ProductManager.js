const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
    }

    addProduct(product) {
        const products = this.getProducts();
        const newProduct = {
            id: products.length + 1,
            ...product
        };
        products.push(newProduct);
        this.saveProducts(products);
        return newProduct;
    }

    getProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(data) || [];
        } catch (error) {
            return [];
        }
    }

    getProductById(id) {
        const products = this.getProducts();
        return products.find(product => product.id === id);
    }

    updateProduct(id, updatedFields) {
        const products = this.getProducts();
        const index = products.findIndex(product => product.id === id);

        if (index !== -1) {
            const updatedProduct = {
                ...products[index],
                ...updatedFields
            };

            products[index] = updatedProduct;
            this.saveProducts(products);
            return updatedProduct;
        }

        return null;
    }

    deleteProduct(id) {
        const products = this.getProducts();
        const updatedProducts = products.filter(product => product.id !== id);
        this.saveProducts(updatedProducts);
    }

    saveProducts(products) {
        const data = JSON.stringify(products, null, 2);
        fs.writeFileSync(this.path, data, 'utf-8');
    }
}


const productManager = new ProductManager('ruta/del/archivo.json');

//agregar un nuevo producto
const newProduct = {
    title: 'Producto Nuevo',
    description: 'Descripción del producto',
    price: 19.99,
    thumbnail: 'ruta/imagen.jpg',
    code: 'ABC123',
    stock: 50
};

const addedProduct = productManager.addProduct(newProduct);
console.log('Producto agregado:', addedProduct);

