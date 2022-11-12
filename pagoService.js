let pagos = require("./pagos.json")
let request = require("axios")


const pagosget = ()=>{
    return pagos
}
const pagosSet = (pago)=>{
    if (pago.estado === "Aprobado") {
        const carrito = request.patch(
            "localhost:8093/carrito/estado",
            {"idcarrito":pago.idcarrito,"estadoCarrito":"Confirmado"}  
        ).then(
            console.log("PAGO CONFIRMADO")
        )            
    }
    pagos.push(pago)
    return pagos
}

const pagosDelete = (id)=>{
    pagos = pagos.filter((vuel)=>{return vuel.id != id})
    return pagos

}

module.exports.pagosgetExport = pagosget;
module.exports.pagosSetExport = pagosSet;
module.exports.pagosDeleteExport = pagosDelete;