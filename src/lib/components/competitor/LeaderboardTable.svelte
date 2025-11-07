<script lang="ts">
    import { onMount, tick } from 'svelte';
    import type { CompetitorWithOpens } from '$lib/types';

    type LeaderboardCompetitor = CompetitorWithOpens & { points: number };

    export let competitors: CompetitorWithOpens[];
    export let title: string = 'Leaderboard';
    export let limit: number | null = null;

    const numberFormatter = new Intl.NumberFormat('en-US');

    $: sortedCompetitors = competitors
        .map(
            (competitor): LeaderboardCompetitor => ({
                ...competitor,
                points: competitor.opens.reduce((accumulator, open) => {
                    return accumulator + open.lock.points;
                }, 0),
            })
        )
        .sort((a, b) => (a.points < b.points ? 1 : -1));

    $: userLimit =
        typeof limit === 'number' && limit > 0 ? Math.min(limit, sortedCompetitors.length) : sortedCompetitors.length;

    let computedLimit: number | null = null;
    let wrapperEl: HTMLElement | null = null;
    let headerEl: HTMLElement | null = null;
    let listEl: HTMLOListElement | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let measureScheduled = false;

    const padRank = (place: number) => place.toString().padStart(2, '0');

    const podiumRowClass = (place: number) => {
        switch (place) {
            case 1:
                return 'bg-white/10';
            case 2:
                return 'bg-white/5';
            case 3:
                return 'bg-white/5';
            default:
                return '';
        }
    };

    const podiumRankClass = (place: number) => {
        switch (place) {
            case 1:
                return 'text-amber-300';
            case 2:
                return 'text-slate-200';
            case 3:
                return 'text-orange-200';
            default:
                return 'text-base-content/60';
        }
    };

    const scheduleMeasure = () => {
        if (measureScheduled) return;
        measureScheduled = true;
        tick().then(() => {
            measureScheduled = false;
            measureLimit();
        });
    };

    const measureLimit = () => {
        if (!wrapperEl || !headerEl || !listEl) {
            computedLimit = userLimit;
            return;
        }

        const wrapperHeight = wrapperEl.clientHeight;
        const headerHeight = headerEl.clientHeight;
        const available = Math.max(0, wrapperHeight - headerHeight - 12);
        const firstRow = listEl.querySelector('li');
        const rowHeight = firstRow?.clientHeight ?? 0;

        if (!rowHeight || !available) {
            computedLimit = userLimit;
            return;
        }

        const rowsThatFit = Math.max(1, Math.floor(available / rowHeight));
        computedLimit = Math.min(userLimit, rowsThatFit, sortedCompetitors.length);
    };

    onMount(() => {
        scheduleMeasure();
        resizeObserver = new ResizeObserver(() => scheduleMeasure());
        if (wrapperEl) {
            resizeObserver.observe(wrapperEl);
        }

        return () => {
            resizeObserver?.disconnect();
        };
    });

    $: {
        // re-measure whenever data or userLimit changes
        sortedCompetitors;
        userLimit;
        scheduleMeasure();
    }

    $: visibleCompetitors = sortedCompetitors.slice(0, computedLimit ?? userLimit);
</script>

<section class="glass-panel rounded-2xl p-3 md:p-4 h-full flex flex-col min-h-0" bind:this={wrapperEl}>
    <div class="flex items-center justify-between gap-3" bind:this={headerEl}>
        <h2 class="text-base md:text-md font-display text-white tracking-[0.2em] uppercase">{title}</h2>
        <span class="text-[0.6rem] uppercase tracking-[0.35em] text-base-content/60">
            {visibleCompetitors.length}/{sortedCompetitors.length}
        </span>
    </div>
    <div class="mt-3 flex-1 min-h-0">
        <ol class="divide-y divide-white/10 text-xs md:text-sm text-base-content/80" bind:this={listEl}>
            {#each visibleCompetitors as competitor, index}
                <li class={`flex items-center gap-3 py-2 ${podiumRowClass(index + 1)}`}>
                    <span
                        class={`font-mono text-xs md:text-sm font-semibold ${podiumRankClass(index + 1)} w-10 text-right`}>
                        #{padRank(index + 1)}
                    </span>
                    <div class="flex-1 min-w-0 flex items-center justify-between gap-2">
                        <p class="font-semibold text-white truncate">{competitor.username}</p>
                        <span class="text-[0.55rem] uppercase tracking-[0.35em] text-base-content/60 whitespace-nowrap">
                            {numberFormatter.format(competitor.opens.length)} opens
                        </span>
                    </div>
                    <span class="font-semibold tabular-nums text-xs md:text-sm text-white text-right w-20">
                        {numberFormatter.format(competitor.points)}
                        <span class="text-[0.6em] text-base-content/60">pts</span>
                    </span>
                </li>
            {/each}
        </ol>
    </div>
</section>
