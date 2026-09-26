function encryptVigenere(plaintext, key) {
    let result = "";
    plaintext = plaintext.toUpperCase();
    key = key.toUpperCase();

    for (let i = 0; i < plaintext.length; i++) {
        const p = plaintext.charCodeAt(i) - 65;
        const k = key.charCodeAt(i % key.length) - 65;
        result += String.fromCharCode(((p + k) % 26) + 65);
    }

    return result;
}

function decryptVigenere(ciphertext, key) {
    let result = "";
    ciphertext = ciphertext.toUpperCase();
    key = key.toUpperCase();

    for (let i = 0; i < ciphertext.length; i++) {
        const c = ciphertext.charCodeAt(i) - 65;
        const k = key.charCodeAt(i % key.length) - 65;
        result += String.fromCharCode(((c - k + 26) % 26) + 65);
    }

    return result;
}

function validateInput(text, key) {
    if (!text) return { valid: false, message: "❌ Teks tidak boleh kosong!" };
    if (!key) return { valid: false, message: "❌ Key tidak boleh kosong!" };
    if (!/^[A-Za-z]+$/.test(text)) return { valid: false, message: "❌ Teks hanya boleh berisi huruf A-Z!" };
    if (!/^[A-Za-z]+$/.test(key)) return { valid: false, message: "❌ Key hanya boleh berisi huruf A-Z!" };

    return { valid: true, message: "" };
}

function handleEncrypt() {
    const text = document.getElementById("inputText").value.trim();
    const key = document.getElementById("inputKey").value.trim();
    const errorBox = document.getElementById("errorMessage");
    const outputBox = document.getElementById("outputResult");

    errorBox.innerText = "";
    outputBox.value = "";

    const validation = validateInput(text, key);

    if (!validation.valid) {
        errorBox.innerText = validation.message;
        return;
    }

    outputBox.value = encryptVigenere(text, key);
    showEncryptionSteps(text, key);
}

function handleDecrypt() {
    const text = document.getElementById("inputText").value.trim();
    const key = document.getElementById("inputKey").value.trim();
    const errorBox = document.getElementById("errorMessage");
    const outputBox = document.getElementById("outputResult");

    errorBox.innerText = "";
    outputBox.value = "";

    const validation = validateInput(text, key);

    if (!validation.valid) {
        errorBox.innerText = validation.message;
        return;
    }

    outputBox.value = decryptVigenere(text, key);
    showDecryptionSteps(text, key);
}

function showEncryptionSteps(plaintext, key) {
    const container = document.getElementById("algorithmSteps");
    const repeatedKey = generateRepeatedKey(plaintext, key);
    let html = `
        <h3>Encryption Steps</h3>
        <p><strong>Plaintext:</strong> ${plaintext}</p>
        <p><strong>Key:</strong> ${repeatedKey}</p>
        <p><strong>Formula:</strong> C = (P + K) mod 26</p>
        <table border="1" cellpadding="8" cellspacing="0">
            <tr>
                <th>No</th>
                <th>Plaintext</th>
                <th>Key</th>
                <th>P</th>
                <th>K</th>
                <th>Calculation</th>
                <th>Result</th>
            </tr>`;

    for (let i = 0; i < plaintext.length; i++) {
        const plainChar = plaintext[i].toUpperCase();
        const keyChar = key[i % key.length].toUpperCase();
        const p = plainChar.charCodeAt(0) - 65;
        const k = keyChar.charCodeAt(0) - 65;
        const c = (p + k) % 26;
        const result = String.fromCharCode(c + 65);

        html += `
            <tr>
                <td>${i + 1}</td>
                <td>${plainChar}</td>
                <td>${keyChar}</td>
                <td>${p}</td>
                <td>${k}</td>
                <td>(${p} + ${k}) mod 26 = ${c}</td>
                <td>${result}</td>
            </tr>`;
    }

    container.innerHTML = html + "</table>";
}

function showDecryptionSteps(ciphertext, key) {
    const container = document.getElementById("algorithmSteps");
    const repeatedKey = generateRepeatedKey(ciphertext, key);
    let html = `
        <h3>Decryption Steps</h3>
        <p><strong>Ciphertext:</strong> ${ciphertext}</p>
        <p><strong>Key:</strong> ${repeatedKey}</p>
        <p><strong>Formula:</strong> P = (C - K + 26) mod 26</p>
        <table border="1" cellpadding="8" cellspacing="0">
            <tr>
                <th>No</th>
                <th>Ciphertext</th>
                <th>Key</th>
                <th>C</th>
                <th>K</th>
                <th>Calculation</th>
                <th>Result</th>
            </tr>`;

    for (let i = 0; i < ciphertext.length; i++) {
        const cipherChar = ciphertext[i].toUpperCase();
        const keyChar = key[i % key.length].toUpperCase();
        const c = cipherChar.charCodeAt(0) - 65;
        const k = keyChar.charCodeAt(0) - 65;
        const p = (c - k + 26) % 26;
        const result = String.fromCharCode(p + 65);

        html += `
            <tr>
                <td>${i + 1}</td>
                <td>${cipherChar}</td>
                <td>${keyChar}</td>
                <td>${c}</td>
                <td>${k}</td>
                <td>(${c} - ${k} + 26) mod 26 = ${p}</td>
                <td>${result}</td>
            </tr>`;
    }

    container.innerHTML = html + "</table>";
}

function generateRepeatedKey(text, key) {
    let result = "";

    for (let i = 0; i < text.length; i++) {
        result += key[i % key.length].toUpperCase();
    }

    return result;
}

const testCasesData = [
    { plaintext: "HELLOWORLD", key: "KEY", expected: "RIJVSUYVJN" },
    { plaintext: "MEETME", key: "DOG", expected: "PSKWAK" },
    { plaintext: "KRIPTOGRAFI", key: "UGM", expected: "EXUJZAAXMZO" }
];

function runTestCases() {
    const tableBody = document.getElementById("testCaseTableBody");
    tableBody.innerHTML = "";
    let totalPass = 0;

    testCasesData.forEach((testCase, index) => {
        const actual = encryptVigenere(testCase.plaintext, testCase.key);
        const pass = actual === testCase.expected;

        if (pass) totalPass++;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${testCase.plaintext}</td>
            <td>${testCase.key}</td>
            <td>${testCase.expected}</td>
            <td>${actual}</td>
            <td>${pass ? "✅ PASS" : "❌ FAIL"}</td>`;

        tableBody.appendChild(row);
    });

    const oldSummary = document.getElementById("testSummary");
    if (oldSummary) oldSummary.remove();

    const summary = document.createElement("p");
    summary.id = "testSummary";
    summary.innerHTML = `<strong>Result: ${totalPass}/${testCasesData.length} test cases PASS</strong>`;

    tableBody.parentElement.after(summary);
}

function runSecurityDemo() {
    const message1 = "ATTACKATDAWN";
    const message2 = "ATTACKATDUSK";
    const key = "LEMON";

    const ciphertext1 = encryptVigenere(message1, key);
    const ciphertext2 = encryptVigenere(message2, key);

    document.getElementById("securityDemoResult").innerHTML = `
        <p><strong>Message 1:</strong> ${message1}</p>
        <p><strong>Ciphertext 1:</strong> ${ciphertext1}</p>
        <p><strong>Message 2:</strong> ${message2}</p>
        <p><strong>Ciphertext 2:</strong> ${ciphertext2}</p>
        <p><strong>Key:</strong> ${key}</p>
        <hr>
        <h3>Weakness Demonstration</h3>
        <p>Kedua pesan menggunakan key yang sama secara berulang.</p>
        <p>Bagian plaintext yang sama dan berada pada posisi key yang sama akan menghasilkan pola ciphertext yang sama.</p>
        <p>Penggunaan key yang sama berulang kali dapat memberikan informasi pola yang dapat dimanfaatkan untuk menganalisis ciphertext.</p>`;
}