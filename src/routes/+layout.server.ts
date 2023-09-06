import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load = (async () => {
    return {  
        competitors: await db.competitor.findMany({
            include: {
                opens: { 
                    include: {
                        lock: true
                    }
                }
            }
        }),
        locks: await db.lock.findMany({
            include: {
                opens: true
            }
        }),
        opens: await db.open.findMany({
            include: {
                lock: true
            }
        })
    };
}) satisfies PageServerLoad;