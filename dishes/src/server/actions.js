import HttpError from '@wasp/core/HttpError.js'

export const createTask = async (args, context) => {
    if (!context.user) {
        throw new HttpError(401)
    }
    return context.entities.Task.create({
        data: {
            description: args.description,
            explanation: args.explanation,
            user: { connect: { id: context.user.id } },
        },
    })
}

export const updateTask = async (args, context) => {
    if (!context.user) {
        throw new HttpError(401)
    }
    return context.entities.Task.updateMany({
        where: { id: args.id, user: { id: context.user.id } },
        data: { isDone: args.isDone },
    })
}

export const deleteTask = async (args, context) => {
    if (!context.user) {
        throw new HttpError(401)
    }
    return context.entities.Task.delete({ where: { id: args.id } })
}
