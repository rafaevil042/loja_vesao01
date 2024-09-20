let cart = [];
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// Função para adicionar produto ao carrinho
function addToCart(productName, productPrice) {
  const product = { name: productName, price: parseFloat(productPrice) };
  cart.push(product);
  updateCart();
}

// Função para atualizar o carrinho
function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((product, index) => {
    const item = document.createElement('div');
    item.textContent = `${product.name} - R$ ${product.price.toFixed(2)}`;
    cartItems.appendChild(item);
    total += product.price;
  });

  cartTotal.textContent = total.toFixed(2);
}

// Função para finalizar o pedido via WhatsApp
function checkout() {
  if (cart.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  let orderText = 'Òla gostaria de fechar esse pedido:\n';
  let total = 0;

  cart.forEach((product) => {
    orderText += `${product.name} - R$ ${product.price.toFixed(2)}\n`;
    total += product.price;
  });

  orderText += `Total: R$ ${total.toFixed(2)}`;

  const whatsappNumber = '+55085981791544'; // Substitua pelo seu número
  const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(orderText)}`;
  
  window.open(whatsappURL, '_blank');
}

// Adiciona event listeners aos botões de "Adicionar ao Carrinho"
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
  button.addEventListener('click', (event) => {
    const productElement = event.target.closest('.product');
    const productName = productElement.getAttribute('data-name');
    const productPrice = productElement.getAttribute('data-price');
    addToCart(productName, productPrice);
  });
});

// Event listener para o botão de finalizar pedido
checkoutBtn.addEventListener('click', checkout);

