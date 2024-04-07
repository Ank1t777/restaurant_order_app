import menuArray from './data.js';

let orderList = [];

function getMenu() {
    let menuListItems = '';
    menuArray.forEach(item => {
        menuListItems += `
            <section class="second-section">
                <h2 id="food-pic">${item.emoji}</h2>
                <div class="items">
                    <h3>${item.name}</h3>
                    <p>${item.ingredients}</p>
                    <h4>$${item.price}</h4>
                </div>
                <div id="add-button-container">
                    <button class="add-button" data-foodidaadd="${item.id}">+</button>
                </div>
            </section>
            <hr id="item-menu-line">`;
    });
    return menuListItems;
}

function addItemOrder(item) {
    const existingItemIndex = orderList.findIndex(orderItem => orderItem.id === item.id);
    if (existingItemIndex !== -1) {
        orderList[existingItemIndex].quantity++; // Increment quantity if the item already exists in the order list
    } else {
        orderList.push({ ...item, quantity: 1 }); // Add new item to the order list with quantity 1
    }
    render();
}

function removeItemOrder(item) {
    const existingItemIndex = orderList.findIndex(orderItem => orderItem.id === item.id);
    if(existingItemIndex != -1)
    {
        orderList[existingItemIndex].quantity--;
    }
    if(orderList[existingItemIndex].quantity === 0)
    {
        orderList.splice(existingItemIndex, 1)
    }
    //console.log(orderList[existingItemIndex].quantity--)
    render();
}

function checkoutOrder() {
    let total = 0;
    let orderItems = [];

    // Include the header
    orderItems.push('<h3 id="order-header">Your order\'s</h3>');

    orderList.forEach(item => {
        let orderItemHTML = `
            <div class="order-label">
                <div class="order-item">
                    <div class="order-names"><h3>${item.name} (x${item.quantity})</h3><button class="remove-button" data-foodremove="${item.id}">-</button></div>
                    <div class="order-name-price"><h3>$${item.price * item.quantity}</h3></div>
                </div>
            </div>`;
        orderItems.push(orderItemHTML);
        total += item.price * item.quantity; // Update total price considering quantity
    });

    let ordersHTML = `
        <div class="orders" id="orders">
            ${orderItems.join('')}
            <hr>
            <div class="order-items-total">
                <div class="total-order-name">
                    <h3>Total</h3>
                </div>
                <div class="total-order-price">
                    <h3>$${total.toFixed(2)}</h3>
                </div>
            </div>
            <div class="button">
                <button id="order-button">Complete Order</button>
            </div>
        </div>`;
    
    return ordersHTML;
}

function completeOrder()
{ 
                    return `
                        <div class="payment" id="payment">
                                <div class="card-details-header">
                                        <div class="header-section">
                                            <h2>Enter card details</h3>
                                        </div>
                                        <button id="close">x</button>
                                        <form id="card-details">
                                            <input type="text" id="name" placeholder="Enter your name" required>
                                           <input type="text" id="credit-card-input" placeholder="Enter your 16-digit credit card number" maxlength="16" required>
                                            <input type="password" id="cvv" placeholder="Enter CVV" required>
                                            <button id="payment-button">PAY</button>
                                        </form
                                    </div>
                            </div>`
}

function render() {
    
    document.getElementById('menu').innerHTML = getMenu();
    document.querySelectorAll('.add-button').forEach(button => {
        button.addEventListener('click', function() {
            console.log("added")
            const itemId = this.getAttribute('data-foodidaadd');
            const item = menuArray.find(item => item.id == itemId);
            if (item) {
                addItemOrder(item);
            }
        });
    });
    document.getElementById('orders').innerHTML = checkoutOrder();

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', function() {
            //console.log("removed")
            // Get the itemId from the button's data attribute
            const itemId = this.getAttribute('data-foodremove');
            const item = menuArray.find(item => item.id == itemId)
            if(item)
            {
                removeItemOrder(item);   
            }
        });
    });
    
    const totalPriceOrder = orderList.reduce((sum, item) => sum + item.price + item.quantity,0)
    document.getElementById('order-button').addEventListener('click', function() {
    const totalPriceOrder = orderList.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    if (totalPriceOrder > 0) {
        document.getElementById('payment-container').innerHTML = completeOrder();
    } else {
        document.getElementById('payment-container').innerHTML = '<h2>Please select items</h2>';
    }
});
    document.addEventListener('click', function(e){
        if(e.target.id === 'payment-button'){
            console.log("payment completed")
            alert(`woohoo! your order hs been placed`) 
        }
        if (e.target.id === 'close') {
        document.getElementById('payment-container').style.display = 'none'
        // Your close button handling code goes here
        if(event.target.id === 'order-button') 
            {                              
                if (totalPriceOrder > 0) {
                document.getElementById('payment-container').innerHTML = completeOrder();
            } 
        else 
        {
            document.getElementById('payment-container').innerHTML = '<h2>Please select items</h2>';
        }
        }
    }
    })
    
}

render();
