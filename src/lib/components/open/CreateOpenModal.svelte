<script lang="ts">
    import type { Competitor, Lock } from '@prisma/client';

    import TomSelect from 'tom-select';
    import { onMount } from 'svelte';

    export let modal;
    export let competitors: Competitor[];
    export let locks: Lock[];

    onMount(() => {
        const options = {
            sortField: {
                field: 'text',
                direction: 'asc',
            },
        };

        new TomSelect('#competitor-select', options);
        new TomSelect('#lock-select', options);
    });
</script>

<dialog bind:this={modal} class="modal">
    <div class="modal-box space-y-4">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" aria-label="Close">
                &times;
            </button>
        </form>
        <div>
            <p class="text-xs uppercase tracking-[0.4em] text-base-content/60">Log Open</p>
            <h3 class="font-bold text-lg mt-2">Record a successful pick</h3>
            <p class="text-sm text-base-content/70">Choose the competitor and the lock they cleared.</p>
        </div>
        <form method="POST" action="?/createOpen" class="space-y-4">
            <div class="form-control">
                <label class="label">
                    <span class="label-text text-xs uppercase tracking-[0.3em]">Competitor</span>
                </label>
                <select
                    id="competitor-select"
                    class="select select-bordered w-full"
                    name="competitor"
                    required>
                    <option value="">Select competitor</option>
                    {#each competitors as competitor}
                        <option value={competitor.id}>{competitor.username}</option>
                    {/each}
                </select>
            </div>
            <div class="form-control">
                <label class="label">
                    <span class="label-text text-xs uppercase tracking-[0.3em]">Lock</span>
                </label>
                <select
                    id="lock-select"
                    class="select select-bordered w-full"
                    name="lock"
                    required>
                    <option value="">Select lock</option>
                    {#each locks as lock}
                        <option value={lock.id}>{lock.name} ({lock.ref})</option>
                    {/each}
                </select>
            </div>
            <div class="modal-action">
                <button type="submit" class="btn btn-success">Save</button>
            </div>
        </form>
    </div>
</dialog>
