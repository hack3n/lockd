<script>
    export let opens = [];
</script>

<div class="overflow-x-auto">
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Points</th>
            </tr>
        </thead>
        <tbody>
            {#if opens.length == 0}
                <tr>
                    <td>No locks opened.</td>
                </tr>
            {:else}
                {#each opens as open}
                    <tr class="hover">
                        <td>{open.lock.name}</td>
                        <td>{open.lock.points}</td>
                        <td>
                            <form method="POST" action="?/deleteOpen">
                                <input name="open" value={open?.id} hidden />
                                <button class="btn btn-sm btn-circle btn-ghost">✕</button>
                            </form>
                        </td>
                    </tr>
                {/each}
            {/if}
        </tbody>
    </table>
</div>
