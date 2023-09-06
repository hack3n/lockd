<script lang="ts">
    import type { LockWithOpens } from '$lib/types';

    export let locks: LockWithOpens[];

    const unopenedLocks = locks.filter((lock) => lock.opens.length == 0);
</script>

<article class="mt-4 prose">
    <h2>Unopened Locks</h2>
</article>
<div class="overflow-x-auto">
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Pinning</th>
                <th>Points</th>
            </tr>
        </thead>
        <tbody>
            {#each unopenedLocks as lock}
                <tr>
                    <td>{lock.name}</td>
                    <td>{lock.pinning}</td>
                    <td>{lock.points}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
