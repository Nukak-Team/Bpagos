const express = require("express")
const cors = require("cors")
const body_parser = require("body-parser")
const path = require("path")
const pagoService = require("./pagoService.js")

const app = express()
const port = 8088

app.use(cors())
app.use(body_parser.json())

const pathName = "/pagos"

//******************* GET *******************
app.get(pathName,
    async (req, res) => {
        console.log("Recibimos peticion");
        console.log(req.query.idClient);
        res.send(await pagoService.pagosGetExport(req.query.idClient))
    }
)

app.get(pathName+"/pendientes/idCliente", 
    (req, res)=>{
        console.log("Se recibe la petición de get");
        //console.log(req);
        res.send(pagoServices.pagosGetExport())
    }
)

//******************* POST *******************
app.post(pathName,
    (req, res) => {
        console.log("Post: Recibimos las peticion");
        console.log(req.body);
        let pagos = pagoService.pagosSetExport(req.body)
        res.send({"Mensaje" : "pago Guardado ","pagos":pagos})
    }
)

//******************* DELETE *******************
app.delete(pathName,
    (req, res) => {
        console.log("Delete: Recibimos las peticion");
        let id = req.query.id
        console.log(id);
        let pagos = pagoServices.pagosDeleteExport(id)
        res.send({"mensaje":"Pago eliminado","pago":pagos})
    }
)

//******************* PUT *******************
app.put(pathName,
    (req, res) => {
        console.log("Put: Recibimos las peticion");
        res.send("Finaliza")
    }
)

app.path(pathName,
    (req, res) => {
        console.log("path: Recibimos las peticion");
        console.log(req.body);
        res.send("Finaliza")
    }
)

app.listen(port,
    () => {
        console.log("Subio el app pago en el puerto " + port);
    }
)

// para ApiCarrito
// app.get(patName+"/pendientes/idCliente"){
//     (req, res) => {
//         console.log("Recibimos Peticion");
//         console.log(req);
//         idclient = req.query.id
//         res.send(reservaCarrito.carritoPendienteIdGetExport(id))
//     }    
// }

//Para CarritoServices.js
// const setEstadoCarritoExport = (carritoPago) =>{
//     for (let i = 0; i < carrito.length; i++) {
//         if (carrito[i].id === carritoPago.idcarrito) {
//             carrito[i].estadoPago = carritoPago.estadoCarrito
//             i = carrito.length
//         }
//     }
//     return "Carrito con pago confirmado"
// }