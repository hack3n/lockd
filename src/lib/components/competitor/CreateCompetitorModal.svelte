<script lang="ts">
    import type { Modal } from '$lib/types';

    export let modal: Modal;
</script>

<dialog bind:this={modal} class="modal">
    <div class="modal-box space-y-4">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" aria-label="Close">
                &times;
            </button>
        </form>
        <div>
            <p class="text-xs uppercase tracking-[0.4em] text-base-content/60">Add Competitor</p>
            <h3 class="font-bold text-lg mt-2">Register a new picker</h3>
            <p class="text-sm text-base-content/70">This name will appear on the public leaderboard.</p>
        </div>
        <form method="POST" action="?/createCompetitor" class="space-y-4">
            <div class="form-control">
                <label class="label">
                    <span class="label-text text-xs uppercase tracking-[0.3em]">Display name</span>
                </label>
                <input
                    type="text"
                    name="username"
                    placeholder="e.g. Keymaster"
                    class="input input-bordered w-full"
                    required />
            </div>
            <div class="modal-action">
                <button type="submit" class="btn btn-success">Save</button>
            </div>
        </form>
    </div>
</dialog>
