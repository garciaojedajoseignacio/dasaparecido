const grupos = [
  {id:1,nombre:"RED OSORNO (Noticias y Emergencias)",url:"https://www.facebook.com/groups/redosorno/"},
  {id:2,nombre:"AVISOS OSORNO OFICIAL",url:"https://www.facebook.com/groups/843745069076236/"},
  {id:3,nombre:"Osorno Mi ciudad",url:"https://www.facebook.com/groups/115649698974144/"},
  {id:4,nombre:"Osorno Avisos 3.0",url:"https://www.facebook.com/groups/203134075932939/"},
  {id:5,nombre:"Gente de Osorno",url:"https://www.facebook.com/groups/713990418698365/"},
  {id:6,nombre:"OSORNO COMPRA-VENTA",url:"https://www.facebook.com/groups/112715278757926/"},
  {id:7,nombre:"Ventas Osorno",url:"https://www.facebook.com/groups/395550820066290/"},
];

function scrollToForm(){document.getElementById('form-section').scrollIntoView({behavior:'smooth'});}

function generarFlyer(){
  const nombre = document.getElementById('nombre').value || '';
  const tipo = document.getElementById('tipo').value || '';
  const ubicacion = document.getElementById('ubicacion').value || '';
  const fecha = document.getElementById('fecha').value || '';
  const telefono = document.getElementById('telefono').value || '';
  const recompensa = document.getElementById('recompensa').value || '';
  const descripcion = document.getElementById('descripcion').value || '';
  const fotoInput = document.getElementById('foto');

  let fotoHTML = '';
  if(fotoInput.files && fotoInput.files[0]){
    const reader = new FileReader();
    reader.onload = function(e){
      fotoHTML = `<img src="${e.target.result}" alt="Foto" style="max-width:100%;max-height:200px;height:auto;display:block;margin:10px 0;border-radius:6px" />`;
      renderFlyer(nombre,tipo,ubicacion,fecha,telefono,recompensa,descripcion,fotoHTML);
    };
    reader.readAsDataURL(fotoInput.files[0]);
  }else{
    renderFlyer(nombre,tipo,ubicacion,fecha,telefono,recompensa,descripcion,'');
  }
}

function renderFlyer(nombre,tipo,ubicacion,fecha,telefono,recompensa,descripcion,fotoHTML){
  const preview = document.getElementById('flyer-preview');
  preview.innerHTML = `
    <div id="flyer-capture" style="background:#fff;border:3px solid #E53935;padding:16px;width:450px;margin:0 auto;border-radius:12px;box-shadow:0 8px 24px rgba(229,57,53,0.15);animation:flyer-appear 0.4s ease-out">
      <h1 style="font-size:42px;color:#E53935;text-align:center;margin-bottom:6px;font-weight:800;letter-spacing:-1px">PERDIDO</h1>
      ${fotoHTML}
      <div style="font-size:16px;margin:6px 0"><strong>Tipo:</strong> ${tipo}</div>
      <div style="font-size:16px;margin:6px 0"><strong>Nombre:</strong> ${nombre}</div>
      <div style="font-size:16px;margin:6px 0"><strong>Ubicación:</strong> ${ubicacion}</div>
      <div style="font-size:16px;margin:6px 0"><strong>Fecha:</strong> ${fecha}</div>
      ${descripcion ? `<div style="font-size:14px;margin:6px 0"><strong>Descripción:</strong> ${descripcion}</div>`:''}
      ${recompensa ? `<div style="font-size:14px;margin:6px 0"><strong>Recompensa:</strong> ${recompensa}</div>`:''}
      <div style="font-size:24px;font-weight:800;margin-top:12px;text-align:center;background:linear-gradient(135deg, #E53935 0%, #C62828 100%);color:#fff;padding:12px;border-radius:8px">📞 ${telefono}</div>
    </div>
  `;
  preview.classList.add('has-content');
}

function prepararFlyerParaCaptura(){
  const elemento = document.getElementById('flyer-capture');
  if(!elemento) return null;

  const clone = elemento.cloneNode(true);
  clone.style.position = 'fixed';
  clone.style.left = '-9999px';
  clone.style.top = '0';
  clone.style.width = '450px';
  clone.style.maxWidth = 'none';
  clone.style.overflow = 'visible';
  clone.style.zIndex = '-9999';
  clone.style.backgroundColor = '#FFFFFF';
  clone.style.opacity = '1';
  document.body.appendChild(clone);
  return clone;
}

function prepararFlyerParaCapturaFeed(){
  const elemento = document.getElementById('flyer-capture');
  if(!elemento) return null;

  const clone = elemento.cloneNode(true);
  clone.style.position = 'fixed';
  clone.style.left = '-9999px';
  clone.style.top = '0';
  clone.style.width = '450px';
  clone.style.height = 'auto';
  clone.style.maxWidth = 'none';
  clone.style.overflow = 'hidden';
  clone.style.zIndex = '-9999';
  clone.style.backgroundColor = '#FFFFFF';
  clone.style.opacity = '1';
  clone.style.borderRadius = '12px';
  document.body.appendChild(clone);
  return clone;
}

function limpiarFlyerCaptura(clone){
  if(clone) document.body.removeChild(clone);
}

function descargarFlyerHistorias(){
  const clone = prepararFlyerParaCaptura();
  if(!clone){
    alert('Primero genera el flyer.');
    return;
  }

  const rect = clone.getBoundingClientRect();
  const realWidth = Math.round(rect.width);
  const realHeight = Math.round(rect.height);

  html2canvas(clone, {
    scale: 3,
    useCORS: true,
    backgroundColor: null,
    width: realWidth,
    height: realHeight,
    scrollX: 0,
    scrollY: 0,
    windowWidth: realWidth,
    windowHeight: realHeight,
    ignoreElements: function(el){
      return el.style.opacity === '0' || el.style.display === 'none';
    },
    logging: false
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'flyer-historias.png';
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
    limpiarFlyerCaptura(clone);
  }).catch(err => {
    console.error('Error:', err);
    limpiarFlyerCaptura(clone);
  });
}

function descargarFlyerFeed(){
  const clone = prepararFlyerParaCapturaFeed();
  if(!clone){
    alert('Primero genera el flyer.');
    return;
  }

  const rect = clone.getBoundingClientRect();
  const realWidth = Math.round(rect.width);
  const realHeight = Math.round(rect.height);

  html2canvas(clone, {
    scale: 3,
    useCORS: true,
    backgroundColor: null,
    width: realWidth,
    height: realHeight,
    scrollX: 0,
    scrollY: 0,
    windowWidth: realWidth,
    windowHeight: realHeight,
    ignoreElements: function(el){
      return el.style.opacity === '0' || el.style.display === 'none';
    },
    logging: false
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'flyer-feed.png';
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
    limpiarFlyerCaptura(clone);
  }).catch(err => {
    console.error('Error:', err);
    limpiarFlyerCaptura(clone);
  });
}

function renderGrupos(){
  const list = document.getElementById('grupos-list');
  list.innerHTML = grupos.map(g => `
    <div class="grupo-item">
      <strong>${g.nombre}</strong><br/>
      <a href="${g.url}" target="_blank" rel="noopener">Abrir grupo</a>
    </div>
  `).join('');
}

function renderChecklist(){
  const checklist = document.getElementById('checklist');
  const saved = JSON.parse(localStorage.getItem('checklist_osorno')||'{}');
  checklist.innerHTML = grupos.map(g => `
    <div class="check-item">
      <label>
        <input type="checkbox" data-id="${g.id}" ${saved[g.id]?'checked':''} onchange="toggleCheck(${g.id})" />
        <span>${g.nombre}</span>
      </label>
    </div>
  `).join('');
}

function toggleCheck(id){
  const saved = JSON.parse(localStorage.getItem('checklist_osorno')||'{}');
  saved[id] = !saved[id];
  localStorage.setItem('checklist_osorno', JSON.stringify(saved));
}

document.addEventListener('DOMContentLoaded', () => {
  renderGrupos();
  renderChecklist();
});
