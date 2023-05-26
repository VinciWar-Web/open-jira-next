
interface SeedData {
    entries: SeedEntry[]
}

interface SeedEntry {
    description: string,
    status: string,
    createdAt: number,
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Esta es una tarea PENDIENTE de prueba',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'Esta es una tarea EN PROCESO de prueba',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            description: 'Esta es una tarea TERMINADA de prueba',
            status: 'finished',
            createdAt: Date.now() - 100000,
        }
    ]
}