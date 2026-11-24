(function () {
  // filtro de projetos
  var botoes = document.querySelectorAll('.filters button');
  var cards = document.querySelectorAll('.card[data-tags]');
  botoes.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-filter');
      botoes.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      cards.forEach(function (c) {
        var tags = c.getAttribute('data-tags').split(' ');
        c.hidden = !(f === 'todos' || tags.indexOf(f) !== -1);
      });
    });
  });

  // copiar e-mail
  var btn = document.getElementById('copiar');
  var mail = document.getElementById('email');
  function selecionar() {
    var r = document.createRange();
    r.selectNodeContents(mail);
    var s = window.getSelection();
    s.removeAllRanges();
    s.addRange(r);
  }
  btn.addEventListener('click', function () {
    var ok = function () {
      btn.textContent = 'Copiado';
      setTimeout(function () { btn.textContent = 'Copiar e-mail'; }, 1800);
    };
    try {
      navigator.clipboard.writeText(mail.textContent.trim()).then(ok, selecionar);
    } catch (e) { selecionar(); }
  });

  // resumo de cursos (quantidade e horas)
  var cursos = document.querySelectorAll('.course');
  var resumo = document.getElementById('resumo-cursos');
  if (resumo && cursos.length) {
    var horas = 0;
    cursos.forEach(function (c) { horas += Number(c.getAttribute('data-horas')) || 0; });
    resumo.textContent = cursos.length + (cursos.length === 1 ? ' curso' : ' cursos') + (horas ? ' · ' + horas + ' h' : '');
  }

  // ano do rodapé
  document.getElementById('ano').textContent = new Date().getFullYear();
})();
