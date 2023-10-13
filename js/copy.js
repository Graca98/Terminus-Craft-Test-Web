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