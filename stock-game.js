document.addEventListener("DOMContentLoaded", function () {
    let stockData = [{ time: 0, price: 100 }];
    let balance = 100;
    let invested = 0;
    let time = 0;
    let gameOver = false;
    
    const canvas = document.createElement("canvas");
    canvas.id = "stockGameCanvas";
    document.getElementById("stock-game").appendChild(canvas);
    const ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 300;
    
    function updateStockPrice() {
        if (time >= 252) {
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
            let x = (index / 252) * canvas.width;
            let y = canvas.height - point.price;
            ctx.lineTo(x, y);
        });
        ctx.strokeStyle = "#888";
        ctx.stroke();
    }
    
    function invest(amount) {
        if (amount >= 20 && amount <= balance && !gameOver) {
            balance -= amount;
            invested += amount;
        }
    }
    
    function sell() {
        if (invested > 0) {
            let finalPrice = stockData[stockData.length - 1].price;
            let profitLoss = (finalPrice / 100) * invested;
            balance += profitLoss;
            invested = 0;
        }
    }
    
    document.getElementById("stock-game").innerHTML += `
        <p>Balance: <span id="balance">$100</span></p>
        <p>Invested: <span id="invested">$0</span></p>
        <button id="investButton">Invest $20</button>
        <button id="sellButton">Sell</button>
    `;
    
    document.getElementById("investButton").addEventListener("click", () => {
        invest(20);
        document.getElementById("balance").innerText = `$${balance.toFixed(2)}`;
        document.getElementById("invested").innerText = `$${invested.toFixed(2)}`;
    });
    
    document.getElementById("sellButton").addEventListener("click", () => {
        sell();
        document.getElementById("balance").innerText = `$${balance.toFixed(2)}`;
        document.getElementById("invested").innerText = `$${invested.toFixed(2)}`;
    });
    
    setInterval(updateStockPrice, 500);
});
