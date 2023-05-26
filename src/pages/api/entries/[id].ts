import { db } from '@/database'
import { Entry, IEntry } from '@/models'
import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import async from '../seed';

type Data = 
    | {message: string}
    | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query

    if( !mongoose.isValidObjectId( id ) ){
        return res.status(400).json({message: 'El id no es válido' + ' ' + id})
    }

    switch ( req.method ) {
        case 'GET':
            return getEntry( req, res )
        case 'PUT':
            return updateEntry( req, res )
        case 'DELETE':
            return deleteEntry( req, res )
    
        default:
            return res.status(400).json({ message: 'Metodo no existe' })
    }
}

const getEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { id } = req.query

    await db.connect()

    const entryInDetail = await Entry.findById( id )

    if( !entryInDetail ){
        await db.disconnect()
        return res.status(400).json({message: 'No hay entrada con ese id'  + ' ' + id})
    }

    await db.disconnect()
    res.status(200).json( entryInDetail! )

}




const updateEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { id } = req.query

    await db.connect()

    const entryToUpdate = await Entry.findById( id )

    if( !entryToUpdate ){
        await db.disconnect()
        return res.status(400).json({message: 'No hay entrada con ese id'  + ' ' + id})
    }

    const { 
        description = entryToUpdate.description, 
        status = entryToUpdate.status,
    } = req.body

 
    try {
        const updatedEntry = await Entry.findByIdAndUpdate( id, { description, status }, { runValidators: true, new: true } )
        await db.disconnect()
        res.status(200).json( updatedEntry! )
    } catch (error: any) {
        await db.disconnect()
        res.status(400).json({message: error.errors.status.message})
    }

}



const deleteEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { id } = req.query

    await db.connect()

    const entryToDelete  = await Entry.findByIdAndDelete( id )

    if( !entryToDelete ){
        await db.disconnect()
        return res.status(400).json({message: 'No hay entrada con ese id'  + ' ' + id})
    }

 
    try {
        await db.disconnect()
        res.status(200).json({message: 'Entrada eliminada correctamente'})
    } catch (error: any) {
        await db.disconnect()
        res.status(400).json({message: error.errors.status.message})
    }

}