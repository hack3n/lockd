<script lang="ts">
    import type { LockWithOpens, Modal } from '$lib/types';

    import UpdateLockModal from './UpdateLockModal.svelte';

    export let locks: LockWithOpens[];

    let modal: Modal;
    let modalLock: LockWithOpens;

    function openModal(lock: LockWithOpens) {
        modalLock = lock;
        modal.showModal();
    }
</script>

<UpdateLockModal bind:modal lock={modalLock} />

<section class="glass-panel rounded-2xl p-5 md:p-6">
    <div class="flex flex-wrap items-baseline justify-between gap-4">
        <div>
            <p class="text-xs uppercase tracking-[0.45em] text-base-content/60">Inventory</p>
            <h2 class="text-2xl font-display text-white">Locks</h2>
        </div>
        <p class="text-xs uppercase tracking-[0.35em] text-base-content/60">
            {locks.length} available
        </p>
    </div>
    <div class="mt-6 overflow-x-auto rounded-2xl border border-white/5">
        <table class="table table-zebra">
            <thead class="text-xs uppercase tracking-[0.3em] text-base-content/50 bg-base-200/60">
                <tr>
                    <th>Ref</th>
                    <th>Name</th>
                    <th>Pinning</th>
                    <th>Opens</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                {#each locks as lock}
                    <tr
                        class="hover cursor-pointer"
                        on:click={() => openModal(lock)}>
                        <th class="font-mono text-xs text-base-content/60">#{lock.ref}</th>
                        <td class="font-semibold">{lock.name}</td>
                        <td class="text-sm text-base-content/70">{lock.pinning}</td>
                        <td>
                            <div class="font-mono text-sm">{lock.opens.length}</div>
                            <div class="text-[0.65rem] uppercase tracking-[0.35em] text-base-content/50">
                                clears
                            </div>
                        </td>
                        <td class="text-right font-semibold">{lock.points}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</section>
