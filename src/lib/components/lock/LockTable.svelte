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

<article class="mt-4 prose">
    <h2>Locks</h2>
</article>
<div class="overflow-x-auto">
    <table class="table">
        <thead>
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
                <tr class="hover" on:click={() => openModal(lock)}>
                    <th>{lock.ref}</th>
                    <td>{lock.name}</td>
                    <td>{lock.pinning}</td>
                    <td>{lock.opens.length}</td>
                    <td>{lock.points}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
