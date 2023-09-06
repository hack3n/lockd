<script>
    export let modal;
    export let lock;
</script>

<dialog bind:this={modal} class="modal">
    <div class="modal-box">
        <h3 class="font-bold text-lg">Update Lock Details</h3>
        <p class="py-4">Update lock name, pinning, and points value.</p>
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <form method="POST" action="?/updateLock">
            <input name="lock" value={lock?.id} hidden />
            <div class="form-control mb-4">
                <input
                    type="text"
                    name="name"
                    value={lock?.name}
                    placeholder="Lock Name"
                    class="input input-bordered w-full max-w-xs"
                />
            </div>
            <div class="form-control my-4">
                <input
                    type="text"
                    name="pinning"
                    value={lock?.pinning}
                    placeholder="Pinning Description"
                    class="input input-bordered w-full max-w-xs"
                />
            </div>
            <div class="form-control my-4">
                <input
                    type="number"
                    name="points"
                    value={lock?.points}
                    placeholder="Points Value"
                    class="input input-bordered w-full max-w-xs"
                />
            </div>
            <div class="modal-action">
                <button type="submit" class="btn btn-success">Save</button>
            </div>
        </form>
        <form method="POST" action="?/deleteLock" class="absolute left-6 bottom-6">
            <input name="lock" value={lock?.id} hidden />
            <button class="btn btn-primary btn-error">Delete</button>
        </form>
    </div>
</dialog>
    