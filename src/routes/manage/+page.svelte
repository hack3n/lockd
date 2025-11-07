<script lang="ts">
    import type { Modal } from '$lib/types';

    import CompetitorTable from '$lib/components/competitor/CompetitorTable.svelte';
    import CreateCompetitorModal from '$lib/components/competitor/CreateCompetitorModal.svelte';
    import CreateLockModal from '$lib/components/lock/CreateLockModal.svelte';
    import LockTable from '$lib/components/lock/LockTable.svelte';
    import CreateOpenModal from '$lib/components/open/CreateOpenModal.svelte';

    export let data;
    export let form;

    let createOpenModal: Modal;
    let createCompetitorModal: Modal;
    let createLockModal: Modal;

    let toastOpen = true;

    setTimeout(() => {
        toastOpen = false;
    }, 3 * 1000);
</script>

{#if form?.message && toastOpen}
    <div class="toast toast-top toast-end">
        <div class="alert alert-success">
            <span>{form.message}</span>
        </div>
    </div>
{/if}

{#if form?.error && toastOpen}
    <div class="toast toast-top toast-end">
        <div class="alert alert-warning">
            <span>{form.error}</span>
        </div>
    </div>
{/if}

<section class="glass-panel rounded-3xl p-6 md:p-8 shadow-glow mb-10 space-y-6">
    <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
            <p class="text-xs uppercase tracking-[0.45em] text-base-content/60">Control Room</p>
            <h2 class="text-3xl font-display text-white">Manage the floor</h2>
            <p class="text-sm text-base-content/70 max-w-2xl">
                Log opens, add newcomers, and keep the locks flowing for staff and volunteers.
            </p>
        </div>
        <div class="flex flex-wrap gap-3">
            <button
                class="btn btn-primary gap-2"
                on:click={() => {
                    createOpenModal.showModal();
                }}>
                <i class="bi bi-lightning-charge"></i>
                Log new open
            </button>
            <button
                class="btn btn-outline btn-accent gap-2"
                on:click={() => {
                    createCompetitorModal.showModal();
                }}>
                <i class="bi bi-person-plus"></i>
                Add competitor
            </button>
            <button
                class="btn btn-outline btn-secondary gap-2"
                on:click={() => {
                    createLockModal.showModal();
                }}>
                <i class="bi bi-lock"></i>
                Add lock
            </button>
        </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-3">
        <div class="rounded-2xl border border-white/5 bg-base-200/60 p-5">
            <p class="text-xs uppercase tracking-[0.35em] text-base-content/50">Competitors</p>
            <p class="mt-2 text-3xl font-display text-white leading-none">{data.competitors.length}</p>
            <p class="text-xs text-base-content/60 mt-1">Checked in</p>
        </div>
        <div class="rounded-2xl border border-white/5 bg-base-200/60 p-5">
            <p class="text-xs uppercase tracking-[0.35em] text-base-content/50">Locks</p>
            <p class="mt-2 text-3xl font-display text-white leading-none">{data.locks.length}</p>
            <p class="text-xs text-base-content/60 mt-1">Available challenges</p>
        </div>
        <div class="rounded-2xl border border-white/5 bg-base-200/60 p-5">
            <p class="text-xs uppercase tracking-[0.35em] text-base-content/50">Opens logged</p>
            <p class="mt-2 text-3xl font-display text-white leading-none">{data.opens.length}</p>
            <p class="text-xs text-base-content/60 mt-1">Total submissions</p>
        </div>
    </div>
</section>

<CreateOpenModal
    bind:modal={createOpenModal}
    competitors={data.competitors}
    locks={data.locks} />
<CreateCompetitorModal bind:modal={createCompetitorModal} />
<CreateLockModal bind:modal={createLockModal} />

<section class="space-y-8">
    <CompetitorTable competitors={data.competitors} />
    <LockTable locks={data.locks} />
</section>
