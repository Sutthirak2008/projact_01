// รายชื่อ dropdown
const selects = ["band1", "band2", "multiplier"];

// ตารางสี
const colors = [
  { name: "ดำ", value: 0 },
  { name: "น้ำตาล", value: 1 },
  { name: "แดง", value: 2 },
  { name: "ส้ม", value: 3 },
  { name: "เหลือง", value: 4 },
  { name: "เขียว", value: 5 },
  { name: "น้ำเงิน", value: 6 },
  { name: "ม่วง", value: 7 },
  { name: "เทา", value: 8 },
  { name: "ขาว", value: 9 }
];

// tolerance
const tolerances = [
  { name: "ทอง", value: "±5%" },
  { name: "เงิน", value: "±10%" }
];

// map สีจริง
const colorMap = {
  0: "#000000",
  1: "#8B4513",
  2: "#FF0000",
  3: "#FF8C00",
  4: "#FFD700",
  5: "#008000",
  6: "#0000FF",
  7: "#800080",
  8: "#808080",
  9: "#FFFFFF"
};

const toleranceColorMap = {
  "±5%": "#FFD700",
  "±10%": "#C0C0C0"
};

/* =========================
   ฟังก์ชัน
========================= */

// โหลด dropdown
function loadColors() {
  selects.forEach(id => {
    const select = document.getElementById(id);
    colors.forEach(c => {
      const option = document.createElement("option");
      option.value = c.value;
      option.text = c.name;
      select.add(option);
    });
  });

  const tolSelect = document.getElementById("tolerance");
  tolerances.forEach(t => {
    const option = document.createElement("option");
    option.value = t.value;
    option.text = t.name;
    tolSelect.add(option);
  });
}

// อัปเดตสีตัวต้านทาน
function updateResistorColor() {
  document.getElementById("band1-color").style.background =
    colorMap[document.getElementById("band1").value];

  document.getElementById("band2-color").style.background =
    colorMap[document.getElementById("band2").value];

  document.getElementById("multiplier-color").style.background =
    colorMap[document.getElementById("multiplier").value];

  document.getElementById("tolerance-color").style.background =
    toleranceColorMap[document.getElementById("tolerance").value];
}

// คำนวณค่าโอห์ม
function calculateResistor() {
  const b1 = Number(document.getElementById("band1").value);
  const b2 = Number(document.getElementById("band2").value);
  const mul = Number(document.getElementById("multiplier").value);
  const tol = document.getElementById("tolerance").value;

  let resistance = (b1 * 10 + b2) * Math.pow(10, mul);
  let unit = "Ω";

  if (resistance >= 1_000_000) {
    resistance = resistance / 1_000_000;
    unit = "MΩ";
  } else if (resistance >= 1_000) {
    resistance = resistance / 1_000;
    unit = "kΩ";
  }

  document.getElementById("result").innerText =
    `ค่า ≈ ${resistance} ${unit} (${tol})`;
}

/* =========================
   Event
========================= */

selects.forEach(id => {
  document.getElementById(id)
    .addEventListener("change", updateResistorColor);
});

document.getElementById("tolerance")
  .addEventListener("change", updateResistorColor);

// เริ่มต้น
window.onload = () => {
  loadColors();
  updateResistorColor();
};