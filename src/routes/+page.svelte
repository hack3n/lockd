<script>
    import { invalidateAll } from '$app/navigation';
    import LeaderboardTable from '$lib/components/competitor/LeaderboardTable.svelte';
    import UnopenedLocksTable from '$lib/components/lock/UnopenedLocksTable.svelte';
    import { onDestroy } from 'svelte';
    import timeUntil from 'time-until';

    export let data;

    let timeRemaining = '';
    let endDate = new Date('2023-09-10T15:00:00.000');

    let setTimeRemaining = () => {
        timeRemaining = timeUntil(endDate).string;
    };
    setTimeRemaining();

    const timerInterval = setInterval(() => {
        setTimeRemaining();
    }, 1000);

    const refreshInternal = setInterval(async () => {
        await invalidateAll();
    }, 30 * 1000);

    onDestroy(() => {
        clearInterval(timerInterval);
        clearInterval(refreshInternal);
    });
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <div>
        <article class="mt-4 prose">
            <h2>Statistics</h2>
        </article>
        <div class="stats stats-vertical lg:stats-horizontal">
            <div class="stat pl-0">
                <div class="stat-title">Locks Opened</div>
                <div class="stat-value">{data.opens.length}</div>
            </div>
            <div class="stat pl-0 lg:pl-6">
                <div class="stat-title">Competitors</div>
                <div class="stat-value">{data.competitors.length}</div>
            </div>
            <div class="stat pl-0 lg:pl-6">
                <div class="stat-title">Total Points</div>
                <div class="stat-value">
                    {data.opens.reduce((accumulator, open) => {
                        return accumulator + open.lock.points;
                    }, 0)}
                </div>
            </div>
        </div>
    </div>
    <div>
        <article class="mt-4 prose">
            <h2>Countdown</h2>
        </article>
        <div class="stats">
            <div class="stat pl-0">
                <div class="stat-title">Time Remaining</div>
                <div class="stat-value">
                    {timeRemaining}
                </div>
            </div>
        </div>
    </div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <div>
        <LeaderboardTable competitors={data.competitors} />
    </div>
    <div>
        <UnopenedLocksTable locks={data.locks} />
    </div>
</div>
