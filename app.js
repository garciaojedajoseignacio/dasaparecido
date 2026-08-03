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
      fotoHTML = `<img src="${e.target.result}" alt="Foto" style="max-width:100%;max-height:200px;height:auto;display:block;margin:10px 0;border-radius:6px"
