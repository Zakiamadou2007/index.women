document.addEventListener('DOMContentLoaded', function () {
    var cartItemsContainer = document.getElementById('cart-items');
    var cartTotalElement = document.getElementById('cart-total');
    var checkoutButton = document.getElementById('checkout-button');
    var referrerSelect = document.getElementById('referrer');
    var cart = [];
    var total = 0;

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        cart.forEach(function(item, index) {
            var itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            
            var itemTitle = document.createElement('h6');
            itemTitle.textContent = item.title;
            
            var itemQuantity = document.createElement('input');
            itemQuantity.type = 'number';
            itemQuantity.value = item.quantity;
            itemQuantity.min = '1';
            itemQuantity.className = 'item-quantity';
            itemQuantity.addEventListener('change', function() {
                item.quantity = parseInt(this.value);
                updateTotal();
            });

            var itemPrice = document.createElement('span');
            itemPrice.textContent = item.price + ' franc CFA';

            var removeButton = document.createElement('span');
            removeButton.className = 'item-remove';
            removeButton.textContent = 'Supprimer';
            removeButton.addEventListener('click', function() {
                cart.splice(index, 1);
                updateCart();
                updateTotal();
            });

            itemElement.appendChild(itemTitle);
            itemElement.appendChild(itemQuantity);
            itemElement.appendChild(itemPrice);
            itemElement.appendChild(removeButton);
            cartItemsContainer.appendChild(itemElement);
        });

        updateTotal();
    }

    function updateTotal() {
        total = cart.reduce(function(sum, item) {
            return sum + (item.price * item.quantity);
        }, 0);

        cartTotalElement.textContent = total + ' franc CFA';
    }

    document.querySelectorAll('.add-to-cart').forEach(function(button) {
        button.addEventListener('click', function() {
            var title = this.getAttribute('data-title');
            var price = parseInt(this.getAttribute('data-price'));

            var existingItem = cart.find(function(item) {
                return item.title === title;
            });

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ title: title, price: price, quantity: 1 });
            }

            updateCart();
        });
    });

    checkoutButton.addEventListener('click', function() {
        var referrer = referrerSelect.value;
        if (!referrer) {
            alert('Veuillez sélectionner le nom de la personne qui vous a parlé de ce site.');
            return;
        }

        var emailBody = 'Bonjour,\n\nJe souhaite passer une commande avec les articles suivants:\n\n';
        cart.forEach(function(item) {
            emailBody += item.title + ' - Quantité: ' + item.quantity + '\n';
        });
        emailBody += '\nTotal: ' + total + ' franc CFA\n';
        emailBody += '\nJ\'ai appris l\'existence du site grâce à ' + referrer + '.\n\nMerci.';

        var mailtoLink = 'mailto:innovateon70@gmail.com?subject=Commande&body=' + encodeURIComponent(emailBody);
        window.location.href = mailtoLink;
    });
});

searchInput.addEventListener('input', function () {
    var searchText = searchInput.value.toLowerCase();
    var menuItems = document.querySelectorAll('.item');

    menuItems.forEach(function (menuItem) {
        var productTitle = menuItem.querySelector('h3').textContent.toLowerCase();
        var isVisible = productTitle.includes(searchText);

        menuItem.style.display = isVisible ? 'block' : 'none';
    });
});