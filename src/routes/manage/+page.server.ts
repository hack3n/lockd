import type { Actions } from './$types';
import { db } from '$lib/server/database';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
    createOpen: async (event) => {
        const data = await event.request.formData();
        
        const lockFormValue = data.get("lock") ?? "";
        const lockId = parseInt(lockFormValue.toString());

        if(Number.isNaN(lockId) || !lockId){
            return fail(400, { 
                error: "Lock ID must be a valid integer."
            });
        }

        const competitorFormValue = data.get("competitor") ?? "";
        const competitorId = parseInt(competitorFormValue.toString());

        if(Number.isNaN(competitorId) || !competitorId){
            return fail(400, { 
                error: "Competitor ID must be a valid integer."
            });
        }
        
        const previousOpens = await db.open.findFirst({
            where: {
                lockId: lockId,
                competitorId: competitorId
            }
        });

        if(previousOpens){
            return fail(400, { 
                error: "Competitor has already opened this lock."
            });
        }

        try {
            await db.open.create({
                data: {
                    lock: { connect: { id: lockId }},
                    competitor: { connect: { id: competitorId }}
                }
            })
        } catch {
            return fail(400, {
                error: "Competitor or lock does not exist."
            });
        }

        return {
            message: "New open added."
        }
    },
    createCompetitor: async (event) => {
        const data = await event.request.formData();
        
        const usernameFormValue = data.get("username") ?? "";
        const username = usernameFormValue.toString();

        await db.competitor.create({
            data: {
                username: username
            }
        })

        return {
            message: "New competitor added."
        }
    },
    createLock: async (event) => {
        const data = await event.request.formData();
        
        const nameFormValue = data.get("name") ?? "";
        const pinningFormValue = data.get("pinning") ?? "";
        const pointsFormValue = data.get("points") ?? "";

        const points = parseInt(pointsFormValue.toString());

        if(Number.isNaN(points) || !points){
            return fail(400, { 
                error: "Points must be a valid integer."
            });
        }

        try {
            await db.lock.create({
                data: {
                    name: nameFormValue.toString(),
                    pinning: pinningFormValue.toString(),
                    points: points
                }
            })
        } catch {
            return fail(400, {
                error: "Lock name must be unique."
            });
        }

        return {
            message: "New open added."
        }
    },
    deleteOpen: async (event) => {
        const data = await event.request.formData();
        
        const openFormValue = data.get("open") ?? "";
        const openId = parseInt(openFormValue.toString());

        try {
            await db.open.delete({
                where: {
                    id: openId
                }
            })
        } catch {
            return fail(400, {
                error: "Couldn't delete this open."
            });
        }

        return {
            message: "Open deleted."
        }
    },
    deleteCompetitor: async (event) => {
        const data = await event.request.formData();
        
        const competitorFormValue = data.get("competitor") ?? "";
        const competitorId = parseInt(competitorFormValue.toString());

        try {
            await db.open.deleteMany({
                where: {
                    competitorId: competitorId
                }
            })
        } catch {
            return fail(400, {
                error: "Cannot delete opens associated with competitor."
            })
        }

        try {
            await db.competitor.delete({
                where: {
                    id: competitorId
                }
            })
        } catch {
            return fail(400, {
                error: "Competitor does not exist."
            })
        }

        return {
            message: "Competitor deleted."
        }
    },
    deleteLock: async (event) => {
        const data = await event.request.formData();
        
        const lockFormValue = data.get("lock") ?? "";
        const lockId = parseInt(lockFormValue.toString());

        try {
            await db.open.deleteMany({
                where: {
                    lockId: lockId
                }
            })
        } catch {
            return fail(400, {
                error: "Cannot delete opens associated with lock."
            })
        }

        try {
            await db.lock.delete({
                where: {
                    id: lockId
                }
            })
        } catch {
            return fail(400, {
                error: "Lock does not exist."
            })
        }

        return {
            message: "Lock deleted."
        }
    },
    updateCompetitor: async (event) => {
        const data = await event.request.formData();
        
        const usernameFormValue = data.get("username") ?? "";
        const username = usernameFormValue.toString();

        const competitorIdFormValue = data.get("competitor") ?? "";
        const competitorId = parseInt(competitorIdFormValue.toString());

        if(Number.isNaN(competitorId) || !competitorId){
            return fail(400, { 
                error: "Competitor ID must be a valid integer."
            });
        }

        await db.competitor.update({
            where: {
                id: competitorId
            },
            data: {
                username: username
            }
        })

        return {
            message: "Competitor details updated."
        }
    },
    updateLock: async (event) => {
        const data = await event.request.formData();
        
        const lockIdFormValue = data.get("lock") ?? "";
        const nameFormValue = data.get("name") ?? "";
        const pinningFormValue = data.get("pinning") ?? "";
        const pointsFormValue = data.get("points") ?? "";

        const lockId = parseInt(lockIdFormValue.toString());
        if(Number.isNaN(lockId) || !lockId){
            return fail(400, { 
                error: "ID must be a valid integer."
            });
        }

        const points = parseInt(pointsFormValue.toString());
        if(Number.isNaN(points) || !points){
            return fail(400, { 
                error: "Points must be a valid integer."
            });
        }

        try {
            await db.lock.update({
                where: {
                    id: lockId
                },
                data: {
                    name: nameFormValue.toString(),
                    pinning: pinningFormValue.toString(),
                    points: points
                }
            })
        } catch {
            return fail(400, {
                error: "Lock name must be unique."
            });
        }

        return {
            message: "Lock details updated."
        }
    },
};
