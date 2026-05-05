console.log("JS IS RUNNING");

// ================= GLOBAL VARIABLES =================
let questions = [];
let currentQ = 0;
let score = 0;
let selectedChapter = "";
let timerInterval;
// ================= DATABASES =================

const solutionsDB = {
"Surface Areas and Volumes": [
   "Q1 - 45.9375",
   "Q2 - 11.2828",
   "Q3 - 103.6725",
   "Q4 - 2258.6667",
   "Q5 - 9.3333",
   "Q6 - h = r",
   "Q7 - 1:1",
   "Q8 - 11.4591",
   "Q9 - 1:3",
   "Q10 - 14",
   "Q11 - 1302.6667",
   "Q12 - 1:3",
   "Q13 - 1584",
   "Q14 - 32",
   "Q15 - 902",
   "Q16 - 126",
   "Q17 - 718.6667",
   "Q18 - 112",
   "Q19 - 628.8333",
   "Q20 - 265.6189",
   "Q21 - 179.6667",
   "Q22 - 12844.7570",
   "Q23 - 1437.3333",
   "Q24 - 27104",
   "Q25 - 1025.2651",
   "Q26 - 3.7221",
   "Q27 - 63",
   "Q28 - 308",
   "Q29 - 1302",
   "Q30 - 1:1",
   "Q31 - 6.8853",
   "Q32 - 7.9155",
   "Q33 - 179.6667",
   "Q34 - 4.6667",
   "Q35 - 14.5050",
   "Q36 - 13.1119",
   "Q37 - 2755.2505",
   "Q38 - 66.6667",
   "Q39 - 7.8227",
   "Q40 - 1306.6667",
   "Q41 - 1099.5574",
   "Q42 - 1077.5663",
   "Q43 - 2.0000",
   "Q44 - 3:5",
   "Q45 - V: 179.5944, SA: 163.0203",
   "Q46 - 718.3775",
   "Q47 - 224",
   "Q48 - 361.2832",
   "Q49 - 3335.3389",
   "Q50 - 9.3333",
   "Q51 - h = r",
   "Q52 - 3:7",
   "Q53 - 46",
   "Q54 - 2078.1635",
   "Q55 - 6",
   "Q56 - 3:1",
   "Q57 - 9:7",
   "Q58 - 1:3",
   "Q59 - 8444.6010",
   "Q60 - 3600",
   "Q61 - 12",
   "Q62 - 4R³ = 3r²h",
   "Q63 - 628.5714",
   "Q64 - 2 : (π√3)",
   "Q65 - 37.3333",
   "Q66 - 628.8333",
   "Q67 - 228",
   "Q68 - 56",
   "Q69 - 1015.9284",
   "Q70 - 265.6189",
   "Q71 - 1436.7550",
   "Q72 - 11847.6912",
   "Q73 - 27093.0950",
   "Q74 - 54",
   "Q75 - 27",
   "Q76 - 1.25",
   "Q77 - 179.5944",
   "Q78 - 4.6667",
   "Q79 - 307.8761",
   "Q80 - 12:7",
   "Q81 - 2752.0351",
   "Q82 - 6",
   "Q83 - 80",
   "Q84 - 2",
   "Q85 - 11.2838",
   "Q86 - 6.8404",
   "Q87 - 100",
   "Q88 - 14",
   "Q89 - 2752.0351",
   "Q90 - 346.3606",
   "Q91 - 646.5486",
   "Q92 - 1055.5722",
   "Q93 - 1",
   "Q94 - 3:5",
   "Q95 - V: 179.5944, SA: 163.0203",
   "Q96 - V: 718.3775, SA: 470.8872",
   "Q97 - 27093.0950",
   "Q98 - 14",
   "Q99 - 113.0973",
   "Q100 - 4:1"
  ]
};


// ================= CHAPTER LIST =================
let chapters = [
  "Surface Areas and Volumes",
  "Polynomials",
  "Pair of Linear Equations",
  "Quadratic Equations",
  "Arithmetic Progressions",
  "Triangles",
  "Heights and Distances",
  "Areas Related to Circles",
  "Statistics",
  "Probability",
  "Trigonometry",
  "Real Numbers"
];

// ================= SCREEN SWITCH =================
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
}


// ================= LOAD CHAPTERS =================
function loadChapters() {
  let container = document.getElementById("chapterList");
  container.innerHTML = "";

  chapters.forEach(ch => {
    let div = document.createElement("div");
    div.className = "chapter";
    div.innerText = ch;

    div.onclick = () => {
      selectedChapter = ch;
      showScreen("mode");
    };

    container.appendChild(div);
  });
}


// ================= BACK FROM MODE =================
function backFromMode() {
  showScreen("chapters");
}


// ================= START WORKSHEET =================
function startWorksheet() {
  if (!selectedChapter) {
    alert("Please select a chapter first!");
    return;
  }

  let qs = worksheetDB[selectedChapter];

  if (!qs) {
    alert("Worksheet not found!");
    return;
  }

  showScreen("worksheet");

  let container = document.getElementById("questionsList");
  container.innerHTML = "";

  qs.forEach((q, index) => {
    let div = document.createElement("div");
    div.innerText = `Q${index + 1}: ${q}`;
    container.appendChild(div);
  });
}


// ================= OPEN SOLUTIONS =================
function openSolutions() {
  if (!selectedChapter) {
  alert("Select a chapter first!");
  return;
}
  let container = document.getElementById("solutionList");
  let title = document.getElementById("solutionTitle");

  // Set title
  title.innerText = "Solutions for: " + selectedChapter;

  // Remove old solutions
  container.querySelectorAll(".sol, .noSol").forEach(el => el.remove());

  let sols = solutionsDB[selectedChapter];

  if (!sols) {
    let msg = document.createElement("h3");
    msg.className = "noSol";
    msg.innerText = "Solutions not available!";
    container.appendChild(msg);
  } else {
    sols.forEach((s) => {
      let div = document.createElement("div");
      div.className = "sol";
      div.innerText = s;
      container.appendChild(div);
    });
  }

  showScreen("solutions");
}


// ================= GO HOME =================
function goHome() {
  showScreen("start");

  setTimeout(() => {
    showScreen("chapters");
  }, 2000);
}


// ================= INIT =================
window.onload = function () {
  loadChapters();

  setTimeout(() => {
    showScreen("chapters");
  }, 3000);
};
