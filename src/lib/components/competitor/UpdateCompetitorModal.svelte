<script lang="ts">
    import type { CompetitorWithOpens, Modal } from '$lib/types';

    import OpenTable from '../open/OpenTable.svelte';

    export let modal: Modal;
    export let competitor: CompetitorWithOpens;
</script>

<dialog bind:this={modal} class="modal">
    <div class="modal-box">
        <h3 class="font-bold text-lg">Edit Competitor</h3>
        <p class="py-4">Edit competitor name and opens.</p>
        <form method="dialog">
            <button
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >✕</button>
        </form>
        <form method="POST" action="?/updateCompetitor">
            <input name="competitor" value={competitor?.id} hidden />
            <div class="form-control mb-4">
                <input
                    type="text"
                    name="username"
                    value={competitor?.username}
                    placeholder="Competitor Name"
                    class="input input-bordered w-full max-w-xs" />
            </div>
            <div class="form-control mb-4">
                <OpenTable opens={competitor?.opens} />
            </div>
            <div class="modal-action">
                <button type="submit" class="btn btn-success">Save</button>
            </div>
        </form>
        <form
            method="POST"
            action="?/deleteCompetitor"
            class="absolute left-6 bottom-6">
            <input name="competitor" value={competitor?.id} hidden />
            <button class="btn btn-primary btn-error">Delete</button>
        </form>
    </div>
</dialog>
