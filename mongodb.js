const {MongoClient} = require("mongodb")

const getClient = async (nameDB) => {
    const url = "mongodb+srv://NukakTeam:Nukak.2610@clusternukak.ld93wmw.mongodb.net/"
    const client = new MongoClient(url+nameDB)

    await client.connect().then(
        (db)=>{
            console.log("Conexión exitosa")
            //console.log(db)
        }
    ).catch(
        (db)=>{
            console.log("Se presentó un error en la conexión")
            console.log(db)
        }
    )
    return client
}

const getCollection = async (client, nameDB) => {
    const db = client.db(nameDB)
    const collection = await db.collection("Pagos")
    return collection
}

const closeClient = async (client) => {
    await client.close()
}

module.exports.getCollectionExport = getCollection;
module.exports.getClientExport = getClient;
module.exports.closeClientExport = closeClient;