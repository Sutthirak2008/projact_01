function calculateOhm() {
  const V = document.getElementById("voltage").value;
  const I = document.getElementById("current").value;
  const R = document.getElementById("resistance").value;

  const result = document.getElementById("result");

  // แปลงเป็นตัวเลข (ถ้ามี)
  const v = V !== "" ? parseFloat(V) : null;
  const i = I !== "" ? parseFloat(I) : null;
  const r = R !== "" ? parseFloat(R) : null;

  // เช็คว่ามีค่าแค่ 2 ตัว
  const filled = [v, i, r].filter(x => x !== null).length;
  if (filled !== 2) {
    result.innerText = "⚠️ ใส่ค่าให้ครบ 2 ช่องเท่านั้น";
    return;
  }

  // คำนวณตามตัวที่หาย
if (v === null) {
  const value = i * r;
  result.innerText = `V = ${formatValue(value, "V")}`;
} 
else if (i === null) {
  const value = v / r;
  result.innerText = `I = ${formatValue(value, "A")}`;
} 
else if (r === null) {
  const value = v / i;
  result.innerText = `R = ${formatValue(value, "Ω")}`;
}

  result.classList.add("show"); // ทำ animation
}

function formatValue(value, unit) {
  let num = value;
  let prefix = "";

  if (value >= 1_000_000) {
    num = value / 1_000_000;
    prefix = "M";
  } else if (value >= 1_000) {
    num = value / 1_000;
    prefix = "k";
  }

  // แปลงเป็น string แล้วตัด .0 ที่ไม่จำเป็น
  const formatted = num
    .toString()
    .replace(/(\.\d*?)0+$/, "$1")
    .replace(/\.$/, "");

  return `${formatted}${prefix}${unit}`;
}

