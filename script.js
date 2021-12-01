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
const popupText = document.getElementById('popup-text');
const startOver = document.getElementById('start-over');

const productArr = [];
const cartArr = [];

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
backToCheckout.addEventListener('click', hideReview);
// cashInput.addEventListener('input', validateCash);
// cardNumber.addEventListener('input', validateCardNumber);
// expDate.addEventListener('input', validateExpDate);
// cvv.addEventListener('input', validateCvv);
startOver.addEventListener('click', reloadPage);

function createProducts() {

    productArr.push(new Product("Hot Coffee", "Coffee",
        "Our famous house blend, freshly ground and brewed hot.",
        2.49, "images/coffee.jpg"));
    productArr.push(new Product("Iced Coffee", "Coffee",
        "Our famous house blend, freshly ground and brewed cold.",
        2.49, "images/iced-coffee.jpg"));
    productArr.push(new Product("Black Tea", "Other Drinks",
        "Enjoy a strong, bold, rich cup of black tea. Brewed hot.",
        1.99, "images/black-tea.jpg"));
    productArr.push(new Product("Green Tea", "Other Drinks",
        "Enjoy a refreshing cup of green tea. Brewed hot.",
        1.99, "images/green-tea.jpg"));
    productArr.push(new Product("Orange Juice", "Other Drinks",
        "Made from fresh Florida-grown oranges!",
        1.99, "images/orange-juice.jpg"));
    productArr.push(new Product("Bagel", "Baked Goods",
        "New York style bagel, topped with butter or cream cheese.",
        2.99, "images/bagel.jpg"));
    productArr.push(new Product("Donut", "Baked Goods",
        "Baked fresh daily, with a rotating selection of styles and flavors!",
        2.99, "images/donut.jpg"));
    productArr.push(new Product("Scone", "Baked Goods",
        "Enjoy a taste of England! Includes butter, jam, or cream.",
        2.99, "images/scone.jpg"));
    productArr.push(new Product("Muffin", "Baked Goods",
        "Baked fresh daily, with a rotating selection of styles and flavors!",
        2.99, "images/muffin.jpg"));
    productArr.push(new Product("Avocado Toast", "Sandwiches",
        "Seasoned avocado mash spread on fresh whole-grain bread.",
        5.99, "images/avocado-toast.jpg"));
    productArr.push(new Product("Breakfast Sandwich", "Sandwiches",
        "Vegan patty on bread, topped with hummus, avocado, and veggies.",
        7.99, "images/breakfast-sandwich.jpg"));

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

        const productName = document.createElement('h3');
        productName.classList.add('name');
        productName.innerText = product.name;
        productHeader.appendChild(productName);

        const productPrice = document.createElement('data');
        productPrice.classList.add('price');
        productPrice.innerText = `$${product.price.toFixed(2)}`;
        productPrice.value = product.price;
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
            case "Coffee":
                coffeeSection.appendChild(productDiv);
                break;
            case "Other Drinks":
                otherDrinksSection.appendChild(productDiv);
                break;
            case "Baked Goods":
                bakedGoodsSection.appendChild(productDiv);
                break;
            case "Sandwiches":
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
    footerItemCount.value = items;
    footerItemCount.innerText = items;
    footerTotal.value = cost;
    footerTotal.innerText = `$${parseFloat(cost).toFixed(2)}*`

}

function addToCart(event) {

    const productDiv = event.target.parentNode.parentNode.parentNode;
    const name = productDiv.querySelector('.name').innerText;
    const category = productDiv.parentNode.querySelector('h3').innerText;
    const description = productDiv.querySelector('.description').innerText;
    const price = parseFloat(productDiv.querySelector('.price').value);
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
    const index = cartArr.findIndex(p => p.name === productName);
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

function toggleHidden(element1, element2) {
    
    element1.hidden = !element1.hidden;
    element2.hidden = !element2.hidden;

}

function showCart() {

    toggleHidden(menuDiv, cartDiv);
    footerButton.innerText = "Checkout";
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

        const productName = document.createElement('h3');
        productName.classList.add('name');
        productName.innerText = product.name;
        productHeader.appendChild(productName);

        const productPrice = document.createElement('data');
        productPrice.classList.add('price');
        productPrice.innerText = `$${product.price.toFixed(2)}`;
        productPrice.value = product.price;
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

    toggleHidden(menuDiv, cartDiv);
    footerButton.innerText = "View Order";
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
    const subtotal = parseFloat(footerTotal.value);
    const tax = parseFloat((subtotal * 0.06).toFixed(2));
    const total = subtotal + tax;
    const tipButton = tipButtons.querySelector('.clicked');
    let tipPercent = 0.00;
    let tip = 0.00;
    if (tipButton.id === "tip-other") {
        customTipDiv.hidden = false;
        const tipType = customTipButtons.querySelector('.clicked').innerText;
        if (tipType === '%') {
            tipPercent = parseFloat(customTipEntry.value / 100);
            tip = parseFloat((total * tipPercent).toFixed(2));
        } else {
            tip = parseFloat(customTipEntry.value);
        }
    } else {
        customTipDiv.hidden = true;
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

    toggleHidden(cartDiv, checkoutDiv);
    footerButton.innerText = "Review Payment";
    footerButton.removeEventListener('click', showCheckout);
    footerButton.addEventListener('click', showReview);
    updateCheckoutTotals();

}

function hideCheckout() {

    toggleHidden(cartDiv, checkoutDiv);
    footerButton.innerText = "Checkout";
    footerButton.removeEventListener('click', showReview);
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

// function validateCash(event) {

//     const input = event.target;
//     const decimalIndex = input.value.indexOf('.');

//     if (decimalIndex !== -1) {
//         if (decimalIndex === input.value.length - 4) {
//             input.value = input.value.substr(0, input.value.length - 1);
//         }
//     }

// }

// function validateCardNumber(event) {
    
//     const input = event.target;
//     const length = input.value.length;
//     const maxChars = 16;

//     if (length > maxChars) {
//         input.value = input.value.substr(0, maxChars);
//     }

//     // const input = event.target;
//     // const length = input.value.length;
//     // let inputPosition = input.selectionStart;
//     // const newChar = input.value[inputPosition - 1];

//     // // console.log(inputPosition);
//     // // console.log(newChar);

//     // if (isNaN(newChar) || newChar === " ") {
//     //     input.value = input.value.substr(0, length - 1);
//     // } else if (length > 19) {
//     //     input.value = input.value.substr(0, length - 1);
//     // }
//     // else {
//     //     let newStr = "";
//     //     let count = 0;
//     //     for (let i = 0; i < length; i++) {
//     //         const char = input.value[i];
//     //         if (char !== " ") {
//     //             count++;
//     //             newStr += char;
//     //             if (count === 4 || count === 8 || count === 12) {
//     //                 newStr += " ";
//     //                 inputPosition++;
//     //             }
//     //         }
//     //     }
    
//     //     input.value = newStr;
//     //     input.setSelectionRange(inputPosition, inputPosition);
//     // }

// }

// function validateExpDate(event) {

//     const input = event.target;
//     const length = input.value.length;
//     const maxChars = 4;

//     if (length > maxChars) {
//         input.value = input.value.substr(0, maxChars);
//     }

// }

// function validateCvv(event) {

//     const input = event.target;
//     const length = input.value.length;
//     const maxChars = 4;

//     if (length > maxChars) {
//         input.value = input.value.substr(0, maxChars);
//     }

//     // let inputPosition = input.selectionStart;

//     // if (length > 4) {
//     //     input.value.splice(inputPosition - 1);
//     // }

// }

function showReview() {

    const paymentType = paymentButtons.querySelector('.clicked').value;

    toggleHidden(checkoutDiv, confirmPayment);

    footerButton.innerText = "Submit Payment";
    footerButton.removeEventListener('click', showReview);
    footerButton.addEventListener('click', submitPayment);

    const row1 = document.createElement('div');
    row1.className = 'row';
    orderSummary.appendChild(row1);

    const row1Name = document.createElement('h3');
    row1Name.innerText = "Order Total";
    row1.appendChild(row1Name);

    const total = parseFloat(footerTotal.value);
    const row1Value = document.createElement('h3');
    row1Value.innerText = `$${total.toFixed(2)}`;
    row1.appendChild(row1Value);

    const row2 = document.createElement('div');
    row2.className = 'row';
    orderSummary.appendChild(row2);

    const row2Name = document.createElement('h3');
    row2.appendChild(row2Name);

    const row2Value = document.createElement('h3');
    row2.appendChild(row2Value);

    const row3 = document.createElement('div');
    row3.className = 'row';
    orderSummary.appendChild(row3);

    const row3Name = document.createElement('h3');
    row3.appendChild(row3Name);

    const row3Value = document.createElement('h3');
    row3.appendChild(row3Value);

    if (paymentType === "cash") {

        const cashPaid = parseFloat(cashInput.value);
        const changeDue = cashPaid - total;

        row2Name.innerText = "Cash Paid";
        row2Value.innerText = `$${cashPaid.toFixed(2)}`;
        row3Name.innerText = "Change";
        row3Value.innerText = `$${changeDue.toFixed(2)}`;

    } else {

        const cardNum = "x" + cardNumber.value.toString().substr(12);
        row2Name.innerText = "Card Ending";
        row2Value.innerText = cardNum;
        row3Name.innerText = "Expiration Date";
        row3Value.innerText = expDate.value;

    }

    // CASH PAYMENT
    // if user hits 'approve/agree'
    // popup
    // thank you!
    // please take your change + show amount
    // please come again!
    // ok button - location.reload();
    // if user hits cancel
    // close popup
    // return to checkout screen

    // CARD PAYMENT
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

function hideReview() {

    while (orderSummary.firstChild) {
        orderSummary.removeChild(orderSummary.firstChild);
    }

    toggleHidden(checkoutDiv, confirmPayment);

    footerButton.innerText = "Review Payment";
    footerButton.removeEventListener('click', submitPayment);
    footerButton.addEventListener('click', showReview);

}

function submitPayment() {

    wrapperDiv.className = 'blur';
    popupDiv.hidden = false;
    
    if (orderSummary.children[2].children[0].innerText === "Change") {
        popupText.innerText = "Don't forget to take your change."
    } else {
        popupText.innerText = "Your card was successfully charged."
    }

}

function reloadPage() {
    location.reload();
}