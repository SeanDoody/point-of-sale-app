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

const wrapperDiv = document.getElementById('wrapper');

const menuDiv = document.getElementById('menu');
const coffeeSection = document.getElementById('coffee');
const otherDrinksSection = document.getElementById('other-drinks');
const bakedGoodsSection = document.getElementById('baked-goods');
const otherFoodsSection = document.getElementById('other-foods');

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

const cashPrompt = document.getElementById('cash-prompt');
const cashInput = document.getElementById('cash-input');

const cardPrompt = document.getElementById('card-prompt');
const cardNumber = document.getElementById('card-number');
const expDate = document.getElementById('exp-date');
const cvv = document.getElementById('cvv');

const confirmPayment = document.getElementById('confirm-payment');
const orderSummary = document.getElementById('order-summary');
const backToCheckout = document.getElementById('back-to-checkout');

const footerButton = document.getElementById('footer-button');
const footerItemCount = document.getElementById('footer-item-count');
const footerTotal = document.getElementById('footer-total');

const popupDiv = document.getElementById('popup');
const popupHeader = document.getElementById('popup-header');
const popupText = document.getElementById('popup-text');
const popupButton = document.getElementById('popup-button');

const productArr = [];
const cartArr = [];

createProducts();
buildMenu();

footerButton.addEventListener('click', showCart);
backToMenu.addEventListener('click', hideCart);
backToCart.addEventListener('click', hideCheckout);
tipButtons.addEventListener('click', toggleClicked);
customTipButtons.addEventListener('click', toggleClicked);
paymentButtons.addEventListener('click', toggleClicked);
customTipEntry.addEventListener('change', updateCheckoutTotals);
cashButton.addEventListener('click', showCash);
cardButton.addEventListener('click', showCard);
backToCheckout.addEventListener('click', hideReview);
cashInput.addEventListener('input', validateCash);
cardNumber.addEventListener('input', validateCardNumber);
expDate.addEventListener('input', validateExpDate);
cvv.addEventListener('input', validateCvv);

function createProducts() {

    productArr.push(new Product('Hot Coffee', 'Coffee',
        'Our famous house blend, freshly ground and brewed hot.',
        2.49, 'images/coffee.jpg'));

    productArr.push(new Product('Iced Coffee', 'Coffee',
        'Our famous house blend, freshly ground and brewed cold.',
        2.49, 'images/iced-coffee.jpg'));

    productArr.push(new Product('Black Tea', 'Other Drinks',
        'Enjoy a strong, bold, rich cup of black tea. Brewed hot.',
        1.99, 'images/black-tea.jpg'));

    productArr.push(new Product('Green Tea', 'Other Drinks',
        'Enjoy a refreshing cup of our green tea. Brewed hot.',
        1.99, 'images/green-tea.jpg'));

    productArr.push(new Product('Orange Juice', 'Other Drinks',
        'Our OJ is squeezed daily from fresh, Florida-grown oranges!',
        1.99, 'images/orange-juice.jpg'));

    productArr.push(new Product('Bagel', 'Baked Goods',
        'New York style bagel, topped with butter or cream cheese.',
        2.99, 'images/bagel.jpg'));

    productArr.push(new Product('Donut', 'Baked Goods',
        'Baked fresh daily, with a rotating selection of styles and flavors!',
        2.99, 'images/donut.jpg'));

    productArr.push(new Product('Scone', 'Baked Goods',
        'Enjoy a taste of England! Includes butter, jam, or cream.',
        2.99, 'images/scone.jpg'));

    productArr.push(new Product('Muffin', 'Baked Goods',
        'Baked fresh daily, with a rotating selection of styles and flavors!',
        2.99, 'images/muffin.jpg'));

    productArr.push(new Product('Avocado Toast', 'Other Foods',
        'Seasoned avocado mash spread on fresh whole-grain bread.',
        5.99, 'images/avocado-toast.jpg'));

    productArr.push(new Product('Sandwich', 'Other Foods',
        'Vegan patty on bread, topped with hummus, avocado, and veggies.',
        7.99, 'images/sandwich.jpg'));

}

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

        const productDesc = document.createElement('p');
        productDesc.classList.add('product-description');
        productDesc.innerText = product.description;
        productText.appendChild(productDesc);

        const productFooter = document.createElement('div');
        productFooter.classList.add('product-footer');
        productText.appendChild(productFooter);

        const productName = document.createElement('h3');
        productName.classList.add('product-name');
        productName.innerText = product.name;
        productHeader.appendChild(productName);

        const productPriceHeader = document.createElement('data');
        productPriceHeader.classList.add('product-price-header');
        productPriceHeader.innerText = `$${product.price.toFixed(2)}`;
        productPriceHeader.value = product.price;
        productHeader.appendChild(productPriceHeader);

        const productPriceFooter = document.createElement('data');
        productPriceFooter.classList.add('product-price-footer');
        productPriceFooter.innerText = `$${product.price.toFixed(2)}`;
        productPriceFooter.value = product.price;
        productFooter.appendChild(productPriceFooter);

        const qtySelect = document.createElement('select');
        productFooter.appendChild(qtySelect);

        for (let i = 1; i <= 99; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.text = i;
            qtySelect.appendChild(option);
        }

        const plusIcon = document.createElement('i');
        plusIcon.className = 'fas fa-plus-square';
        plusIcon.addEventListener('click', addToCart);
        productFooter.appendChild(plusIcon);

        const cartButton = document.createElement('button');
        cartButton.innerText = 'Add to Cart';
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
            case 'Other Foods':
                otherFoodsSection.appendChild(productDiv);
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

    cost = parseFloat(cost.toFixed(2));

    footerItemCount.value = items;
    footerItemCount.innerText = items;
    footerTotal.value = cost;
    footerTotal.innerText = `$${cost.toFixed(2)}*`

}

function addToCart(event) {

    const productDiv = event.target.parentNode.parentNode.parentNode;
    const name = productDiv.querySelector('.product-name').innerText;
    const category = productDiv.parentNode.querySelector('h3').innerText;
    const description = productDiv.querySelector('.product-description').innerText;
    const price = parseFloat(productDiv.querySelector('.product-price-header').value);
    const picture = productDiv.querySelector('img').src;
    const buttonType = event.target.nodeName;
    let quantity = 1;

    if (buttonType === 'BUTTON') {
        quantity = parseInt(productDiv.querySelector('select').value);
    }

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

    const newQuantity = parseInt(event.target.value);
    const product = event.target.parentNode.parentNode.parentNode;
    const productName = product.querySelector('.product-name').innerText;
    const index = cartArr.findIndex(p => p.name === productName);
    cartArr[index].quantity = newQuantity;
    updateFooterTotals();

}

function subtractFromCart(event) {

    const product = event.target.parentNode.parentNode.parentNode;
    const productName = product.querySelector('.product-name').innerText;
    const index = cartArr.findIndex(p => p.name === productName);

    console.log(cartArr[index].quantity);
    console.log()

    if (cartArr[index].quantity === 1) {
        cartArr.splice(index, 1);
        product.remove();
    } else {
        cartArr[index].quantity--;
        const productPriceFooter = product.querySelector('.product-price-footer');
        productPriceFooter.innerText = `$${cartArr[index].price.toFixed(2)} x ${cartArr[index].quantity}`;
    }

    updateFooterTotals();

    if (cartArr.length === 0) {
        const emptyCart = document.createElement('p');
        emptyCart.id = 'cart-message';
        emptyCart.innerText = 'Your cart is empty.';
        cartItems.appendChild(emptyCart);
    }

}

function removeFromCart(event) {

    const product = event.target.parentNode.parentNode.parentNode;
    const productName = product.querySelector('.product-name').innerText;
    const index = cartArr.findIndex(p => p.name === productName);

    cartArr.splice(index, 1);
    product.remove();
    updateFooterTotals();

    if (cartArr.length === 0) {
        const emptyCart = document.createElement('p');
        emptyCart.id = 'cart-message';
        emptyCart.innerText = 'Your cart is empty.';
        cartItems.appendChild(emptyCart);
    }

}

function toggleHidden(element1, element2) {

    element1.hidden = !element1.hidden;
    element2.hidden = !element2.hidden;

}

function showCart() {

    toggleHidden(menuDiv, cartDiv);
    footerButton.innerText = 'Checkout';
    footerButton.removeEventListener('click', showCart);
    footerButton.addEventListener('click', showCheckout);

    if (cartArr.length === 0) {

        const emptyCart = document.createElement('p');
        emptyCart.id = 'cart-message';
        emptyCart.innerText = 'Your cart is empty.';
        cartItems.appendChild(emptyCart);

    } else {

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

            const productDesc = document.createElement('p');
            productDesc.classList.add('product-description');
            productDesc.innerText = product.description;
            productText.appendChild(productDesc);

            const productFooter = document.createElement('div');
            productFooter.classList.add('product-footer');
            productText.appendChild(productFooter);

            const productName = document.createElement('h3');
            productName.classList.add('product-name');
            productName.innerText = product.name;
            productHeader.appendChild(productName);

            const productPriceFooter = document.createElement('data');
            productPriceFooter.classList.add('product-price-footer');
            productPriceFooter.innerText = `$${product.price.toFixed(2)} x ${product.quantity}`;
            productPriceFooter.value = product.price;
            productFooter.appendChild(productPriceFooter);

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

            const minusIcon = document.createElement('i');
            minusIcon.className = 'fas fa-minus-square';
            minusIcon.addEventListener('click', subtractFromCart);
            productFooter.appendChild(minusIcon);

            const removeButton = document.createElement('button');
            removeButton.innerText = 'Remove from Cart';
            removeButton.classList.add('remove-from-cart');
            removeButton.addEventListener('click', removeFromCart);
            productFooter.appendChild(removeButton);

            cartItems.appendChild(productDiv);

        }

    }

}

function hideCart() {

    toggleHidden(menuDiv, cartDiv);
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

    if (parent !== clicked) {
        for (let i = 0; i < parent.children.length; i++) {
            parent.children[i].classList.remove('clicked');
            parent.children[i].classList.add('not-clicked');
        }
        clicked.classList.remove('not-clicked');
        clicked.classList.add('clicked');
        updateCheckoutTotals();
    }

}

function updateCheckoutTotals() {

    updateFooterTotals();

    const subtotal = parseFloat(footerTotal.value);
    const tax = parseFloat((subtotal * 0.06).toFixed(2));
    const total = parseFloat((subtotal + tax).toFixed(2));
    const tipButton = tipButtons.querySelector('.clicked');
    let tipPercent = 0.00;
    let tip = 0.00;

    if (tipButton.id === 'tip-other') {

        customTipDiv.hidden = false;
        const tipType = customTipButtons.querySelector('.clicked').value;

        if (customTipEntry.value.length > 0) {

            if (tipType === '%') {

                tipPercent = parseFloat(customTipEntry.value) / 100;
                tip = parseFloat((total * tipPercent).toFixed(2));

            } else {

                tip = parseFloat(customTipEntry.value);

            }
        }

    } else {

        customTipDiv.hidden = true;
        tipPercent = parseFloat(tipButton.value);
        tip = parseFloat((total * tipPercent).toFixed(2));

    }

    const grandTotal = parseFloat((total + tip).toFixed(2));

    checkoutSubtotal.value = subtotal;
    checkoutSubtotal.innerText = `$${subtotal.toFixed(2)}`;

    checkoutTax.value = tax;
    checkoutTax.innerText = `$${tax.toFixed(2)}`;

    checkoutTotal.value = total;
    checkoutTotal.innerText = `$${total.toFixed(2)}`;

    checkoutTip.value = tip;
    checkoutTip.innerText = `$${tip.toFixed(2)}`;

    checkoutGrandTotal.value = grandTotal;
    checkoutGrandTotal.innerText = `$${grandTotal.toFixed(2)}`;

    footerTotal.value = grandTotal;
    footerTotal.innerText = `$${grandTotal.toFixed(2)}`;

}

function showCheckout() {

    if (cartArr.length === 0) {
        showPopup('Error!', [ 'Nothing in cart! Add an item to continue to checkout.' ], hidePopup);
    } else {
        toggleHidden(cartDiv, checkoutDiv);
        footerButton.innerText = 'Review Payment';
        footerButton.removeEventListener('click', showCheckout);
        footerButton.addEventListener('click', validatePayment);
        updateCheckoutTotals();
    }

}

function hideCheckout() {

    toggleHidden(cartDiv, checkoutDiv);
    footerButton.innerText = 'Checkout';
    footerButton.removeEventListener('click', validatePayment);
    footerButton.addEventListener('click', showCheckout);
    updateFooterTotals();

}

function showCash() {

    cashPrompt.hidden = false;
    cardPrompt.hidden = true;

}

function showCard() {

    cardPrompt.hidden = false;
    cashPrompt.hidden = true;

}

function validateCash() {

    let inputValue = cashInput.value;
    let pass;
    
    if (inputValue === '') {

        pass = false;
        cashInput.className = 'error';

    } else {

        inputValue = parseFloat(parseFloat(inputValue).toFixed(2));
        cashInput.value = inputValue;
        const grandTotal = parseFloat(checkoutGrandTotal.value);
    
        if (inputValue < grandTotal) {
            pass = false;
            cashInput.className = 'error';
        } else {
            pass = true;
            cashInput.className = '';
        }
    
    }

    return pass;

}

function validateCardNumber() {

    const length = cardNumber.value.length;
    let pass;

    if (length === 15 || length === 16) {
        pass = true;
        cardNumber.className = '';
    } else {
        pass = false;
        cardNumber.className = 'error';
    }

    return pass;

}

function validateExpDate() {

    const inputValue = expDate.value;
    const length = inputValue.length;
    let pass;

    if (length === 5) {

        const firstTwo = parseInt(inputValue[0] + inputValue[1]);

        if (firstTwo >= 1 && firstTwo <= 12) {

            if (inputValue[2] = '/') {

                const lastTwo = parseInt(inputValue[3] + inputValue[4]);

                if (lastTwo >= 21 && lastTwo <= 30) {

                    pass = true;
                    expDate.className = '';

                }
            }
        }

    } else {

        pass = false;
        expDate.className = 'error';

    }

    return pass;

}

function validateCvv() {

    const length = cvv.value.length;
    let pass;

    if (length === 3 || length === 4) {
        pass = true;
        cvv.className = '';
    } else {
        pass = false;
        cvv.className = 'error';
    }

    return pass;

}


function validatePayment() {

    const paymentType = paymentButtons.querySelector('.clicked').value;
    let pass = true;
    const messages = [];

    if (paymentType === 'cash') {

        if (validateCash() === false) {

            pass = false;
            messages.push('Cash amount must be greater than or equal to amount due.')

        }

    } else {

        messages.push('Please correct the following issues:')

        if (validateCardNumber() === false) {
            pass = false;
            messages.push('Card number: 15-16 digits')
        }

        if (validateExpDate() === false) {
            pass = false;
            messages.push('Exp. date: mm/yy')
        }

        if (validateCvv() === false) {
            pass = false;
            messages.push('CVV: 3-4 digits')
        }

    }

    if (pass) {
        showReview();
    } else {
        showPopup('Error!', messages, hidePopup);
    }

}

function showPopup(title, messageArr, buttonEvent) {

    wrapperDiv.className = 'blur';
    popupDiv.hidden = false;
    popupHeader.innerText = title;
    popupButton.addEventListener('click', buttonEvent);

    for (let message of messageArr) {
        let newP = document.createElement('p');
        newP.innerText = message;
        popupText.appendChild(newP);
    }

}

function hidePopup() {

    while (popupText.firstChild) {
        popupText.removeChild(popupText.firstChild);
    }
    popupDiv.hidden = true;
    wrapperDiv.className = '';
    popupButton.removeEventListener('click', hidePopup);

}

function showReview() {

    const paymentType = paymentButtons.querySelector('.clicked').value;

    toggleHidden(checkoutDiv, confirmPayment);

    footerButton.innerText = 'Submit Payment';
    footerButton.removeEventListener('click', validatePayment);
    footerButton.addEventListener('click', submitPayment);

    const row1 = document.createElement('div');
    row1.className = 'row';
    orderSummary.appendChild(row1);

    const row1Name = document.createElement('span');
    row1Name.innerText = 'Order Total';
    row1.appendChild(row1Name);

    const total = parseFloat(footerTotal.value);
    const row1Value = document.createElement('data');
    row1Value.value = total;
    row1Value.innerText = `$${total.toFixed(2)}`;
    row1.appendChild(row1Value);

    const row2 = document.createElement('div');
    row2.className = 'row';
    orderSummary.appendChild(row2);

    const row2Name = document.createElement('span');
    row2.appendChild(row2Name);

    const row2Value = document.createElement('data');
    row2.appendChild(row2Value);

    const row3 = document.createElement('div');
    row3.className = 'row';
    orderSummary.appendChild(row3);

    const row3Name = document.createElement('span');
    row3.appendChild(row3Name);

    const row3Value = document.createElement('data');
    row3.appendChild(row3Value);

    if (paymentType === 'cash') {

        const cashPaid = parseFloat(cashInput.value);
        const changeDue = cashPaid - total;

        row2Name.innerText = 'Cash Paid';
        row2Value.value = cashPaid;
        row2Value.innerText = `$${cashPaid.toFixed(2)}`;
        row3Name.innerText = 'Change';
        row3Value.value = changeDue;
        row3Value.innerText = `$${changeDue.toFixed(2)}`;

    } else {

        let cardNum = cardNumber.value.toString();
        cardNum = 'x' + cardNum.substr(cardNum.length - 4);
        row2Name.innerText = 'Card Ending';
        row2Value.innerText = cardNum;
        row3Name.innerText = 'Expiration Date';
        row3Value.innerText = expDate.value;

    }

}

function hideReview() {

    while (orderSummary.firstChild) {
        orderSummary.removeChild(orderSummary.firstChild);
    }

    toggleHidden(checkoutDiv, confirmPayment);

    footerButton.innerText = 'Review Payment';
    footerButton.removeEventListener('click', submitPayment);
    footerButton.addEventListener('click', validatePayment);

}

function reloadPage() {

    location.reload();
    
}

function submitPayment() {

    const messages = [];
    let payMessage = '';

    if (orderSummary.children[2].children[0].innerText === 'Change') {
        payMessage = 'Don\'t forget to take your change.'
    } else {
        payMessage = 'Your card was successfully charged.'
    }

    messages.push(payMessage);
    messages.push('Please come again!');

    showPopup('Thank You!', messages, reloadPage);

}