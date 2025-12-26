let cart = [];
let total = 0;
let lang = "en";

function addToCart(name, price, qtyId) {
    let qty = parseInt(document.getElementById(qtyId).value);
    cart.push({ name, price, qty });
    total += price * qty;
    renderCart();
}

function renderCart() {
    let list = document.getElementById("cartItems");
    list.innerHTML = "";
    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${item.name} (${item.qty}) - ₹${item.price * item.qty}
            <span class="remove" onclick="removeItem(${index})">❌</span>
        `;
        list.appendChild(li);
    });
    document.getElementById("total").innerText = `Total: ₹${total}`;
}

function removeItem(index) {
    total -= cart[index].price * cart[index].qty;
    cart.splice(index, 1);
    renderCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }

    let name = prompt(lang === "mr" ? "आपले नाव टाका" : "Enter your name");
    let address = prompt(lang === "mr" ? "पत्ता टाका" : "Enter address");

    let message = lang === "mr"
        ? `मनुश्री क्लिनिंग प्रॉडक्ट्स ऑर्डर%0Aनाव: ${name}%0Aपत्ता: ${address}%0Aउत्पादने:%0A`
        : `Order from Manushree Cleaning Products%0AName: ${name}%0AAddress: ${address}%0AProducts:%0A`;

    cart.forEach(i => {
        message += `- ${i.name} x ${i.qty} = ₹${i.price * i.qty}%0A`;
    });

    message += lang === "mr"
        ? `एकूण रक्कम: ₹${total}`
        : `Total Amount: ₹${total}`;

    window.open(`https://wa.me/919767137660?text=${message}`, "_blank");
}

function setLanguage(l) {
    lang = l;
    document.getElementById("title").innerText =
        l === "mr" ? "मनुश्री क्लिनिंग प्रॉडक्ट सप्लायर्स" : "Manushree Cleaning Product Suppliers";
    document.getElementById("subtitle").innerText =
        l === "mr" ? "घरगुती स्वच्छता उत्पादने" : "Quality Home & Cleaning Products";
    document.getElementById("cartTitle").innerText =
        l === "mr" ? "खरेदी यादी" : "Cart";
}
