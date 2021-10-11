class Product {
    constructor(name, category, description, price, picture, quantity = 1) {
        this.name = name;
        this.category = category;
        this.description = description;
        this.price = price;
        this.picture = picture;
        this.quantity = quantity;
    }
}

const menuDiv = document.getElementById('menu');
const coffeeSection = document.getElementById('coffee');
const otherDrinksSection = document.getElementById('other-drinks');
const bakedGoodsSection = document.getElementById('baked-goods');
const sandwichesSection = document.getElementById('sandwiches');

const cartDiv = document.getElementById('cart');
const cartItems = document.getElementById('cart-items');
const backToMenu = document.getElementById('back-to-menu');

const checkoutDiv = document.getElementById('checkout');
const backToCart = document.getElementById('back-to-cart');
const checkoutSubtotal = document.getElementById('subtotal');
const checkoutTax = document.getElementById('tax');
const checkoutTotal = document.getElementById('total-with-tax');
const checkoutGrandTotal = document.getElementById('grand-total');

const tipButtons = document.getElementById('tip-buttons');
const customTipDiv = document.getElementById('custom-tip');
const customTipButtons = document.getElementById('custom-tip-buttons');
const customTipEntry = document.getElementById('tip-entry');
const checkoutTip = document.getElementById('tip');

const paymentButtons = document.getElementById('payment-buttons');
const cashButton = document.getElementById('cash-button');
const cardButton = document.getElementById('card-button');
const cashDiv = document.getElementById('cash');
const cardDiv = document.getElementById('card');

const footerButton = document.getElementById('footer-button');
const footerItemCount = document.getElementById('footer-item-count');
const footerTotal = document.getElementById('footer-total');

const productArr = [];
const cartArr = [];

function createProducts() {
    productArr.push(new Product('Hot Coffee', 'Coffee',
    'Our famous house blend, freshly ground and brewed hot. Cream and sugar complimentary.',
    2.49, 'images/coffee.jpg'));
productArr.push(new Product('Iced Coffee', 'Coffee',
    'Our famous house blend, freshly ground and brewed cold. Cream and sugar complimentary.',
    2.49, 'images/iced-coffee.jpg'));
productArr.push(new Product('Black Tea', 'Other Drinks',
    'Not quite as strong as coffee, but it\'ll get the job done!',
    2.49, 'images/black-tea.jpg'));
productArr.push(new Product('Green Tea', 'Other Drinks',
    'I need to just google this s#$%.',
    2.49, 'images/green-tea.jpg'));
productArr.push(new Product('Orange Juice', 'Other Drinks',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    2.49, 'images/orange-juice.jpg'));
productArr.push(new Product('Bagel', 'Baked Goods',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    2.99, 'images/bagel.jpg'));
productArr.push(new Product('Donut', 'Baked Goods',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    2.99, 'images/donut.jpg'));
productArr.push(new Product('Scone', 'Baked Goods',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    2.99, 'images/scone.jpg'));
productArr.push(new Product('Muffin', 'Baked Goods',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    2.99, 'images/muffin.jpg'));
productArr.push(new Product('Avocado Toast', 'Sandwiches',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    5.99, 'images/avocado-toast.jpg'));
productArr.push(new Product('Breakfast Sandwich', 'Sandwiches',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    7.99, 'images/breakfast-sandwich.jpg'));
}

createProducts();
buildMenu();
footerButton.addEventListener('click', showCart);
backToMenu.addEventListener('click', hideCart);
backToCart.addEventListener('click', hideCheckout);
tipButtons.addEventListener('click', toggleClicked);
customTipButtons.addEventListener('click', toggleClicked);
customTipEntry.addEventListener('change', updateCheckoutTotals);
paymentButtons.addEventListener('click', toggleClicked);
cashButton.addEventListener('click', showCash);
cardButton.addEventListener('click', showCard);


function buildMenu() {

    for (let product of productArr) {

        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const productImg = document.createElement('img');
        productImg.src = product.picture;
        productImg.alt = product.name;
        productDiv.appendChild(productImg);

        const productText = document.createElement('div');
        productText.classList.add('product-text');
        productDiv.appendChild(productText);

        const productHeader = document.createElement('div');
        productHeader.classList.add('product-header');
        productText.appendChild(productHeader);

        const productName = document.createElement('h4');
        productName.classList.add('name');
        productName.innerText = product.name;
        productHeader.appendChild(productName);

        const productPrice = document.createElement('h4');
        productPrice.classList.add('price');
        productPrice.innerText = `$${product.price.toFixed(2)}`;
        productHeader.appendChild(productPrice);

        const productDesc = document.createElement('p');
        productDesc.classList.add('description');
        productDesc.innerText = product.description;
        productText.appendChild(productDesc);

        const productFooter = document.createElement('div');
        productFooter.classList.add('product-footer');
        productText.appendChild(productFooter);

        const qtySelect = document.createElement('select');
        productFooter.appendChild(qtySelect);

        for (let i = 1; i <= 99; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.text = i;
            qtySelect.appendChild(option);
        }

        const cartButton = document.createElement('button');
        cartButton.innerText = "Add to Cart";
        cartButton.classList.add('add-to-cart');
        cartButton.addEventListener('click', addToCart);
        productFooter.appendChild(cartButton);

        switch (product.category) {
            case 'Coffee':
                coffeeSection.appendChild(productDiv);
                break;
            case 'Other Drinks':
                otherDrinksSection.appendChild(productDiv);
                break;
            case 'Baked Goods':
                bakedGoodsSection.appendChild(productDiv);
                break;
            case 'Sandwiches':
                sandwichesSection.appendChild(productDiv);
                break;
            default:
                break;
        }

    }

}

function updateFooterTotals() {

    let items = 0;
    let cost = 0.00;
    for (let product of cartArr) {
        items += product.quantity;
        cost += product.quantity * product.price;
    }
    footerItemCount.innerText = items;
    footerTotal.innerText = `$${parseFloat(cost).toFixed(2)}*`

}

function addToCart(event) {

    const productDiv = event.target.parentNode.parentNode.parentNode;
    const name = productDiv.querySelector('.name').innerText;
    const category = productDiv.parentNode.querySelector('h3').innerText;
    const description = productDiv.querySelector('.description').innerText;
    const price = parseFloat(productDiv.querySelector('.price').innerText.substr(1));
    const picture = productDiv.querySelector('img').src;
    let quantity = parseInt(productDiv.querySelector('select').value);

    const index = cartArr.findIndex(p => p.name === name);
    if (index === -1) {
        cartArr.push(new Product(name, category, description, price, picture, quantity));
    }
    else {
        cartArr[index].quantity += quantity;
        if (cartArr[index].quantity > 99) {
            cartArr[index].quantity = 99;
        }
    }

    productDiv.querySelector('select').value = 1;
    updateFooterTotals();

}

function updateQuantity(event) {
    const newQuantity = event.target.value;
    const product = event.target.parentNode.parentNode.parentNode;
    const productName = product.querySelector('.name').innerText;
    const index = cartArr.findIndex(p => p.name === productName)
    cartArr[index].quantity = parseInt(newQuantity);
    updateFooterTotals();
}


function removeFromCart(event) {
    const product = event.target.parentNode.parentNode.parentNode;
    const productName = product.querySelector('.name').innerText;
    const index = cartArr.findIndex(p => p.name === productName);
    cartArr.splice(index, 1);
    product.remove();
    updateFooterTotals();
}

function toggleMenuAndCart() {

    menuDiv.classList.toggle('hidden');
    menuDiv.classList.toggle('visible');
    cartDiv.classList.toggle('hidden');
    cartDiv.classList.toggle('visible');

}

function toggleCartAndCheckout() {

    cartDiv.classList.toggle('hidden');
    cartDiv.classList.toggle('visible');
    checkoutDiv.classList.toggle('hidden');
    checkoutDiv.classList.toggle('visible');

}

function showCart() {

    toggleMenuAndCart();
    footerButton.innerText = 'Checkout';
    footerButton.removeEventListener('click', showCart);
    footerButton.addEventListener('click', showCheckout);

    for (let product of cartArr) {

        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const productImg = document.createElement('img');
        productImg.src = product.picture;
        productImg.alt = product.name;
        productDiv.appendChild(productImg);

        const productText = document.createElement('div');
        productText.classList.add('product-text');
        productDiv.appendChild(productText);

        const productHeader = document.createElement('div');
        productHeader.classList.add('product-header');
        productText.appendChild(productHeader);

        const productName = document.createElement('h4');
        productName.classList.add('name');
        productName.innerText = product.name;
        productHeader.appendChild(productName);

        const productPrice = document.createElement('h4');
        productPrice.classList.add('price');
        productPrice.innerText = `$${product.price.toFixed(2)}`;
        productHeader.appendChild(productPrice);

        const productDesc = document.createElement('p');
        productDesc.classList.add('description');
        productDesc.innerText = product.description;
        productText.appendChild(productDesc);

        const productFooter = document.createElement('div');
        productFooter.classList.add('product-footer');
        productText.appendChild(productFooter);

        const qtySelect = document.createElement('select');
        productFooter.appendChild(qtySelect);
        for (let i = 1; i <= 99; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.text = i;
            qtySelect.appendChild(option);
        }
        qtySelect.value = product.quantity;
        qtySelect.addEventListener('change', updateQuantity);

        const removeButton = document.createElement('button');
        removeButton.innerText = "Remove from Cart";
        removeButton.classList.add('remove-from-cart');
        removeButton.addEventListener('click', removeFromCart);
        productFooter.appendChild(removeButton);

        cartItems.appendChild(productDiv);
    }
}

function hideCart() {

    toggleMenuAndCart();
    footerButton.innerText = 'View Order';
    footerButton.removeEventListener('click', showCheckout);
    footerButton.addEventListener('click', showCart);
    while (cartItems.firstChild) {
        cartItems.removeChild(cartItems.firstChild);
    }
    
}

function toggleClicked(event) {

    const parent = event.currentTarget;
    const clicked = event.target;
    for (let i = 0; i < parent.children.length; i++) {
        parent.children[i].classList.remove('clicked');
        parent.children[i].classList.add('not-clicked');
    }
    clicked.classList.remove('not-clicked');
    clicked.classList.add('clicked');
    updateCheckoutTotals();

}

function updateCheckoutTotals() {

    updateFooterTotals();
    const subtotal = parseFloat(footerTotal.innerText.substr(1));
    const tax = parseFloat((subtotal * 0.06).toFixed(2));
    const total = subtotal + tax;
    const tipButton = tipButtons.querySelector('.clicked');
    let tipPercent = 0.00;
    let tip = 0.00;
    if (tipButton.id === 'tip-other') {
        customTipDiv.className = 'visible';
        const tipType = customTipButtons.querySelector('.clicked').innerText;
        if (tipType === '%') {
            tipPercent = parseFloat(customTipEntry.value / 100);
            tip = parseFloat((total * tipPercent).toFixed(2));
        } else {
            tip = parseFloat(customTipEntry.value);
        }
    } else {
        customTipDiv.className = 'hidden';
        tipPercent = parseFloat(tipButton.value);
        tip = parseFloat((total * tipPercent).toFixed(2));
    }
    
    const grandTotal = total + tip;

    checkoutSubtotal.innerText = `$${subtotal.toFixed(2)}`;
    checkoutTax.innerText = `$${tax.toFixed(2)}`;
    checkoutTotal.innerText = `$${total.toFixed(2)}`;
    checkoutTip.innerText = `$${tip.toFixed(2)}`;
    checkoutGrandTotal.innerText = `$${grandTotal.toFixed(2)}`;
    footerTotal.innerText = `$${grandTotal.toFixed(2)}`;

}

function showCheckout() {
    
    toggleCartAndCheckout();
    footerButton.innerText = 'Complete Payment';
    footerButton.removeEventListener('click', showCheckout);
    footerButton.addEventListener('click', completePayment);
    updateCheckoutTotals();

}

function hideCheckout() {

    toggleCartAndCheckout();
    footerButton.innerText = 'Checkout';
    footerButton.removeEventListener('click', completePayment);
    footerButton.addEventListener('click', showCheckout);
    updateFooterTotals();

}

function showCash() {
    cashDiv.className = 'visible';
    cardDiv.className = 'hidden';
}

function showCard() {
    cardDiv.className = 'visible';
    cashDiv.className = 'hidden';
}

function cashPayment() {
    // popup - 'please approve the following transaction:
    // total charge: $__
    // cash provided: $__
    // change: $__
    // if user hits 'approve/agree'
        // popup
            // thank you!
            // please take your change + show amount
            // please come again!
            // ok button - location.reload();
    // if user hits cancel
        // close popup
        // return to checkout screen

}

function cardPayment() {
    // popup - 'please approve the following transaction:
    // total charge: $__
    // card provided: xxxx-xxxx-xxxx-1234
    // if user hits 'approve/agree'
        // popup
            // thank you!
            // your card x1234 was charged ___
            // please come again!
            // ok button - location.reload();
    // if user hits cancel
        // close popup
        // return to checkout screen

}

function completePayment() {

    const paymentType = paymentButtons.querySelector('.visible').value;
    let complete = false;
    if (paymentType === 'cash') {
        complete = cashPayment();
    } else {    // value === 'card'
        complete = cardPayment();
    }

    // not sure if we need to put this in multiple functions or just one
    // will have to think about it
    // and whether payment functions need to return a bool or anything
    if (complete) {
        location.reload();
    }

}