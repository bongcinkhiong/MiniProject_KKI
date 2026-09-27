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

let currentSecCiphertext1 = "";
let currentSecCiphertext2 = "";

function loadSecurityPreset(type) {
    const msg1Input = document.getElementById("secMessage1");
    const msg2Input = document.getElementById("secMessage2");
    const keyInput = document.getElementById("secKey");

    if (!msg1Input || !msg2Input || !keyInput) return;

    if (type === "military") {
        msg1Input.value = "ATTACKATDAWN";
        msg2Input.value = "ATTACKATDUSK";
        keyInput.value = "LEMON";
    } else if (type === "financial") {
        msg1Input.value = "TRANSFERTENMILLIONTORUM";
        msg2Input.value = "TRANSFERTENMILLIONTOBOB";
        keyInput.value = "BANKKEY";
    }

    runSecuritySimulation();
}

function runSecuritySimulation() {
    const msg1Input = document.getElementById("secMessage1");
    const msg2Input = document.getElementById("secMessage2");
    const keyInput = document.getElementById("secKey");
    const errorBox = document.getElementById("secErrorMessage");
    const resultBox = document.getElementById("securitySimulationResult");

    if (!msg1Input || !msg2Input || !keyInput || !resultBox) return;

    if (errorBox) errorBox.innerText = "";
    resultBox.innerHTML = "";

    const m1 = msg1Input.value.trim().toUpperCase();
    const m2 = msg2Input.value.trim().toUpperCase();
    const key = keyInput.value.trim().toUpperCase();

    if (!m1 || !m2) {
        if (errorBox) errorBox.innerText = "❌ Pesan 1 dan Pesan 2 tidak boleh kosong!";
        return;
    }
    if (!key) {
        if (errorBox) errorBox.innerText = "❌ Kunci bersama tidak boleh kosong!";
        return;
    }
    if (!/^[A-Za-z]+$/.test(m1) || !/^[A-Za-z]+$/.test(m2)) {
        if (errorBox) errorBox.innerText = "❌ Pesan hanya boleh berisi huruf A-Z (tanpa spasi/simbol)!";
        return;
    }
    if (!/^[A-Za-z]+$/.test(key)) {
        if (errorBox) errorBox.innerText = "❌ Kunci hanya boleh berisi huruf A-Z!";
        return;
    }

    const c1 = encryptVigenere(m1, key);
    const c2 = encryptVigenere(m2, key);

    currentSecCiphertext1 = c1;
    currentSecCiphertext2 = c2;

    const minLen = Math.min(m1.length, m2.length);
    let matchCount = 0;
    let tableRows = "";

    for (let i = 0; i < minLen; i++) {
        const p1Char = m1[i];
        const p2Char = m2[i];
        const kChar = key[i % key.length];
        const c1Char = c1[i];
        const c2Char = c2[i];

        const isMatch = (c1Char === c2Char);
        if (isMatch) matchCount++;

        const c1Val = c1Char.charCodeAt(0) - 65;
        const c2Val = c2Char.charCodeAt(0) - 65;
        const delta = (c1Val - c2Val + 26) % 26;

        const rowClass = isMatch ? "row-leak" : "";
        const statusBadge = isMatch
            ? `<span class="badge badge-leak">🚨 BOCOR (Identik)</span>`
            : `<span class="badge badge-diff">BEDA</span>`;

        tableRows += `
            <tr class="${rowClass}">
                <td>${i + 1}</td>
                <td><strong>${p1Char}</strong></td>
                <td><strong>${p2Char}</strong></td>
                <td>${kChar}</td>
                <td><strong>${c1Char}</strong></td>
                <td><strong>${c2Char}</strong></td>
                <td>${delta}</td>
                <td>${statusBadge}</td>
            </tr>`;
    }

    const matchPercent = Math.round((matchCount / minLen) * 100);
    const defaultCrib = m1.substring(0, Math.min(6, m1.length));

    let html = `
        <div class="sec-summary-card">
            <h3>Hasil Enkripsi Dua Pesan dengan Kunci yang Sama</h3>
            <div class="sec-info-grid">
                <div class="sec-info-item">
                    <span class="label">Pesan 1 (Plaintext 1):</span>
                    <code>${m1}</code>
                </div>
                <div class="sec-info-item">
                    <span class="label">Ciphertext 1:</span>
                    <code class="cipher-text">${c1}</code>
                </div>
                <div class="sec-info-item">
                    <span class="label">Pesan 2 (Plaintext 2):</span>
                    <code>${m2}</code>
                </div>
                <div class="sec-info-item">
                    <span class="label">Ciphertext 2:</span>
                    <code class="cipher-text">${c2}</code>
                </div>
                <div class="sec-info-item full-width">
                    <span class="label">Shared Key yang Digunakan:</span>
                    <code>${key}</code>
                </div>
            </div>
        </div>

        <div class="sec-analysis-card">
            <h3>1. Analisis Kebocoran Pola (Pattern Leakage)</h3>
            <p>
                Ditemukan <strong>${matchCount} dari ${minLen} posisi (${matchPercent}%)</strong> yang menghasilkan ciphertext persis sama.
            </p>
            <p class="sec-callout">
                ⚠️ <strong>Ancaman Keamanan:</strong> Tanpa mengetahui kuncinya, penyerang yang menyadap Ciphertext 1 dan Ciphertext 2 langsung tahu bahwa pada posisi yang identik, kedua pesan mengirimkan instruksi/kata yang <strong>sama persis</strong>.
            </p>

            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>P1</th>
                            <th>P2</th>
                            <th>Key</th>
                            <th>C1</th>
                            <th>C2</th>
                            <th>ΔC = (C1-C2) mod 26</th>
                            <th>Status Pola</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </div>
        </div>

        <div class="sec-analysis-card">
            <h3>2. Bukti Matematis: Peniadaan Kunci (Key Elimination)</h3>
            <div class="formula-box">
                <p>Rumus Enkripsi Pesan 1: <strong>C₁ = (P₁ + K) mod 26</strong></p>
                <p>Rumus Enkripsi Pesan 2: <strong>C₂ = (P₂ + K) mod 26</strong></p>
                <p>Selisih Ciphertext: <strong>ΔC = (C₁ - C₂) mod 26 = ((P₁ + K) - (P₂ + K)) mod 26 = (P₁ - P₂) mod 26</strong></p>
            </div>
            <p>
                Perhatikan bahwa pada rumus selisih <strong>ΔC</strong>, <strong>variabel Kunci (K) tereliminasi total</strong>. 
                Artinya, penyerang memperoleh korelasi langsung antara Plaintext 1 dan Plaintext 2 tanpa terproteksi oleh kunci kriptografi!
            </p>
        </div>

        <div class="sec-analysis-card">
            <h3>3. Simulasi Eksploitasi: Known-Plaintext / Crib Attack</h3>
            <p>
                Jika penyerang berhasil menebak sebagian kata (crib) pada Pesan 1, penyerang dapat langsung merekonstruksi kunci dan membuka isi Pesan 2!
            </p>
            <div class="form-group" style="margin-top: 12px;">
                <label for="secCribGuess">Tebakan Kata pada Pesan 1 (Crib):</label>
                <input type="text" id="secCribGuess" placeholder="Misal: ATTACK" value="${defaultCrib}" />
            </div>
            <button type="button" class="btn btn-secondary" onclick="executeCribAttack()">
                Uji Serangan Tebakan (Crib Attack)
            </button>
            <div id="cribAttackResult" style="margin-top: 14px;"></div>
        </div>
    `;

    resultBox.innerHTML = html;
}

function executeCribAttack() {
    const cribInput = document.getElementById("secCribGuess");
    const resultBox = document.getElementById("cribAttackResult");
    if (!cribInput || !resultBox) return;

    const crib = cribInput.value.trim().toUpperCase();

    if (!crib || !/^[A-Za-z]+$/.test(crib)) {
        resultBox.innerHTML = `<p class="error-msg">❌ Tebakan kata hanya boleh berisi huruf A-Z!</p>`;
        return;
    }

    if (!currentSecCiphertext1 || !currentSecCiphertext2) {
        resultBox.innerHTML = `<p class="error-msg">❌ Jalankan simulasi terlebih dahulu!</p>`;
        return;
    }

    if (crib.length > currentSecCiphertext1.length) {
        resultBox.innerHTML = `<p class="error-msg">❌ Panjang tebakan tidak boleh melebihi panjang ciphertext (${currentSecCiphertext1.length})!</p>`;
        return;
    }

    let recoveredKeySegment = "";
    let revealedP2Segment = "";

    for (let i = 0; i < crib.length; i++) {
        const c1Val = currentSecCiphertext1.charCodeAt(i) - 65;
        const cribVal = crib.charCodeAt(i) - 65;
        const keyVal = (c1Val - cribVal + 26) % 26;
        recoveredKeySegment += String.fromCharCode(keyVal + 65);

        const c2Val = currentSecCiphertext2.charCodeAt(i) - 65;
        const p2Val = (c2Val - keyVal + 26) % 26;
        revealedP2Segment += String.fromCharCode(p2Val + 65);
    }

    resultBox.innerHTML = `
        <div class="demo-result">
            <p style="color: #62d5ea; font-size: 1.05rem;"><strong>🎯 Hasil Rekonstruksi Serangan:</strong></p>
            <p style="color: #f1f5f9;">• Kata Tebakan di P1 (Crib): <code>${crib}</code></p>
            <p style="color: #f1f5f9;">• Potongan Kunci Terbongkar (K = C₁ - P₁): <strong style="color: #62d5ea; font-size: 1.1rem; letter-spacing: 1px;">${recoveredKeySegment}</strong></p>
            <p style="color: #f1f5f9;">• Pesan 2 yang Ikut Terbuka (P₂ = C₂ - K): <strong style="color: #4ade80; font-size: 1.1rem; letter-spacing: 1px;">${revealedP2Segment}</strong></p>
            <hr style="margin: 12px 0; border: none; border-top: 1px solid var(--border-color);">
            <div style="background: rgba(98, 213, 234, 0.1); border-left: 4px solid var(--secondary-color); padding: 12px; border-radius: 0 var(--radius) var(--radius) 0;">
                <p style="font-size: 0.95rem; color: #f1f5f9; margin: 0; line-height: 1.5;">
                    💡 <strong>Kesimpulan Keamanan:</strong> Hanya dengan menebak 1 kata pada Pesan 1, penyerang berhasil mendapatkan kunci sekaligus membaca isi Pesan 2. Inilah bukti fatal mengapa penggunaan kunci yang sama (Key Reuse) sangat dilarang dalam kriptografi!
                </p>
            </div>
        </div>
    `;
}

function runSecurityDemo() {
    runSecuritySimulation();
}