import mongoose from 'mongoose'

/**
 * 1 = Connected
 * 2 = connecting
 * 3 = disconnecting
 */

const mongoConnection = {
    isConnected: 0
}

export const connect = async () => {

    if( mongoConnection.isConnected ){
        console.log('YA ESTABAMOS CONECTADOS')
        return
    }

    if( mongoose.connections.length > 0 ){
        mongoConnection.isConnected = mongoose.connections[0].readyState

        if( mongoConnection.isConnected === 1 ){
            console.log('USANDO CONEXION ANTERIOR')
            return
        }

        await mongoose.disconnect()
    }
    
    await mongoose.connect( process.env.MONGO_URL || '' )
    mongoConnection.isConnected = 1
    console.log('CONECTADO A MONGO DB:', process.env.MONGO_URL)
}

export const disconnect = async() => {

    if(  process.env.NODE_ENV === 'development' ) return

    if(  mongoConnection.isConnected === 0 ) return

    await mongoose.disconnect()
    mongoConnection.isConnected = 0
    console.log('DECONECTADO DE MONGO DB')
}