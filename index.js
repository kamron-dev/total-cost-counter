const cRows = document.querySelector("#cRows");
const aRows = document.querySelector("#aRows");
const kRows = document.querySelector("#kRows");


const totalCost = {
    C: 0,
    A: 0,
    K: 0
};

(function makeRowsWork() {
    
    const allTdElements = document.querySelectorAll(".game-cell");

    allTdElements.forEach(element => element.addEventListener("dblclick", () => {
        element.textContent = "X";
        updateTotal();
    }));
    allTdElements.forEach(element => element.addEventListener("click", () => {
        element.textContent = "O";
        updateTotal();
    }))
    
    
    
    
})();

function updateTotal() {
    let cTotal = document.querySelector("#cTotal");
    let aTotal = document.querySelector("#aTotal");
    let kTotal = document.querySelector("#kTotal");

    const cCells = cRows.querySelectorAll(".game-cell");
    const aCells = aRows.querySelectorAll(".game-cell");
    const kCells = kRows.querySelectorAll(".game-cell");


    function xCounter(whoCells) {
        let total = 0;

        whoCells.forEach(cell => {
            if (cell.textContent === "X") {
                total++;
            } else {
                null;
            };
        });

        return total;
    };
    
    cTotal.textContent = xCounter(cCells);
    aTotal.textContent = xCounter(aCells);
    kTotal.textContent = xCounter(kCells);
}

updateTotal();