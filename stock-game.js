document.addEventListener("DOMContentLoaded", function () {
    let stockData = [{ time: 0, price: 100 }];
    let balance = 100;
    let invested = 0;
    let shares = 0;
    let time = 0;
    let gameOver = false;
    const maxDays = 252; // One year of trading days

    const canvas = document.createElement("canvas");
    canvas.id = "stockGameCanvas";
    document.getElementById("stock-game").appendChild(canvas);
    const ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 300;

    function updateStockPrice() {
        if (time >= maxDays) {
            gameOver = true;
            return;
        }
        time++;
        let lastPrice = stockData[stockData.length - 1].price;
        let change = (Math.random() - 0.5) * 5;
        let newPrice = Math.max(50, lastPrice + change);
        stockData.push({ time, price: newPrice });
        drawGraph();
    }

    function drawGraph() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(0, canvas.height - stockData[0].price);
        stockData.forEach((point, index) => {
            let x = (index / maxDays) * canvas.width;
            let y = canvas.height - point.price;
            ctx.lineTo(x, y);
        });
        ctx.strokeStyle = "#666";
        ctx.stroke();
    }

    function buy() {
        if (!gameOver) {
            let currentPrice = stockData[stockData.length - 1].price;
            let boughtShares = balance / currentPrice;
            shares += boughtShares;
            invested = balance;
            balance = 0;
        }
    }

    function sell() {
        if (shares > 0) {
            let currentPrice = stockData[stockData.length - 1].price;
            balance = shares * currentPrice;
            shares = 0;
            invested = 0;
        }
    }

    document.getElementById("stock-game").innerHTML += `
        <p>Balance: <span id="balance">$100</span></p>
        <p>Invested: <span id="invested">$0</span></p>
        <p>Shares: <span id="shares">0</span></p>
        <button id="buyButton">Invest All</button>
        <button id="sellButton">Sell All</button>
    `;

    document.getElementById("buyButton").addEventListener("click", () => {
        buy();
        document.getElementById("balance").innerText = `$${balance.toFixed(2)}`;
        document.getElementById("invested").innerText = `$${invested.toFixed(2)}`;
        document.getElementById("shares").innerText = shares.toFixed(4);
    });

    document.getElementById("sellButton").addEventListener("click", () => {
        sell();
        document.getElementById("balance").innerText = `$${balance.toFixed(2)}`;
        document.getElementById("invested").innerText = `$${invested.toFixed(2)}`;
        document.getElementById("shares").innerText = shares.toFixed(4);
    });

    setInterval(updateStockPrice, 500);
});
