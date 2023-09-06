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
    <div class="modal-box">
        <h3 class="font-bold text-lg">Add Lock Open</h3>
        <p class="py-4">Enter competitor and lock</p>
        <form method="dialog">
            <button
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >✕</button>
        </form>
        <form method="POST" action="?/createOpen">
            <div class="form-control mb-4">
                <select
                    id="competitor-select"
                    class="w-full max-w-xs"
                    name="competitor"
                    placeholder="Competitor"
                    autocomplete="off">
                    <option value="">Competitor</option>
                    {#each competitors as competitor}
                        <option value={competitor.id}
                            >{competitor.username}</option>
                    {/each}
                </select>
            </div>
            <div class="form-control my-4">
                <select
                    id="lock-select"
                    class="w-full max-w-xs"
                    name="lock"
                    placeholder="Lock"
                    autocomplete="off">
                    <option value="">Lock</option>
                    {#each locks as lock}
                        <option value={lock.id}>{lock.name}</option>
                    {/each}
                </select>
            </div>
            <div class="modal-action">
                <button type="submit" class="btn btn-success">Save</button>
            </div>
        </form>
    </div>
</dialog>
