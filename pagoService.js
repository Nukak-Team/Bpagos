const getMongo = require("./mongodb.js")
let request = require("axios")

//******************* Conexiones *******************

async function getConexiones() {
    const nameDb = "FerreteriaNukak"
    const client = await getMongo.getClientExport(nameDb)
    const collection = await getMongo.getCollectionExport(client, nameDb)
    return { collection, client }
}

//******************* GET *******************

const pagosGet = async (idClient) => {
    const {collection, client } = await getConexiones()
    const pagos = collection.find({"idclient":idClient})
    const pagosList = await pagos.toArray()
    await getMongo.closeClientExport(client)
    return pagosList
}

//******************* SET *******************

const pagosSet = async (pago)=>{
    const {collection, client } = await getConexiones()
    if (pago.estado === "Aprobado") {
        const carrito = request.patch(
            "localhost:8093/carrito/estado",
            {"idCarrito":pago.idCarrito,"estadoCarrito":"Confirmado"}
        ).then(
            console.log("PAGO CONFIRMADO")
        )
        .catch(
            (error)=>{
                console.log("ERROR EN EL PAGO DE ESTADO")
                console.log(error)
            }
        )
    }
    
    await collection.insertOne(pago).then(
        (resp)=>{
            console.log("PAGO REGISTRADO")
        }
    )
    await getMongo.closeClientExport(client)
    return pago
}

const pagosDelete = (id)=>{
    pagos = pagos.filter((vuel)=>{return vuel.id != id})
    return pagos

}

module.exports.pagosGetExport = pagosGet;
module.exports.pagosSetExport = pagosSet;
module.exports.pagosDeleteExport = pagosDelete;