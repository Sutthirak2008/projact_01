function parseValue(value) {
  if (!value) return null;

  value = value.toLowerCase().trim();

  if (value.endsWith("k")) return parseFloat(value) * 1000;
  if (value.endsWith("m")) return parseFloat(value) / 1000;

  return parseFloat(value);
}

function calculatePower() {
  const v = parseValue(document.getElementById("voltage").value);
  const i = parseValue(document.getElementById("current").value);
  const r = parseValue(document.getElementById("resistance").value);

  const result = document.getElementById("result");

  const filled = [v, i, r].filter(x => x !== null && !isNaN(x)).length;

  if (filled !== 2) {
    result.innerText = "⚠️ ต้องใส่ค่า 2 ช่องเท่านั้น";
    result.classList.add("show");
    return;
  }

  let power;

  if (v !== null && i !== null) power = v * i;
  else if (i !== null && r !== null) power = i * i * r;
  else if (v !== null && r !== null) power = (v * v) / r;

  if (isNaN(power) || power <= 0) {
    result.innerText = "❌ ค่าที่ใส่ไม่ถูกต้อง";
    return;
  }

  result.innerHTML = `
⚡ กำลังไฟที่ใช้จริง = ${formatPower(power)}
  `;

  result.classList.add("show");
}

function formatPower(value) {
  if (value < 1) {
    const mw = value * 1000;
    return `${trimZeros(mw)} mW`;
  }
  if (value >= 1000) {
    const kw = value / 1000;
    return `${trimZeros(kw)} kW`;
  }
  return `${trimZeros(value)} W`;
}

function trimZeros(num) {
  return Number(num.toFixed(3)).toString();
}


