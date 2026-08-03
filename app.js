const grupos = [
  {id:1,nombre:"RED OSORNO (Noticias y Emergencias)",url:"https://www.facebook.com/groups/redosorno/"},
  {id:2,nombre:"AVISOS OSORNO OFICIAL",url:"https://www.facebook.com/groups/843745069076236/"},
  {id:3,nombre:"Osorno Mi ciudad",url:"https://www.facebook.com/groups/115649698974144/"},
  {id:4,nombre:"Osorno Avisos 3.0",url:"https://www.facebook.com/groups/203134075932939/"},
  {id:5,nombre:"Gente de Osorno",url:"https://www.facebook.com/groups/713990418698365/"},
  {id:6,nombre:"OSORNO COMPRA-VENTA",url:"https://www.facebook.com/groups/112715278757926/"},
  {id:7,nombre:"Ventas Osorno",url:"https://www.facebook.com/groups/395550820066290/"},
];

// Variable global para el formato actual
let formatoActual = 'post';

function scrollToForm(){document.getElementById('form-section').scrollIntoView({behavior:'smooth'});}

// Función para cambiar entre formato Post y Story
function setFormato(formato){
  formatoActual = formato;
  
  // Actualizar botones
  document.querySelectorAll('.format-btn').forEach(btn => {
    btn.classList.remove('active');
    if(btn.dataset.format === formato){
      btn.classList.add('active');
    }
  });
  
  // Regenerar el flyer si ya existe
  const preview = document.getElementById('flyer-preview');
  if(preview.classList.contains('has-content')){
    generarFlyer();
  }
}

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
      fotoHTML = `<img src="${e.target.result}" alt="Foto" style="width:100%;max-height:300px;object-fit:cover;margin:12px 0;border-radius:6px" />`;
      renderFlyer(nombre,tipo,ubicacion,fecha,telefono,recompensa,descripcion,fotoHTML);
    };
    reader.readAsDataURL(fotoInput.files[0]);
  }else{
    renderFlyer(nombre,tipo,ubicacion,fecha,telefono,recompensa,descripcion,'');
  }
}

function renderFlyer(nombre,tipo,ubicacion,fecha,telefono,recompensa,descripcion,fotoHTML){
  const preview = document.getElementById('flyer-preview');
  
  // Determinar estilos según formato
  const esStory = formatoActual === 'story';
  const estiloContainer = esStory 
    ? 'background:#fff;border:3px solid #E53935;padding:16px;max-width:360px;aspect-ratio:9/16;min-height:640px;margin:0 auto;border-radius:8px;box-shadow:0 8px 24px rgba(229,57,53,0.15);display:flex;flex-direction:column;justify-content:space-between;animation:flyer-appear 0.4s ease-out'
    : 'background:#fff;border:3px solid #E53935;padding:16px;max-width:540px;aspect-ratio:1/1;margin:0 auto;border-radius:8px;box-shadow:0 8px 24px rgba(229,57,53,0.15);animation:flyer-appear 0.4s ease-out';
  
  const estiloTitulo = esStory
    ? 'font-size:32px;color:#E53935;text-align:center;margin-bottom:8px;font-weight:800'
    : 'font-size:42px;color:#E53935;text-align:center;margin-bottom:8px;font-weight:800';
  
  const estiloFoto = esStory
    ? 'width:100%;max-height:250px;object-fit:cover;margin:12px 0;border-radius:6px;flex-shrink:0'
    : 'width:100%;max-height:300px;object-fit:cover;margin:12px 0;border-radius:6px';
  
  const estiloTexto = esStory ? 'font-size:14px;margin:6px 0' : 'font-size:18px;margin:8px 0';
  const estiloDescripcion = esStory ? 'font-size:12px;margin:6px 0' : 'font-size:16px;margin:8px 0';
  const estiloTelefono = esStory
    ? 'font-size:20px;font-weight:800;margin-top:16px;text-align:center;background:linear-gradient(135deg, #E53935 0%, #C62828 100%);color:#fff;padding:10px;border-radius:6px'
    : 'font-size:28px;font-weight:800;margin-top:16px;text-align:center;background:linear-gradient(135deg, #E53935 0%, #C62828 100%);color:#fff;padding:12px;border-radius:6px';
  
  preview.innerHTML = `
    <div id="flyer-capture" class="format-${formatoActual}" style="${estiloContainer}">
      <div>
        <h1 style="${estiloTitulo}">PERDIDO</h1>
        ${fotoHTML ? `<div style="text-align:center">${fotoHTML}</div>` : ''}
        <div style="${estiloTexto}"><strong>Tipo:</strong> ${tipo}</div>
        <div style="${estiloTexto}"><strong>Nombre:</strong> ${nombre}</div>
        <div style="${estiloTexto}"><strong>Ubicación:</strong> ${ubicacion}</div>
        <div style="${estiloTexto}"><strong>Fecha:</strong> ${fecha}</div>
        ${descripcion ? `<div style="${estiloDescripcion}"><strong>Descripción:</strong> ${descripcion}</div>`:''}
        ${recompensa ? `<div style="${estiloDescripcion}"><strong>Recompensa:</strong> ${recompensa}</div>`:''}
      </div>
      <div style="text-align:center">
        <div style="${estiloTelefono}">📞 ${telefono}</div>
      </div>
    </div>
  `;
  preview.classList.add('has-content');
}

function descargarFlyer(){
  if(typeof snapdom === 'undefined'){
    alert('Error: SnapDOM no está cargado. Revisa tu conexión a internet.');
    console.error('SnapDOM no definido');
    return;
  }
  
  const elemento = document.getElementById('flyer-capture');
  if(!elemento){
    alert('Primero genera el flyer.');
    return;
  }

  snapdom.download(elemento, {
    format: 'png',
    filename: 'flyer-perdido',
    scale: 2,
    backgroundColor: '#ffffff'
  }).catch(err => {
    console.error('ERROR:', err);
    alert('Error al generar imagen: ' + err.message);
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
