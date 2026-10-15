// Lista ku ruajmë shpenzimet. Çdo shpenzim është {emri: "...", shuma: 10}
let shpenzimet = [];

// Kur hapet faqja, marrim shpenzimet e ruajtura më parë (nëse ka)
let tekstiRuajtur = localStorage.getItem("shpenzimet");
if (tekstiRuajtur != null) {
  shpenzimet = JSON.parse(tekstiRuajtur); // kthen tekstin në listë
}

// Funksioni që shton një shpenzim të ri (thirret nga butoni "Shto")
function shtoShpenzim() {
  let emri = document.getElementById("emri").value;
  let shuma = Number(document.getElementById("shuma").value);

  // Kontrollojmë: emri nuk duhet të jetë bosh, shuma duhet të jetë mbi 0
  if (emri == "" || shuma <= 0) {
    alert("Shkruaj një emër dhe një shumë më të madhe se 0!");
    return; // ndalon funksionin këtu
  }

  shpenzimet.push({ emri: emri, shuma: shuma }); // shtojmë në fund të listës

  // Pastrojmë fushat
  document.getElementById("emri").value = "";
  document.getElementById("shuma").value = "";

  ruajDheShfaq();
}

// Funksioni që fshin një shpenzim sipas numrit të tij në listë
function fshiShpenzim(numri) {
  shpenzimet.splice(numri, 1); // heq 1 element nga pozicioni "numri"
  ruajDheShfaq();
}

// Ruan listën në shfletues dhe e shfaq përsëri
function ruajDheShfaq() {
  localStorage.setItem("shpenzimet", JSON.stringify(shpenzimet)); // kthen listën në tekst dhe e ruan
  shfaq();
}

// Vizaton listën dhe llogarit totalin
function shfaq() {
  let html = "";
  let totali = 0;

  // Ciklin e përsërisim për çdo shpenzim në listë
  for (let i = 0; i < shpenzimet.length; i++) {
    html = html + "<li>" + shpenzimet[i].emri + " - " + shpenzimet[i].shuma + " € " +
           "<button class='fshi' onclick='fshiShpenzim(" + i + ")'>Fshi</button></li>";
    totali = totali + shpenzimet[i].shuma;
  }

  document.getElementById("lista").innerHTML = html;
  document.getElementById("totali").innerHTML = totali.toFixed(2); // 2 shifra pas presjes
}

// Kur hapet faqja, shfaq menjëherë listën e ruajtur
shfaq();