/**
 * Bola da Vez — renderização dinâmica.
 * Os dados vêm de window.BDV_DATA, definido inline no index.html.
 * Para atualizar o produto a cada 15 dias, edite o bloco <script> window.BDV_DATA no index.html
 * (e opcionalmente sincronize com data/bola-da-vez.json para referência).
 */
(function () {
  var SECTION = document.getElementById('bola-da-vez');
  if (!SECTION) return;

  var d = window.BDV_DATA;
  if (!d) return; // segurança: dados não definidos

  renderBDV(d);

  function renderBDV(d) {
    // Badge de validade
    var validadeHTML = '';
    if (d.valido_ate) {
      var ate = new Date(d.valido_ate);
      var hoje = new Date();
      var diff = Math.ceil((ate - hoje) / (1000 * 60 * 60 * 24));
      if (diff > 0) {
        validadeHTML = '<span class="bdv-prazo">⏱ Oferta válida por mais ' + diff + ' dia' + (diff !== 1 ? 's' : '') + '</span>';
      } else {
        validadeHTML = '<span class="bdv-prazo bdv-prazo--expirado">🔄 Novo produto em breve</span>';
      }
    }

    // Benefícios
    var beneficiosHTML = (d.beneficios || []).map(function (b) {
      return '<li>' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>' +
        b + '</li>';
    }).join('');

    // Especificações
    var specsHTML = (d.especificacoes || []).map(function (s) {
      return '<div class="bdv-spec"><span class="bdv-spec-label">' + s.label + '</span><span class="bdv-spec-value">' + s.value + '</span></div>';
    }).join('');

    // Modo de uso
    var modoHTML = (d.modo_de_uso || []).map(function (m, i) {
      return '<li><span class="bdv-step-num">' + (i + 1) + '</span>' + m + '</li>';
    }).join('');

    var modoSection = d.modo_de_uso && d.modo_de_uso.length
      ? '<div class="bdv-modo fade-up"><h4>Modo de uso</h4><ol class="bdv-steps">' + modoHTML + '</ol></div>'
      : '';

    // Imagem ou thumb do vídeo
    var imgSrc = d.video_thumb || d.imagem;
    var imgLink = d.video_url
      ? 'href="' + d.video_url + '" target="_blank"'
      : '';
    var imgHTML = imgLink
      ? '<a ' + imgLink + ' class="bdv-video-link" title="Assistir vídeo"><img src="' + imgSrc + '" alt="' + d.produto + '" loading="lazy"><span class="bdv-play">▶</span></a>'
      : '<img src="' + (d.imagem) + '" alt="' + d.produto + '" loading="lazy">';

    SECTION.querySelector('.container').innerHTML =
      '<div class="bdv-header fade-up">' +
        '<div class="bdv-badge">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' +
          'Bola da Vez' +
        '</div>' +
        '<h2>Produto em <span class="text-gradient-accent">destaque</span> da quinzena</h2>' +
        '<p>Um produto selecionado para fazer a diferença na sua marcenaria. Consulte seu vendedor GMAD.</p>' +
        validadeHTML +
      '</div>' +

      '<div class="bdv-featured fade-up">' +
        '<div class="bdv-featured-img">' +
          '<span class="bdv-tag">⚡ Destaque da Quinzena</span>' +
          imgHTML +
        '</div>' +
        '<div class="bdv-featured-info">' +
          '<span class="bdv-cat">' + d.marca + '</span>' +
          '<h3>' + d.produto + '</h3>' +
          '<p>' + d.descricao + '</p>' +
          (specsHTML ? '<div class="bdv-specs">' + specsHTML + '</div>' : '') +
          '<ul class="bdv-features">' + beneficiosHTML + '</ul>' +
          '<a href="' + d.whatsapp + '" target="_blank" class="bdv-btn">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.562 4.14 1.535 5.875L0 24l6.295-1.508A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.655-.497-5.187-1.366l-.371-.22-3.843.919.972-3.745-.242-.385A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>' +
            'Comprar pelo WhatsApp' +
          '</a>' +
          '<a href="' + d.link_completo + '" target="_blank" class="bdv-card-btn" style="margin-top:8px">Ver página completa →</a>' +
        '</div>' +
      '</div>' +

      modoSection;
  }
})();
