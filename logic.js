
function caesarEncrypt() {
    const input = document.getElementById("caesarInput").value.toUpperCase();
    const shift = parseInt(document.getElementById("caesarShift").value);
    let encryptedText = "";

    for (let i = 0; i < input.length; i++) {
        if (input[i] === " ") {
            encryptedText += " ";
            continue;
        }
        const charCode = input.charCodeAt(i);
        const encryptedCharCode = (charCode + shift - 65) % 26 + 65;
        encryptedText += String.fromCharCode(encryptedCharCode);
    }

    document.getElementById("caesarEncrypted").textContent = encryptedText;
}

function caesarDecrypt() {
    const input = document.getElementById("caesarInput").value.toUpperCase();
    const shift = parseInt(document.getElementById("caesarShift").value);
    let decryptedText = "";

    for (let i = 0; i < input.length; i++) {
        if (input[i] === " ") {
            decryptedText += " ";
            continue;
        }
        const charCode = input.charCodeAt(i);
        const decryptedCharCode = (charCode - shift + 26 - 65) % 26 + 65;
        decryptedText += String.fromCharCode(decryptedCharCode);
    }

    document.getElementById("caesarDecrypted").textContent = decryptedText;
}

function vigenereEncrypt() {
    const input = document.getElementById("vigenereInput").value.toUpperCase();
    const keyword = document.getElementById("vigenereKeyword").value.toUpperCase();
    let encryptedText = "";

    for (let i = 0, j = 0; i < input.length; i++) {
        if (input[i] === " ") {
            encryptedText += " ";
            continue;
        }
        const charCode = input.charCodeAt(i);
        const keywordCharCode = keyword.charCodeAt(j % keyword.length);
        const encryptedCharCode = (charCode + keywordCharCode - 2 * 65) % 26 + 65;
        encryptedText += String.fromCharCode(encryptedCharCode);
        j++;
    }

    document.getElementById("vigenereEncrypted").textContent = encryptedText;
}

function vigenereDecrypt() {
    const input = document.getElementById("vigenereInput").value.toUpperCase();
    const keyword = document.getElementById("vigenereKeyword").value.toUpperCase();
    let decryptedText = "";

    for (let i = 0, j = 0; i < input.length; i++) {
        if (input[i] === " ") {
            decryptedText += " ";
            continue;
        }
        const charCode = input.charCodeAt(i);
        const keywordCharCode = keyword.charCodeAt(j % keyword.length);
        const decryptedCharCode = (charCode - keywordCharCode + 26) % 26 + 65;
        decryptedText += String.fromCharCode(decryptedCharCode);
        j++;
    }

    document.getElementById("vigenereDecrypted").textContent = decryptedText;
}

function playfairEncrypt() {
    const input = document.getElementById("playfairInput").value.toUpperCase();
    const keyword = document.getElementById("playfairKeyword").value.toUpperCase();
    const matrix = generatePlayfairMatrix(keyword);
    let encryptedText = "";

    for (let i = 0; i < input.length; i += 2) {
        const char1 = input[i];
        const char2 = (i + 1 < input.length) ? input[i + 1] : 'X'; // Padding with 'X' if odd number of characters
        const [row1, col1] = findCharPosition(matrix, char1);
        const [row2, col2] = findCharPosition(matrix, char2);

        if (row1 === row2) {
            encryptedText += matrix[row1][(col1 + 1) % 5] + matrix[row2][(col2 + 1) % 5];
        } else if (col1 === col2) {
            encryptedText += matrix[(row1 + 1) % 5][col1] + matrix[(row2 + 1) % 5][col2];
        } else {
            encryptedText += matrix[row1][col2] + matrix[row2][col1];
        }
    }

    document.getElementById("playfairEncrypted").textContent = encryptedText;
}

function playfairDecrypt() {
    const input = document.getElementById("playfairInput").value.toUpperCase();
    const keyword = document.getElementById("playfairKeyword").value.toUpperCase();
    const matrix = generatePlayfairMatrix(keyword);
    let decryptedText = "";

    for (let i = 0; i < input.length; i += 2) {
        const char1 = input[i];
        const char2 = (i + 1 < input.length) ? input[i + 1] : 'X'; // Padding with 'X' if odd number of characters
        const [row1, col1] = findCharPosition(matrix, char1);
        const [row2, col2] = findCharPosition(matrix, char2);

        if (row1 === row2) {
            decryptedText += matrix[row1][(col1 - 1 + 5) % 5] + matrix[row2][(col2 - 1 + 5) % 5];
        } else if (col1 === col2) {
            decryptedText += matrix[(row1 - 1 + 5) % 5][col1] + matrix[(row2 - 1 + 5) % 5][col2];
        } else {
            decryptedText += matrix[row1][col2] + matrix[row2][col1];
        }
    }

    document.getElementById("playfairDecrypted").textContent = decryptedText;
}

function generatePlayfairMatrix(keyword) {
    // Implement Playfair matrix generation logic here (return a 5x5 matrix)
    const matrix = [];
    const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"; // Omitting 'J'

    // Initialize the matrix with the keyword
    let keywordIndex = 0;
    for (let i = 0; i < 5; i++) {
        matrix.push([]);
        for (let j = 0; j < 5; j++) {
            if (keywordIndex < keyword.length) {
                matrix[i][j] = keyword[keywordIndex];
                keywordIndex++;
            } else {
                const remainingChars = alphabet.split("").filter(char => keyword.indexOf(char) === -1);
                matrix[i][j] = remainingChars.shift();
            }
        }
    }

    return matrix;
}

function findCharPosition(matrix, char) {
    // Find the position of a character in the Playfair matrix
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (matrix[i][j] === char) {
                return [i, j];
            }
        }
    }
    return [-1, -1]; // Not found
}

