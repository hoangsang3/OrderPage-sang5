const foods = [
    {
        name: "Bánh tráng muối",
        price: 10.0,
        quantity: 1,
    },
    {
        name: "Bánh tráng khô bò",
        price: 15.0,
        quantity: 1,
    },
    {
        name: "Bánh tráng lụi",
        price: 28.0,
        quantity: 1,
    },
];

function add() {
    foods.push({
        name: `Bánh tráng ${Math.random().toFixed(3)}`,
        quantity: 1,
        price: Math.random() * 50,
    });

    render();
}

function remove(index) {
    foods.splice(index, 1);
    render();
}

function updateQuantity(index, quantity) {
    if (quantity < 1) {
        return;
    }
    foods[index].quantity = quantity;
    render();
}

function render() {
    let subTotal = 0;
    foods.forEach((food) => {
        subTotal += food.quantity * food.price;
    });

    const shipping = 5.0;

    const total = subTotal + shipping;

    const html = foods
        .map(
            (food) =>
                `
		<li class="orderFood">
			<span class="orderFood-nameFood">${food.name} </span>

			<span class="orderFood-quantityFood">
				<button class="dec btnNumber">-</button>

				<input
					type="text"
					value="${food.quantity}"
					style="width: 3rem; text-align: center; border: none"
					class="quantity"
				/>

				<button class="inc btnNumber" >+</button>
			</span>

			<span class="orderFood-priceFood">
				<span>${(food.quantity * food.price).toFixed(3)}</span> VND</span>
				<button class="delete btnX">x</button>
			</span>
		</li>
				`
        )
        .join("");
    $(".orderFoods").innerHTML = html;

    const deleteButtons = [...$$(".delete")];

    const decButtons = [...$$(".dec")];
    const incButtons = [...$$(".inc")];

    for (let i = 0; i < deleteButtons.length; i++) {
        decButtons[i].addEventListener("click", () => {
            updateQuantity(i, foods[i].quantity - 1);
        });

        incButtons[i].addEventListener("click", () => {
            updateQuantity(i, foods[i].quantity + 1);
        });

        deleteButtons[i].addEventListener("click", () => {
            remove(i);
        });
    }

    $("#subTotal").innerText = `${subTotal.toFixed(3)} VND`;
    $("#shipping").innerText = `${shipping.toFixed(3)} VND`;
    $("#total").innerText = `${total.toFixed(3)} VND`;
}

$("#btnAdd").addEventListener("click", () => {
    add();
});

render();
