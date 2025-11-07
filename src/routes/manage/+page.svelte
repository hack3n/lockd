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

<section class="glass-panel rounded-2xl p-5 md:p-6 mb-8 space-y-4">
    <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
            <h2 class="text-2xl font-display text-white">Staff controls</h2>
            <p class="text-sm text-base-content/70 max-w-2xl">
                Log opens, add competitors, or register new locks during the event.
            </p>
        </div>
        <div class="flex flex-wrap gap-2 text-sm">
            <button
                class="btn btn-primary"
                on:click={() => {
                    createOpenModal.showModal();
                }}>
                Log open
            </button>
            <button
                class="btn btn-outline btn-accent"
                on:click={() => {
                    createCompetitorModal.showModal();
                }}>
                Add competitor
            </button>
            <button
                class="btn btn-outline btn-secondary"
                on:click={() => {
                    createLockModal.showModal();
                }}>
                Add lock
            </button>
        </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-3">
        <div class="rounded-xl border border-white/5 bg-base-200/40 p-4">
            <p class="text-xs uppercase tracking-[0.2em] text-base-content/50">Competitors</p>
            <p class="mt-1 text-2xl font-display text-white leading-none">{data.competitors.length}</p>
        </div>
        <div class="rounded-xl border border-white/5 bg-base-200/40 p-4">
            <p class="text-xs uppercase tracking-[0.2em] text-base-content/50">Locks</p>
            <p class="mt-1 text-2xl font-display text-white leading-none">{data.locks.length}</p>
        </div>
        <div class="rounded-xl border border-white/5 bg-base-200/40 p-4">
            <p class="text-xs uppercase tracking-[0.2em] text-base-content/50">Opens logged</p>
            <p class="mt-1 text-2xl font-display text-white leading-none">{data.opens.length}</p>
        </div>
    </div>
</section>

<CreateOpenModal
    bind:modal={createOpenModal}
    competitors={data.competitors}
    locks={data.locks} />
<CreateCompetitorModal bind:modal={createCompetitorModal} />
<CreateLockModal bind:modal={createLockModal} />

<section class="space-y-4">
    <CompetitorTable competitors={data.competitors} />
    <LockTable locks={data.locks} />
</section>
