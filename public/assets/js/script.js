document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);

  var instance = M.Modal.getInstance(elems);

  document.getElementById('.modal').onclick = function(){
    instance.open();
  }
});

