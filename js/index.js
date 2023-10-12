// Pro funkčnost Popovers
function nactiPopovers() {
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
  const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
}

// Zkopíruje text buttonu
function copyIp() {
  let copyIp = document.getElementById("serverIP");
  navigator.clipboard.writeText(copyIp.innerText)
  // Popover zmizí za 3s
  setTimeout(function() {
    const popover = bootstrap.Popover.getInstance(copyIp);
    if (popover) {
      popover.hide();
    }
  }, 3000);
}


// Dropwodn se zavře
$('.dropdown-item').on('click', function(){
  $('.navbar-collapse').collapse('hide');
});
$(document).ready(function(){
})



// const cilovyDiv = document.getElementById('obsahStranky');

//! Funkce pro načtení obsahu z hlavni.html
const cilovyDiv = document.getElementById('obsahStranky');

function nactiObsah(idDivu, addToHistory = true) {
  // Najdeme cílový div na této stránce
  // const cilovyDiv = document.getElementById('obsahStranky');
  

  // Pokud cílový div existuje, smažeme jeho stávající obsah
  if (cilovyDiv) {
    cilovyDiv.innerHTML = ''; // Vymaže obsah divu
  } else {
    console.error('Cílový div nebyl nalezen.');
    return;
  }

  // Načteme obsah stránky "index.html" pomocí AJAX nebo fetch
  fetch('obsah.html')
    .then((response) => response.text())
    .then((data) => {
      // Vytvoříme dočasný element pro zpracování HTML obsahu
      const tempElement = document.createElement('div');
      tempElement.innerHTML = data;

      // Najdeme obsah cílového divu ze stránky "index.html" a vložíme ho do cílového divu na této stránce
      const obsahCilevehoDivu = tempElement.querySelector(`#${idDivu}`);
      if (obsahCilevehoDivu) {
        removeActivePages(idDivu)
        cilovyDiv.appendChild(obsahCilevehoDivu);
        nactiPopovers();
        activePage(idDivu)
        if (addToHistory) {
          history.pushState({ divId: idDivu }, '', '#' + idDivu);
        }
      } else {
        console.error(`Div s id "${idDivu}" nebyl nalezen ve stránce "index.html".`);
      }
    })
    .catch((error) => {
      console.error('Nelze načíst obsah stránky "hlavni.html":', error);
    });
}

// Náčítání stránek pomocí #
window.addEventListener('popstate', function (event) {
  if (event.state && event.state.divId) {
    console.log('Hash changed:', window.location.hash);
    nactiObsah(event.state.divId, false); // Nepřidáváme to do historie, abychom se vyhnuli prázdnému hashi
  }
});



    

//* Když je obsahStranky prázdný, načte sekci "informace"
if (cilovyDiv.innerHTML === "") {
  nactiObsah("informace")
}



//* Test zone
let btnMain = document.getElementById("btnMain")
let btnServers = document.getElementById("btnServers")

function removeActivePages(id) {
  if (btnMain.classList.contains("active")) {
    btnMain.classList.remove("active")
  } else if (btnServers.classList.contains("active")) {
    btnServers.classList.remove("active")
  }
}

function activePage(divId) {
  console.log(divId + "div znám")
  if (divId) {
    console.log("prvni část")
    if (divId === "informace" || divId === "pravidla") {
      console.log("druhá část")
      btnMain.classList.add("active")
    } else if (divId === "servers" || divId === "serverSky") {
      btnServers.classList.add("active")
    } else {
      console.error("Nenalezen žádný button na active page")
    }
  } else {
    console.error(`Element s ID "${divId}" nebyl nalezen.`);
  }
}







//? Dropdowb on hover
// $(document).ready(function(){
//   $('.dropdown').hover(function(){
//     $(this).find('.dropdown-menu')
//     .stop(true, true).delay(100).fadeIn(200);
//   }, function(){
//     $(this).find('.dropdown-menu')
//     .stop(true, true).delay(100).fadeOut(200);
//   });
// });

//? Staré načítání stránek
// $('#btnInformace,#btnInformaceMain').click(function(e){
//   $("#pravidla,#download,#kontakt").addClass("d-none")
//   $("#informace").removeClass("d-none")
// })
// $('#btnPravidla').click(function(){
//     $("#informace,#download,#kontakt").addClass("d-none")
//     $("#pravidla").removeClass("d-none")
// })
// $('#btnDownload').click(function(){
//     $("#informace,#pravidla,#kontakt").addClass("d-none")
//     $("#download").removeClass("d-none")
// })
// $('#btnKontakt').click(function(){
//     $("#informace,#pravidla,#download").addClass("d-none")
//     $("#kontakt").removeClass("d-none")
// })