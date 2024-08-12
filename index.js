const cRows = document.querySelector("#cRows");
const aRows = document.querySelector("#aRows");
const kRows = document.querySelector("#kRows");
const dateHolder = document.querySelector("#date");

const today = new Date();

dateHolder.textContent = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
});

const totalCost = {
    C: 80,
    A: 88,
    K: 92
};

(function makeRowsWork() {
    
    const allTdElements = document.querySelectorAll(".game-cell");

    allTdElements.forEach((element, index) => element.addEventListener("click", (event) => {
        event.target.textContent = "X";
        
        if (index >= 0 && index < 20) {
            allTdElements[index + 20].textContent = "O";
            allTdElements[index + 40].textContent = "O";
        } else if (index >= 20 && index < 40) {
            allTdElements[index - 20].textContent = "O";
            allTdElements[index + 20].textContent = "O";
        } else {
            allTdElements[index - 20].textContent = "O";
            allTdElements[index - 40].textContent = "O";
        }
        
        updateTotal();
    }));
     
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

if (localStorage.length < 1) {
    for (key in totalCost) {
        localStorage.setItem(key, JSON.stringify(totalCost[key]));
    };

}




function showGrandTotal() {
    const cTotalRow = document.querySelector("#cTotal-row");
    const aTotalRow = document.querySelector("#aTotal-row");
    const kTotalRow = document.querySelector("#kTotal-row");

    cTotalRow.querySelector("td").textContent = JSON.parse(localStorage.getItem("C"));
    aTotalRow.querySelector("td").textContent = JSON.parse(localStorage.getItem("A"));
    kTotalRow.querySelector("td").textContent = JSON.parse(localStorage.getItem("K"));


}

showGrandTotal();

function makeSaveResultsBtnWork() {
    const button = document.querySelector("#save-results-btn");
    const allTds = document.querySelectorAll(".game-cell");
    
    const cName = document.querySelector("#cTotal-row").querySelector("th");
    const cTotal = document.querySelector("#cTotal");

    const aName = document.querySelector("#aTotal-row").querySelector("th");
    const aTotal = document.querySelector("#aTotal");

    const kName = document.querySelector("#kTotal-row").querySelector("th");
    const kTotal = document.querySelector("#kTotal");

    
    
    button.addEventListener("click", () => {
        const allCellsFilled = Array.from(allTds).every(cell => {
            return cell.textContent.length > 0;
        });
        
        
        
        if (allCellsFilled) {
            localStorage.setItem(cName.textContent, JSON.stringify(Number(localStorage.getItem("C")) + Number(cTotal.textContent)));
            localStorage.setItem(aName.textContent, JSON.stringify(Number(localStorage.getItem("A")) + Number(aTotal.textContent)));
            localStorage.setItem(kName.textContent, JSON.stringify(Number(localStorage.getItem("K")) + Number(kTotal.textContent)));
            showGrandTotal();
            allTds.forEach(cell => cell.textContent = "");
            updateTotal();
        } else {
            alert("Fill out the game card")
        }
    });

};

makeSaveResultsBtnWork();