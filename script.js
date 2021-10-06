class Product {
    constructor(name, category, description, price, picture) {
        this.name = name;
        this.category = category;
        this.description = description;
        this.price = price;
        this.picture = picture;
    }
}

const products = [];
products.push(new Product('Hot Coffee', 'Coffee', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 2.49, 'images/coffee.jpg'));
products.push(new Product('Iced Coffee', 'Coffee', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 2.49, 'images/iced-coffee.jpg'));
products.push(new Product('Black Tea', 'Other Drinks', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 2.49, 'images/black-tea.jpg'));
products.push(new Product('Green Tea', 'Other Drinks', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 2.49, 'images/green-tea.jpg'));
products.push(new Product('Orange Juice', 'Other Drinks', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 2.49, 'images/orange-juice.jpg'));
products.push(new Product('Bagel', 'Baked Goods', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 2.99, 'images/bagel.jpg'));
products.push(new Product('Donut', 'Baked Goods', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 2.99, 'images/donut.jpg'));
products.push(new Product('Scone', 'Baked Goods', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 2.99, 'images/scone.jpg'));
products.push(new Product('Muffin', 'Baked Goods', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 2.99, 'images/muffin.jpg'));
products.push(new Product('Avocado Toast', 'Sandwiches', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 5.99, 'images/avocado-toast.jpg'));
products.push(new Product('Breakfast Sandwich', 'Sandwiches', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 7.99, 'images/breakfast-sandwich.jpg'));

const coffee = document.getElementById('coffee');
const otherDrinks = document.getElementById('other-drinks');
const bakedGoods = document.getElementById('baked-goods');
const sandwiches = document.getElementById('sandwiches');

for (let product of products) {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    const productImg = document.createElement('img');
    productImg.src = product.picture;
    productImg.alt = product.name;

    const productText = document.createElement('div');
    productText.classList.add('product-text');

    const productHeader = document.createElement('div');
    productHeader.classList.add('product-header');

    const productName = document.createElement('h4');
    productName.classList.add('name');
    productName.innerText = product.name;

    const productPrice = document.createElement('h4');
    productPrice.classList.add('price');
    productPrice.innerText = `$${product.price.toFixed(2)}`;

    const productDesc = document.createElement('p');
    productDesc.classList.add('description');
    productDesc.innerText = product.description;

    productDiv.appendChild(productImg);
    productDiv.appendChild(productText);
    productText.appendChild(productHeader);
    productHeader.appendChild(productName);
    productHeader.appendChild(productPrice);
    productText.appendChild(productDesc);

    switch (product.category) {
        case 'Coffee':
            coffee.appendChild(productDiv);
            break;
        case 'Other Drinks':
            otherDrinks.appendChild(productDiv);
            break;
        case 'Baked Goods':
            bakedGoods.appendChild(productDiv);
            break;
        case 'Sandwiches':
            sandwiches.appendChild(productDiv);
            break;
        default:
            break;
    }
}