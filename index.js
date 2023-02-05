//const fragmento = document.createDocumentFragment()
let formato = ``
let ImgLogo=" "
let Orden="Desc"
let FiltroProgramaId = 0
const Div_tarjetas = document.getElementById("Tarjetas")
const FiltroLabelId = document.getElementById("ProgramaLabel")
const Div_RepoductorMega = document.getElementById("RepoductorMega")
            //  targetas.innerHTML=formato
            //  targetas.append(formato)
async function Cargadedatos(n = 0,i=50){            
  const tarjetas = await fetch('DB.json')
  let carga =  await tarjetas.json() 
  carga.sort(function (a, b) {
    //return  new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
        const as = a.fecha.split("-");
        const ad = new Date(as[2], as[1] - 1, as[0]);
        const bs = b.fecha.split("-");
        const bd = new Date(bs[2], bs[1] - 1, bs[0]);      
      //console.log("Entro en short con ornden " +Orden)
      if (Orden=="Desc"){
        return  bd-ad
      }else {
        return  ad-bd
      }   
  })
  //console.log(carga.length)
  carga.length<i?i=carga.length:i=i
  for (n ; n < i; n++){
    //console.log(carga[n].fecha)
    //console.log(carga[n].ProgramaId +" "+ carga[n].ProgramaNombre) 
    switch (carga[n].ProgramaId) {
      case 1:
        ImgLogo="src/Upplugged.jpg"
        break
      case 2:
        ImgLogo="src/EllaNoTeAma.jpg"
        break
      case 3:
        ImgLogo="src/Misterios.gif"
        break
      default:
        ImgLogo="src/Special.jpg"
        break
    }
    if (FiltroProgramaId == carga[n].ProgramaId ||FiltroProgramaId == 0) {
        formato += `      <div class="col-lg-4" data-aos="fade-left"  data-bs-toggle="tooltip" data-bs-placement="left" data-bs-original-title="`+ carga[n].Descripcion+`">
        <div class="bs-component">                  
          <div class="card border-primary text-white bg-black mb-3" >
            <div class="row g-0">
              <div class="col-md-4">
              <img src="`+ ImgLogo +`" class="img-fluid rounded-start"> 
              </div>
              <div class="col-md-8">
                  <div class="card-body">
              <h4 class="card-title">`+ carga[n].ProgramaNombre +`</h4>
              <p class="card-text">`+ carga[n].Dia+` ` + carga[n].fecha +`</p>
              <a <button type="button" class="btn btn-outline-danger"  onclick="EscucharAudio('`+ carga[n].Linkdescarga.replace("https://mega.co.nz/#!","https://mega.nz/embed/") +`');">
              <svg  width="15" height="15" fill="currentColor" class="bi bi-headphones" viewBox="0 2 15 15">
              <path d="M8 3a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a6 6 0 1 1 12 0v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1V8a5 5 0 0 0-5-5z"/>
              </svg> </button></a>
              <a href=`+ carga[n].Linkdescarga +` <button type="button" class="btn btn-outline-success">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
              </svg> Descargar</button></a>
              </div>
              </div>
            </div>
          </div>
        </div>                    
      </div>`
    }
  }
  Div_tarjetas.innerHTML=formato
  ActivarTooltips()
  formato= ``
  carga=" " 
}
function ActivarTooltips() {
  
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList  =[...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
} 
function OrdenFecha(OrdenSeleccionado) {
  OrdenSeleccionado =="Descendente"? Orden="Desc": Orden="Asc"
  Cargadedatos(0,50);
}

function FiltroProgramas(Programa=0) {
  switch (Programa) {
    case 1:
      FiltroProgramaId = 1
      FiltroLabelId.textContent="Programa : Unplugged"
      break;
    case 2:
      FiltroProgramaId = 2
      FiltroLabelId.textContent="Programa : Ella No Te Ama"
      break;
    case 3:
      FiltroProgramaId = 3
      FiltroLabelId.textContent="Programa : Misterios Misteriosos"
      break;
    default:
      FiltroProgramaId = 0
      FiltroLabelId.textContent="Programa : Todos"
      break;
  }
  Cargadedatos(0,50);
}
function EscucharAudio(linkMega) {
  let FormaRepoductorMega = `<iframe width="720" height="80" frameborder="0" src="`+linkMega+`"></iframe>`
  Div_RepoductorMega.innerHTML=FormaRepoductorMega
}
// async function CancionActual() {
//   //FiltroLabelId.textContent = await fetch('http://perseus.shoutca.st:8803/currentsong?sid=1')
//   const tarjetas = await fetch('http://perseus.shoutca.st:8803/index.html', {    
//     method: 'GET',    
//     withCredentials: true,    
//     crossorigin: true,    
//     mode: 'no-cors',       
//   })
//   let radiox =  await tarjetas.text() 
//   //FiltroLabelId.textContent= radiox
//   console.log(radiox)
// }

// CancionActual()


 // carga.map((Datos)=>{
  //   n++
  //   if (n>0 & n<=i){

  //     console.log(Datos.fecha)         
  //     formato += `      <div class="col-lg-4" data-aos="fade-left">
  //     <div class="bs-component">          
  //       <div class="card border-primary text-white bg-black mb-3" style="max-width: 20rem;">
  //         <div class="card-body">
  //           <h4 class="card-title">`+ Datos.ProgramaNombre +`</h4>
  //           <h6 class="card-subtitle mb-2 text-muted">****</h6>
  //           <p class="card-text">`+ Datos.Dia+` ` + Datos.fecha +`</p>
  //           <a href=`+ Datos.Linkdescarga +` <button type="button" class="btn btn-outline-success">Descargar</button></a>
  //         </div>
  //       </div>
  //     </div>                    
  //     </div>`
      
  //   }
    
  // })


//Cargadedatos(0,50)
//console.log("jamon de pavo")



