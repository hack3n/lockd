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
            <p class="text-xs uppercase tracking-[0.4em] text-base-content/60">Add Lock</p>
            <h3 class="font-bold text-lg mt-2">Create a new challenge lock</h3>
            <p class="text-sm text-base-content/70">Provide the reference number, title, pinning, and points.</p>
        </div>
        <form method="POST" action="?/createLock" class="space-y-4">
            <div class="form-control">
                <label class="label">
                    <span class="label-text text-xs uppercase tracking-[0.3em]">Reference ID</span>
                </label>
                <input
                    type="number"
                    name="ref"
                    placeholder="e.g. 42"
                    class="input input-bordered w-full"
                    required />
            </div>
            <div class="form-control">
                <label class="label">
                    <span class="label-text text-xs uppercase tracking-[0.3em]">Lock name</span>
                </label>
                <input
                    type="text"
                    name="name"
                    placeholder="Lock Name"
                    class="input input-bordered w-full"
                    required />
            </div>
            <div class="form-control">
                <label class="label">
                    <span class="label-text text-xs uppercase tracking-[0.3em]">Pinning</span>
                </label>
                <input
                    type="text"
                    name="pinning"
                    placeholder="Short pinning description"
                    class="input input-bordered w-full" />
            </div>
            <div class="form-control">
                <label class="label">
                    <span class="label-text text-xs uppercase tracking-[0.3em]">Points</span>
                </label>
                <input
                    type="number"
                    name="points"
                    placeholder="Points value"
                    class="input input-bordered w-full"
                    min="0"
                    step="1"
                    required />
            </div>
            <div class="modal-action">
                <button type="submit" class="btn btn-success">Save</button>
            </div>
        </form>
    </div>
</dialog>
