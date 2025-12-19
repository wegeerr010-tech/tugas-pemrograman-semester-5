let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');


window.onscroll = () => {

    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

    section.forEach(sec => {

        let top = window.scrollY;
        let height = sec.offsetHeight;
        let offset = sec.offsetTop - 150;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header .navbar a[href*=' + id + ']').classList.add('active');
            });
        };

    });


}

document.querySelector('#search-icon').onclick = () => {
    document.querySelector('#search-form').classList.toggle('active');
}

document.querySelector('#close').onclick = () => {
    document.querySelector('#search-form').classList.remove('active');
}

var swiper = new Swiper(".home-slider", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
});


var swiper = new Swiper(".review-slider", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    loop: true,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        640: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});




// CART 


// OPEN & CLOSE CART
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");


cartIcon.addEventListener('click', () => {
    cart.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cart.classList.remove('active');
});



// Start when the document is ready
if (document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}



// <<< START >>>

function start() {
    addEvents();
}

// <<< UPDATE & RERENDER >>>
function update() {
    addEvents();
    updateTotal();
}

// <<< ADD EVENTS >>>
function addEvents() {
    // remove items from cart
    let cartRemove_btns = document.querySelectorAll(".cart-remove");
    console.log(cartRemove_btns);
    cartRemove_btns.forEach(btn => {
        btn.addEventListener("click", handle_removeCartItem);
    });

    // change item quantity
    let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
    cartQuantity_inputs.forEach(input => {
        input.addEventListener("change", handle_changeItemQuantity);
    })


    // add item to cart
    let addCart_btns = document.querySelectorAll(".btn-cart");
    addCart_btns.forEach(btn => {
        btn.addEventListener("click", handle_addCartItem);
    });


    // buy order
    const buy_btn = document.querySelector(".btn-buy");
    buy_btn.addEventListener("click", handle_buyOrder);
}


// <<< HANDLE EVENTS FUNCTION >>>

let itemAdded = []

function handle_addCartItem() {
    cart.classList.add('active');
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".price").innerHTML;
    // const gambar = document.querySelector(".product-img");
    let imgSrc = document.querySelector(".product-img").src;
    console.log(title, price, imgSrc);


    let newToAdd = {
        title,
        price,
        imgSrc
    };


    // hendle item is already exist
    if (itemAdded.find(el => el.title == newToAdd.title)) {
        alert("This Item Is Already Exist!")
        return;
    } else {
        itemAdded.push(newToAdd);
    }



    // Add product to cart
    let cartBoxElement = CartBoxComponent(title, price,imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);


    update();
}

function handle_removeCartItem() {
    this.parentElement.remove();
    itemAdded = itemAdded.filter(el => el.title != this.parentElement.querySelector(".cart-product-title").innerHTML);

    update();
}

function handle_changeItemQuantity() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value); //to keep it integer

    update();
}


function handle_buyOrder() {
    if (itemAdded.length <= 0) {
        alert("There is No Order to Place Yet \n Please Make an Order First. ");
        return;
    }

    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = '';
    alert("Your Order is Placed Successfully :)");
    itemAdded = [];

    update();
}


// <<< UPDATE & RERENDER FUNTIONS >>>
function updateTotal() {
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector(".total-price");
    let total = 0;
    cartBoxes.forEach(cartBox => {
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("Rp", ""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
    });


    // keep 2 digits after the decimal
    total = total.toFixed(2);
    // or you can use also
    total = Math.round(total * 100) / 100;

    totalElement.innerHTML = "Rp" + total;

}


// <<< HTML COMPONENTS >>
function CartBoxComponent(title, price, imgSrc) {
    return `
    <div class="cart-box">
    <img src="${imgSrc}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- remove cart -->
        <i class="fa fa-trash cart-remove"></i>
</div>`;
}


// CART


// kalkulator

const calcuIcon = document.querySelector("#kalku-icon");
const kalku = document.querySelector(".kalkulator");

if (kalku) {
    calcuIcon.addEventListener('click', () => {
        kalku.classList.toggle('active');
    });
} else {
    closekalku.addEventListener('click', () => {
        kalku.classList.remove('active');
    });
}


function clearScrean() {
    document.getElementById("result").value = "";
}
function display(value) {
    document.getElementById("result").value += value;
}
function calculate() {
    var a = document.getElementById("result").value;
    var b = eval(a);
    document.getElementById("result").value = b;
}
// kalkulator