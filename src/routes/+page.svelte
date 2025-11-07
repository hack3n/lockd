<script lang="ts">
    import { invalidateAll } from '$app/navigation';
    import LeaderboardTable from '$lib/components/competitor/LeaderboardTable.svelte';
    import { onDestroy } from 'svelte';
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
            helper: 'Recorded attempts',
        },
        {
            label: 'Competitors checked in',
            value: numberFormatter.format(data.competitors.length),
            helper: 'Active pickers on-site',
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
    $: chaseScrollDurationSeconds = Math.max(chasingCompetitors.length * 3, 30);
</script>

<section class="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-stretch">
    <div class="glass-panel rounded-3xl p-6 md:p-8 grid-overlay shadow-glow">
        <div class="flex flex-col gap-6">
            <div class="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p class="text-xs uppercase tracking-[0.6em] text-base-content/60">Realtime status</p>
                    <h2 class="text-3xl font-display text-white">Locks are falling fast</h2>
                </div>
                <span
                    class="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-base-content/60">
                    <span class="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                    Auto refresh · 30s
                </span>
            </div>
            <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {#each heroStats as stat}
                    <div class="rounded-2xl border border-white/5 bg-base-200/60 p-5">
                        <p class="text-xs uppercase tracking-[0.4em] text-base-content/50">{stat.label}</p>
                        <p class="mt-3 text-4xl font-display text-white leading-none">{stat.value}</p>
                        <p class="text-xs text-base-content/60 mt-2">{stat.helper}</p>
                    </div>
                {/each}
            </div>
        </div>
    </div>
    <div class="glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-glow">
        <div class="absolute inset-0 bg-lockd-grid opacity-30"></div>
        <div class="absolute inset-0 bg-gradient-to-br from-primary/40 via-transparent to-secondary/40 blur-3xl"></div>
        <div class="relative space-y-4">
            <p class="text-xs uppercase tracking-[0.65em] text-base-content/60">Countdown</p>
            <h2 class="text-4xl md:text-5xl font-display text-white tracking-tight">{timeRemaining}</h2>
            <p class="text-sm text-base-content/60">Time until the closing bell.</p>
            <div class="flex items-center gap-2 text-xs text-base-content/50">
                <span class="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                Live sync enabled
            </div>
        </div>
    </div>
</section>

<section class="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] items-stretch">
    <div class="h-full">
        <LeaderboardTable competitors={data.competitors} title="Top 10 Leaderboard" limit={10} />
    </div>
    <div class="glass-panel rounded-3xl p-6 md:p-8 flex flex-col shadow-glow">
        <div class="flex items-baseline justify-between gap-3 flex-wrap">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.45em] text-base-content/60">Chasing Pack</p>
                <p class="text-2xl font-display text-white">Everyone else</p>
            </div>
            <span class="text-xs uppercase tracking-[0.35em] text-base-content/50">
                {#if chasingCompetitors.length}
                    {chasingCompetitors.length} competitors
                {:else}
                    All top 10
                {/if}
            </span>
        </div>

        {#if !chasingCompetitors.length}
            <p class="text-sm text-base-content/70 mt-6">
                Every competitor currently fits inside the top 10 leaderboard.
            </p>
        {:else}
            <div class="chasing-scroll-mask mt-6 h-[26rem]">
                <ul
                    class="vertical-marquee divide-y divide-white/5 text-base text-base-content/80"
                    style={`animation-duration: ${chaseScrollDurationSeconds}s;`}
                >
                    {#each duplicatedChasingCompetitors as competitor, index (index)}
                        <li class="flex items-center gap-4 py-4">
                            <span class="font-mono text-xs uppercase tracking-[0.3em] text-base-content/60 w-14">
                                #{competitor.rank}
                            </span>
                            <span class="flex-1 truncate text-white">{competitor.username}</span>
                            <span class="font-semibold tabular-nums text-base text-base-content/70">
                                {competitor.points} pts
                            </span>
                        </li>
                    {/each}
                </ul>
            </div>
            <p class="text-xs text-base-content/60 mt-4">
                Slow auto-scroll loops so everyone can find their score.
            </p>
        {/if}
    </div>
</section>

<style>
    .chasing-scroll-mask {
        overflow: hidden;
        position: relative;
    }

    .chasing-scroll-mask::before,
    .chasing-scroll-mask::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        height: 3rem;
        pointer-events: none;
        z-index: 1;
    }

    .chasing-scroll-mask::before {
        top: 0;
        background: linear-gradient(180deg, rgba(5, 7, 15, 0.95) 0%, transparent 100%);
    }

    .chasing-scroll-mask::after {
        bottom: 0;
        background: linear-gradient(0deg, rgba(5, 7, 15, 0.95) 0%, transparent 100%);
    }

    .vertical-marquee {
        animation-name: vertical-marquee-keyframes;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        will-change: transform;
    }

    @keyframes vertical-marquee-keyframes {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-50%);
        }
    }
</style>
