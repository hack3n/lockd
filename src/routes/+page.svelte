<script>
    import LeaderboardTable from '$lib/components/competitor/LeaderboardTable.svelte';
    import UnopenedLocksTable from '$lib/components/lock/UnopenedLocksTable.svelte';
    import { onMount } from 'svelte';

    export let data;

    onMount(() => {
        setInterval(() => {
            location.reload();
        }, 30 * 1000);
    });
</script>

<article class="mt-4 prose">
    <h2>Statistics</h2>
</article>
<div class="stats">
    <div class="stat pl-0">
        <div class="stat-title">Locks Opened</div>
        <div class="stat-value">{data.opens.length}</div>
    </div>
    <div class="stat">
        <div class="stat-title">Competitors</div>
        <div class="stat-value">{data.competitors.length}</div>
    </div>
    <div class="stat">
        <div class="stat-title">Total Points Scored</div>
        <div class="stat-value">
            {data.opens.reduce((accumulator, open) => {
                return accumulator + open.lock.points;
            }, 0)}
        </div>
    </div>
</div>

<div class="grid grid-cols-2 gap-4">
    <div>
        <LeaderboardTable competitors={data.competitors} />
    </div>
    <div>
        <UnopenedLocksTable locks={data.locks} />
    </div>
</div>
