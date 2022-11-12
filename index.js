const express = require("express")
const cors = require("cors")
const body_parser = require("body-parser")
const path = require("path")
const pagoService = require("./pagoService.js")

const app = express()
const port = 8088

app.use(cors())
app.use(body_parser.json())

const patName = "/pagos"

app.get(patName,
    (req, res) => {
        console.log("Recibimos peticion");
        //console.log(req);

        res.send(pagoService.pagosgetExport())
    })

app.post(patName,
    (req, res) => {
        console.log("Post: Recibimos las peticion");
        console.log(req.body);
        let pagos = pagoService.pagosSetExport(req.body)
        res.send({"Mensaje" : "pago Guardado ","pagos":pagos})
    })

    
app.delete(patName,
    (req, res) => {
        console.log("Delete: Recibimos las peticion");
        console.log(req.body);
        console.log("Finaliza Delete");
        res.send("Finaliza")
})

app.put(patName,
    (req, res) => {
        console.log("Put: Recibimos las peticion");
        console.log(req.body);
        console.log("Finaliza Put");
        res.send("Finaliza")
})

app.path(patName,
    (req, res) => {
        console.log("path: Recibimos las peticion");
        console.log(req.body);
        console.log("Finaliza path");
        res.send("Finaliza")
})

app.listen(port,
    () => {
        console.log("Subio el app pago en el puerto " + port);
})

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
// app.patch(patName+"/carrito/estado",
//     (req, res) => {
//         console.log("patch CarritoEstado: Recibimos las peticion");
//         console.log(req.body);
//         res.send(carritoServices.setEstadoCarritoExport(req.body))
//     })

// const setEstadoCarritoExport = (carritoPago) =>{
//     for (let i = 0; i < carrito.length; i++) {
//         if (carrito[i].id === carritoPago.idcarrito) {
//             carrito[i].estadoPago = carritoPago.estadoCarrito
//             i = carrito.length
//         }
//     }
//     return "Carrito con pago confirmado"
// }