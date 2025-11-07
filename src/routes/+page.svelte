<script lang="ts">
    import { invalidateAll } from '$app/navigation';
    import LeaderboardTable from '$lib/components/competitor/LeaderboardTable.svelte';
    import { onDestroy, onMount, tick } from 'svelte';
    import humanizeDuration from 'humanize-duration';
    import type { PageData } from './$types';
    import type { CompetitorWithOpens } from '$lib/types';

    type RankedCompetitor = CompetitorWithOpens & {
        points: number;
        rank: number;
    };

    type HeroStat = {
        label: string;
        value: string;
        helper: string;
    };

    export let data: PageData;

    let timeRemaining = '';
    let endDate = new Date(import.meta.env.VITE_END_DATE);
    const numberFormatter = new Intl.NumberFormat('en-US');
    let heroStats: HeroStat[] = [];
    let chaseListEl: HTMLUListElement | null = null;
    let chaseObserver: ResizeObserver | null = null;
    let chaseMeasureScheduled = false;
    let lastObservedChaseList: Element | null = null;
    const CHASE_SCROLL_SPEED_PX_PER_SEC = 200;

    let setTimeRemaining = () => {
        let unixTimeRemaining = new Date().getTime() - endDate.getTime();

        timeRemaining =
            unixTimeRemaining < 0
                ? humanizeDuration(unixTimeRemaining, { largest: 2 })
                : 'Competition over';
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

    type OpenWithLock = CompetitorWithOpens['opens'][number];
    type OpenFromData = PageData['opens'][number];

    let chaseScrollDurationSeconds = 20;

    const calculatePoints = (competitor: CompetitorWithOpens) => {
        return competitor.opens.reduce((accumulator: number, open: OpenWithLock) => {
            return accumulator + open.lock.points;
        }, 0);
    };

    $: rankedCompetitors = data.competitors
        .map((competitor: CompetitorWithOpens): RankedCompetitor => {
            const points = calculatePoints(competitor);

            return {
                ...competitor,
                points,
                rank: 0,
            };
        })
        .sort((a: RankedCompetitor, b: RankedCompetitor) => (a.points < b.points ? 1 : -1))
        .map((competitor: RankedCompetitor, index: number) => ({
            ...competitor,
            rank: index + 1,
        }));

    $: totalPoints = data.opens.reduce((accumulator: number, open: OpenFromData) => {
        return accumulator + open.lock.points;
    }, 0);
    $: averagePointsPerOpen = data.opens.length ? totalPoints / data.opens.length : 0;
    $: heroStats = [
        {
            label: 'Locks opened',
            value: numberFormatter.format(data.opens.length),
            helper: '',
        },
        {
            label: 'Competitors checked in',
            value: numberFormatter.format(data.competitors.length),
            helper: '',
        },
        {
            label: 'Points awarded',
            value: numberFormatter.format(totalPoints),
            helper: `${averagePointsPerOpen.toFixed(1)} pts / open`,
        },
    ];

    $: chasingCompetitors = rankedCompetitors.slice(10);
    $: duplicatedChasingCompetitors =
        chasingCompetitors.length > 0 ? [...chasingCompetitors, ...chasingCompetitors] : [];

    const updateChaseScrollDuration = () => {
        if (!chaseListEl) {
            chaseScrollDurationSeconds = 12;
            return;
        }

        const totalHeight = chaseListEl.scrollHeight;
        if (!totalHeight) {
            chaseScrollDurationSeconds = 12;
            return;
        }

        const cycleDistance = totalHeight / 2;
        chaseScrollDurationSeconds = Math.max(cycleDistance / CHASE_SCROLL_SPEED_PX_PER_SEC, 6);
    };

    const scheduleChaseMeasurement = () => {
        if (chaseMeasureScheduled) return;
        chaseMeasureScheduled = true;
        tick().then(() => {
            chaseMeasureScheduled = false;
            updateChaseScrollDuration();
        });
    };

    onMount(() => {
        scheduleChaseMeasurement();
        chaseObserver = new ResizeObserver(() => scheduleChaseMeasurement());
        if (chaseListEl) {
            chaseObserver.observe(chaseListEl);
        }

        return () => {
            chaseObserver?.disconnect();
            lastObservedChaseList = null;
        };
    });

    $: duplicatedChasingCompetitors, scheduleChaseMeasurement();
    $: if (chaseObserver && chaseListEl && chaseListEl !== lastObservedChaseList) {
        if (lastObservedChaseList) {
            chaseObserver.unobserve(lastObservedChaseList);
        }
        chaseObserver.observe(chaseListEl);
        lastObservedChaseList = chaseListEl;
        scheduleChaseMeasurement();
    }
</script>

<section class="flex-1 min-h-0 flex flex-col gap-6">
    <div class="flex-1 min-h-0 grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)] items-stretch">
        <div class="h-full min-h-0">
            <LeaderboardTable competitors={data.competitors} title="Leaderboard" />
        </div>
        <div class="glass-panel rounded-2xl p-3 md:p-4 flex flex-col h-full min-h-0">
            <div class="flex items-center justify-between gap-3 flex-wrap">
                <h2 class="text-base font-display text-white tracking-[0.2em] uppercase">Chasing pack</h2>
                <span class="text-[0.6rem] uppercase tracking-[0.35em] text-base-content/60">
                    {#if chasingCompetitors.length}
                        {chasingCompetitors.length} competitors
                    {:else}
                        All top 10
                    {/if}
                </span>
            </div>

            {#if !chasingCompetitors.length}
                <p class="text-sm text-base-content/70 mt-6">
                    Not enough competitors yet...
                </p>
            {:else}
                <div class="chasing-scroll-mask mt-3 flex-1 min-h-[12rem]">
                    <ul
                        bind:this={chaseListEl}
                        class="vertical-marquee divide-y divide-white/5 text-xs md:text-sm text-base-content/80 h-full"
                        style={`animation-duration: ${chaseScrollDurationSeconds}s;`}
                    >
                        {#each duplicatedChasingCompetitors as competitor, index (index)}
                            <li class="flex items-center gap-3 py-2">
                                <span class="font-mono text-xs md:text-sm text-base-content/60 w-9 text-right">
                                    #{competitor.rank}
                                </span>
                                <span class="flex-1 truncate text-white">{competitor.username}</span>
                                <span class="font-semibold tabular-nums text-xs md:text-sm text-base-content/70">
                                    {competitor.points} pts
                                </span>
                            </li>
                        {/each}
                    </ul>
                </div>
            {/if}
        </div>
    </div>

    <div class="glass-panel rounded-2xl p-4 md:p-5">
        <div class="flex flex-wrap items-center justify-between gap-6">
            <div class="flex flex-wrap gap-6">
                {#each heroStats as stat}
                    <div>
                        <p class="text-xs uppercase tracking-[0.2em] text-base-content/50">{stat.label}</p>
                        <p class="mt-1 text-xl font-display text-white leading-none">{stat.value}</p>
                        {#if stat.helper}
                            <p class="text-xs text-base-content/60 mt-1">{stat.helper}</p>
                        {/if}
                    </div>
                {/each}
            </div>
            <div class="text-right">
                <p class="text-xs uppercase tracking-[0.2em] text-base-content/50">Time remaining</p>
                <p class="text-xl font-display text-white mt-1">{timeRemaining}</p>
                <p class="text-xs text-base-content/60">Auto refresh every 30 seconds</p>
            </div>
        </div>
    </div>
</section>
