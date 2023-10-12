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


const cilovyDiv = document.getElementById('obsahStranky');

//! Funkce pro načtení obsahu z hlavni.html
function nactiObsah(idDivu) {
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
      .then(response => response.text())
      .then(data => {
          // Vytvoříme dočasný element pro zpracování HTML obsahu
          const tempElement = document.createElement('div');
          tempElement.innerHTML = data;
          
          // Najdeme obsah cílového divu ze stránky "index.html" a vložíme ho do cílového divu na této stránce
          const obsahCilevehoDivu = tempElement.querySelector(`#${idDivu}`);
          if (obsahCilevehoDivu) {
            cilovyDiv.appendChild(obsahCilevehoDivu);
            nactiPopovers()
            window.location.hash = idDivu;
          } else {
              console.error(`Div s id "${idDivu}" nebyl nalezen ve stránce "index.html".`);
          }
      })
      .catch(error => {
          console.error('Nelze načíst obsah stránky "hlavni.html":', error);
      });

    }


//* Když je obsahStranky prázdný, načte sekci "informace"
if (cilovyDiv.innerHTML === "") {
  nactiObsah("informace")
  // nacistObsahATeam('aTeam')
}

// Náčítání stránek pomocí # (šípek zpět/dopředu)
window.addEventListener('hashchange', function () {
  const hash = window.location.hash.substring(1); // Získáme název stránky bez "#"
  if (hash) {
      // Na základě hashe načteme správný obsah
      nactiObsah(hash);
  }
});


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