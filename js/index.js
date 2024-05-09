// Pro funkčnost Popovers
function nactiPopovers() {
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
  const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
}

// Dropwodn se zavře
$('.dropdown-item').on('click', function () {
  $('.navbar-collapse').collapse('hide');
});
$(document).ready(function () {
})


//! Funkce pro načtení obsahu z hlavni.html
const cilovyDiv = document.getElementById('obsahStranky');

function nactiObsah(idDivu, addToHistory = true) {
  // Najde cílový
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
    nactiObsah(event.state.divId, false); // Nepřidát do historie (vyhnutí prázdnému #)
  }
});

//* Když je obsahStranky prázdný, načte sekci "informace"
if (cilovyDiv.innerHTML === "") {
  nactiObsah("informace")
}

//* Test zone
let btnMain = document.getElementById("btnMain")
let btnServers = document.getElementById("btnServers")
let btnTeam = document.getElementById("btnTeam")
let btnVyhody = document.getElementById("btnVyhody")
let btnFaq = document.getElementById("btnFaq")
let btnBany = document.getElementById("btnBany")

function removeActivePages(id) {
  if (btnMain.classList.contains("active")) {
    btnMain.classList.remove("active")
  } else if (btnServers.classList.contains("active")) {
    btnServers.classList.remove("active")
  } else if (btnTeam.classList.contains("active")) {
    btnTeam.classList.remove("active")
  } else if (btnVyhody.classList.contains("active")) {
    btnVyhody.classList.remove("active")
  } else if (btnFaq.classList.contains("active")) {
    btnFaq.classList.remove("active")
  } else if (btnBany.classList.contains("active")) {
    btnBany.classList.remove("active")
  }
}

// Po přídání divu s obsahem textu je potřeba ho přidat i sem pro active page underline
function activePage(divId) {
  console.log("Div " + divId + " nalezen")
  if (divId) {
    if (divId === "informace" || divId === "pravidla" || divId === "download" || divId === "kontakt") {
      btnMain.classList.add("active")
    } else if (divId === "servers" || divId === "serverSky" || divId === "serverSur") {
      btnServers.classList.add("active")
    } else if (divId === "aTeam") {
      btnTeam.classList.add("active")
    } else {
      console.error("Nenalezen button na active page")
    }
  } else {
    console.error(`Element s ID "${divId}" nebyl nalezen.`);
  }
}
