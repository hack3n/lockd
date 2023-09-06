import type { Competitor, Open, Lock } from '@prisma/client';

export interface LockWithOpens extends Lock {
    opens: Open[];
}

export interface OpenWithLock extends Open {
    lock: Lock;
}

export interface CompetitorWithOpens extends Competitor {
    opens: OpenWithLock[];
}

export interface Modal extends Element {
    showModal: Function;
}
