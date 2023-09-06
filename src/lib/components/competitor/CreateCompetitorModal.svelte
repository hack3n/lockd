<script lang="ts">
    import type { Modal } from '$lib/types';

    export let modal: Modal;
</script>

<dialog bind:this={modal} class="modal">
    <div class="modal-box">
        <h3 class="font-bold text-lg">Add Competitor</h3>
        <p class="py-4">Enter competitor name.</p>
        <form method="dialog">
            <button
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >✕</button>
        </form>
        <form method="POST" action="?/createCompetitor">
            <div class="form-control mb-4">
                <input
                    type="text"
                    name="username"
                    placeholder="Competitor Name"
                    class="input input-bordered w-full max-w-xs" />
            </div>
            <div class="modal-action">
                <button type="submit" class="btn btn-success">Save</button>
            </div>
        </form>
    </div>
</dialog>
