import type { PageServerLoad } from './manage/$types';
import { db } from '$lib/server/database';
import type { Action } from '@sveltejs/kit';

export const load: Action = (async () => {
    return {
        competitors: await db.competitor.findMany({
            include: {
                opens: {
                    include: {
                        lock: true,
                    },
                },
            },
        }),
        locks: await db.lock.findMany({
            include: {
                opens: true,
            },
        }),
        opens: await db.open.findMany({
            include: {
                lock: true,
            },
        }),
    };
}) satisfies PageServerLoad;
