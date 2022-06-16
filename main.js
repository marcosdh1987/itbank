var url ="https://www.dolarsi.com/api/api.php?type=valoresprincipales"
//var timer = setInterval(verCotizaciones, 1000);
datetime = new Date();


verCotizaciones();

function verCotizaciones(){
    var info = document.getElementById("grid-1");

    info.innerHTML = "";
    fetch(url)
    .then(response => response.json())
    .then(data => {

        for(var i in data){
            

            if(!data[i].casa.compra.includes("No Cotiza") && data[i].casa.nombre.includes("Dolar")){
            info.innerHTML += `

            <div class="card text-center">
            <div class="card-header">
            ${data[i].casa.nombre}
            </div>
            <div class="card-body">
              <h5 class="card-title">${data[i].casa.agencia}</h5>
              <p class="card-text">${data[i].casa.compra}</p>
              <p class="card-text">${data[i].casa.venta}</p>
            </div>
            <div class="card-footer text-muted">
            ${datetime.toLocaleString()}
            </div>
          </div>

            `;
        
        }
        }
    }
    );

}

function descargarCotizaciones(){
    fetch(url)
    .then(response => response.json())
    .then(data => {
        var json = JSON.stringify(data);
        var blob = new Blob([json], {type: "application/json"});
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "cotizaciones.json";
        a.click();
    });

}