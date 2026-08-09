import { getUserId } from "@monorepo-template/core/context";
import { handler } from "@monorepo-template/core/handler";
import {
    createSession,
    deleteSession,
    getSession,
    listSessions,
    updateSession
} from "@monorepo-template/core/queries/session";

export const list = handler(async (event) => {
    const userId = getUserId(event);
    return listSessions(userId)
})

export const get = handler(async (event) => {
    const userId = getUserId(event);
    const id = event.pathParameters?.id
    if (!id) throw new Error('missing session id');

    const session = await getSession(id, userId);
    if (!session) throw new Error('not found')

    return session
})

export const create = handler(async (event) => {
    const userId = getUserId(event);
    const body = JSON.parse(event.body ?? "{}")
    return createSession({ ...body, user_id: userId })
})

export const update = handler(async (event) => {
    const userId = getUserId(event);
    const id = event.pathParameters?.id;
    if (!id) throw new Error('Missing session id')

    const body = JSON.parse(event.body ?? "{}")
    const session = await updateSession(id, userId, body)
    if (!session) throw new Error('not found')

    return session
})

export const remove = handler(async (event) => {
    const userId = getUserId(event);
    const id = event.pathParameters?.id
    if (!id) throw new Error('missing session id')

    await deleteSession(id, userId)
    return { success: true }
})
