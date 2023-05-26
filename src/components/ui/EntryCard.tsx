import { DragEvent, FC, useContext } from 'react'
import { UIContext } from '@/context/ui'
import { Entry } from '@/interfaces'
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { getFormatDistanceToNow } from '@/utils'

interface Prop {
    entry: Entry
}

export const EntryCard: FC<Prop> = ({ entry }) => {

    const { startDragging, endDragging, endButton } = useContext( UIContext )
    const router = useRouter()

    const onDragStart = ( event: DragEvent<HTMLDivElement> ) => {
        event.dataTransfer.setData( 'text', entry._id )
        startDragging()
    }

    const onDragEnd = () => {
        endDragging()
    }

    const onClick = () => {
        router.push(`/entries/${ entry._id }`)
        endButton()
    }

    return (
        <Card
            onClick={ onClick }
            sx={{ marginBottom: 1 }}
            // Evento de drag
            draggable
            onDragStart={ onDragStart }
            onDragEnd={ onDragEnd }
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{ entry.description }</Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant='body2'>{ `Creada hace ${ getFormatDistanceToNow( entry.createdAt ) }` }</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
