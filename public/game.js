var gameWin = localStorage.getItem('gameWon') ? parseInt(localStorage.getItem('gameWon')) : 0;
var gameCount = localStorage.getItem('gameCount') ? parseInt(localStorage.getItem('gameCount')) : 0;
var last = 0;

function displayGameCount() {
    var gameCountDisplay = document.createElement("div");
    gameCountDisplay.innerHTML = "Total games played: " + gameCount + "<br>" + "Total games won: " + gameWin;
    gameCountDisplay.style.fontSize = "20px";
    gameCountDisplay.style.marginBottom = "10px";
    gameCountDisplay.style.textAlign = "center";
    gameCountDisplay.id = "gameCountDisplay";

    var button = document.getElementById("colorButton");
    button.parentNode.insertBefore(gameCountDisplay, button);

    return gameCountDisplay;
}

function spawn(table) {
    for (var i = 0; i < 10; i += 1) {
        var row = document.createElement("tr");

        for (var j = 0; j < 10; j += 1) {
            var cell = document.createElement("td");
            cell.classList.add("r" + i);
            cell.classList.add("c" + j);
            cell.style.border = "2px solid black";
            cell.style.width = "40px";
            cell.style.height = "40px";
            cell.style.backgroundColor = "grey";
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    return table;
}

function createShips() {
    let matrix = new Array(10);
    for (let i = 0; i < 10; i += 1) {
        matrix[i] = new Array(10).fill(0);
    }   

    for (let i = 0; i < 2; i += 1) {
        let x = Math.random();
        let orientare = -1;
        if (x < 0.5) { orientare = 1; }

        if (orientare == -1) { // orizontal
            let row = Math.floor(Math.random() * 10);
            let start = Math.floor(Math.random() * 6);

            matrix[row][start] = matrix[row][start + 1] = 1;
            matrix[row][start + 2] = matrix[row][start + 3] = 1; 
        } else { // vertical
            let column = Math.floor(Math.random() * 10);
            let start = Math.floor(Math.random() * 6);

            matrix[start][column] = matrix[start + 1][column] = 1;
            matrix[start + 2][column] = matrix[start + 3][column] = 1; 
        }
    }

    for (let i = 0; i < 3; i += 1) {
        let x = Math.random();
        let orientare = -1;
        if (x < 0.5) { orientare = 1; }

        if (orientare == -1) { // orizontal
            let row = Math.floor(Math.random() * 10);
            let start = Math.floor(Math.random() * 8);

            matrix[row][start] = matrix[row][start + 1] = 1;
            matrix[row][start + 2] = 1; 
        } else { // vertical
            let column = Math.floor(Math.random() * 10);
            let start = Math.floor(Math.random() * 8);

            matrix[start][column] = matrix[start + 1][column] = 1;
            matrix[start + 2][column] = 1; 
        }
    }

    for (let i = 0; i < 4; i += 1) {
        let x = Math.random();
        let orientare = -1;
        if (x < 0.5) { orientare = 1; }

        if (orientare == -1) { // orizontal
            let row = Math.floor(Math.random() * 10);
            let start = Math.floor(Math.random() * 10);

            matrix[row][start] = 1; 
        } else { // vertical
            let column = Math.floor(Math.random() * 10);
            let start = Math.floor(Math.random() * 10);

            matrix[start][column] = 1; 
        }
    }

    text = '';
    for (let i = 0; i < matrix.length; i += 1) {
        text = i.toString() + ': ';
        for (let j = 0; j < matrix[i].length; j += 1) {
            text += matrix[i][j].toString() + ' ';
        }
        console.log(text);
        text = ' ';
    }
    console.log('\n');
    return matrix;
}

function computerPlay(table, shipMatrix) {
    let possibleRow = []
    let possibleColumns = []
    for (let i = 0; i < 10; i += 1) {
        for (let j = 0; j < 10; j += 1) {
            if (shipMatrix[i][j] !== -1) {
                possibleRow.push(i);
                possibleColumns.push(j);
            }
        }
    }

    let option = Math.floor(Math.random() * possibleRow.length);
    if (option !== 0) {
        let row = possibleRow[option];
        let column = possibleColumns[option];

        let cell = table.querySelector(`.r${row}.c${column}`);

      if (shipMatrix[row][column] === 1) {
            cell.style.backgroundColor = "red";
        } else {
            cell.style.backgroundColor = "white";
        }
        
        shipMatrix[row][column] = -1;
    }
}

function win(shipMatrix) {
    for (let i = 0; i < 10; i += 1) {
        for (let j = 0; j < 10; j += 1) {
            if (shipMatrix[i][j].toString() == '1') {
                return false;
            }
        }
    }
    return true;
}

function generateForm() {
    const form = document.createElement('form');
    form.style.position = 'fixed';
    form.style.top = '80%';
    form.style.left = '50%';
    form.style.transform = 'translate(-50%, -50%)';
    form.style.backgroundColor = '#f0f0f0';
    form.style.padding = '20px';
    form.style.borderRadius = '10px';
    form.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';

    const rangeLabel = document.createElement('label');
    rangeLabel.textContent = 'Select your opinion scale:';
    rangeLabel.style.display = 'block'; 

    const rangeInput = document.createElement('input');
    rangeInput.setAttribute('type', 'range');
    rangeInput.setAttribute('min', '1');
    rangeInput.setAttribute('max', '10');
    rangeInput.setAttribute('value', '5'); 
    rangeInput.setAttribute('name', 'opinionScale');

    const opinionLabel = document.createElement('label');
    opinionLabel.textContent = 'Write your opinion:';
    opinionLabel.style.display = 'block'; 

    const opinionTextarea = document.createElement('textarea');
    opinionTextarea.setAttribute('rows', '4');
    opinionTextarea.setAttribute('cols', '50');
    opinionTextarea.setAttribute('name', 'opinionText');

    const sendButton = document.createElement('button');
    sendButton.textContent = 'Send';
    sendButton.style.display = 'block';
    sendButton.style.marginTop = '10px';

    form.appendChild(rangeLabel);
    form.appendChild(rangeInput);
    form.appendChild(document.createElement('br')); 
    form.appendChild(opinionLabel);
    form.appendChild(opinionTextarea);    
    form.appendChild(sendButton);

    document.body.appendChild(form);

    opinionTextarea.addEventListener('input', function(event) {
        const regex = /[^a-zA-Z0-9\s]/g;
        opinionTextarea.value = opinionTextarea.value.replace(regex, '');
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const opinionScale = rangeInput.value;
        const opinionText = opinionTextarea.value;

        console.log('Opinion Scale:', opinionScale);
        console.log('Opinion Text:', opinionText);

        alert('Your opinion has been submitted. Thank you!');
        
        form.reset();
        form.style.display = 'none'; 
    });
}

function displayText() {
    var message = document.getElementById("moveCountMessage");
    
    if (!message) {
        message = document.createElement("div");
        message.id = "moveCountMessage";
        message.style.fontSize = "24px";
        message.style.textAlign = "center";
        
        var footer = document.querySelector("footer");
        footer.parentNode.insertBefore(message, footer);
    }

    message.textContent = "Moves since hit: " + last;
}

var playerTurn = true;

function clickCell(table, shipMatrix, table2, shipMatrix2) {
    var cells = table.getElementsByTagName("td");
    for (let i = 0; i < cells.length; i += 1) {
        cells[i].addEventListener("click", function (event) {
            event.stopPropagation();

            if (!playerTurn) { 
                return; 
            }
            var row = parseInt(this.classList[0].substr(1));
            var col = parseInt(this.classList[1].substr(1));

            if (shipMatrix[row][col] !== -1) {
                if (shipMatrix[row][col] === 1) {
                    this.style.backgroundColor = "red";
                    shipMatrix[row][col] = -1;
                } else {
                    this.style.backgroundColor = "white";
                    shipMatrix[row][col] = -1;
                }
            }

            var a = window.getComputedStyle(this);

            if (a.getPropertyValue('background-color') === 'rgb(255, 0, 0)') {
                last = 0;
            } else {
                last += 1;
            }

            if (win(shipMatrix) === true) {
                table.remove(), table2.remove(), 
                gameCount += 1, localStorage.setItem('gameCount', gameCount);
                gameWin += 1, localStorage.setItem('gameWon', gameWin);
                var youWon = document.createElement("div");
                youWon.textContent = "Contratulations! You won! :D";

                youWon.style.position = "fixed";
                youWon.style.top = "50%";
                youWon.style.left = "50%";
                youWon.style.fontSize = "100px";
                youWon.style.transform = "translate(-50%, -50%)";
                youWon.style.textAlign = "center";

              
                if (gameWin === 1) {
                    var firstWinTimestamp = new Date().toLocaleString();
                    var firstWinMessage = document.createElement("div");
                    firstWinMessage.textContent = "Congratulations! You won for the first time on " + firstWinTimestamp;

                    firstWinMessage.style.position = "fixed";
                    firstWinMessage.style.top = "50%";
                    firstWinMessage.style.left = "50%";
                    firstWinMessage.style.fontSize = "70px";
                    firstWinMessage.style.transform = "translate(-50%, -50%)";
                    firstWinMessage.style.textAlign = "center";

                    document.body.append(firstWinMessage);
                } else {
                    document.body.append(youWon);
                }

                generateForm();
            } else if (win(shipMatrix2) === true) {
                table.remove(), table2.remove();
                gameCount += 1, localStorage.setItem('gameCount', gameCount);
                var youLost = document.createElement("div");
                youLost.textContent = "I'm sorry, but you lost :<";

                youLost.style.position = "fixed";
                youLost.style.top = "50%";
                youLost.style.left = "50%";
                youLost.style.fontSize = "100px";
                youLost.style.transform = "translate(-50%, -50%)";
                youLost.style.textAlign = "center";            

                generateForm();

                document.body.append(youLost);
            } else {
                displayText();
            }

                playerTurn = false;
                setTimeout(function() {
                    computerPlay(table2, shipMatrix2);
                    playerTurn = true;

                }, 1000);
        });
    }
}

function getRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    var hex = '#' + r.toString(16) + g.toString(16) + b.toString(16);

    return hex;
}

window.onload = function() {    
    var a = displayGameCount();

    var button = document.getElementById("colorButton");

    matrixShips1 = createShips();
    matrixShips2 = createShips();
    
    button.addEventListener("mouseover", function() {
        button.style.backgroundColor = "#94549f";
    });

    button.addEventListener("mouseout", function() {
        button.style.backgroundColor = "#007BFF";
    });

    button.addEventListener("click", function() {
        a.remove();
        startGame();
    });

    window.addEventListener("keydown", function(event) {
        if (event.key === "S") {
            startGame();
        }
    });

    var divTable = document.getElementById("tableContainer");

    divTable.addEventListener("click", function() {
        window.open('https://www.youtube.com/watch?v=4rrXR6n0RTY&ab_channel=CurlySVT', '_blank');
    });

    function startGame() {
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = getRandomColor();
        button.remove();

        console.log(document.body.style.backgroundColor);


        var tableContainer = document.getElementById("tableContainer");

        tableContainer.style.display = "flex";
        tableContainer.style.flexDirection = "row";

        var table1 = spawn(document.createElement("table"));
        table1.style.marginLeft = "30vh";

        var table2 = spawn(document.createElement("table"));
        table2.style.marginLeft = "25vh";


        tableContainer.appendChild(table1);
        tableContainer.appendChild(table2);

        clickCell(table1, matrixShips1, table2, matrixShips2);
    }

}

