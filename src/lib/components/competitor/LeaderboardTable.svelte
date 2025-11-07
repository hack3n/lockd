<script lang="ts">
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

    $: visibleCompetitors =
        typeof limit === 'number' && limit > 0 ? sortedCompetitors.slice(0, limit) : sortedCompetitors;

    $: maxPoints = visibleCompetitors.reduce((max, competitor) => Math.max(max, competitor.points), 0);

    const padRank = (place: number) => place.toString().padStart(2, '0');

    const rowAccent = (place: number) => {
        switch (place) {
            case 1:
                return 'bg-primary/5';
            case 2:
                return 'bg-secondary/5';
            case 3:
                return 'bg-accent/5';
            default:
                return 'hover:bg-base-300/30';
        }
    };

    const badgeAccent = (place: number) => {
        switch (place) {
            case 1:
                return 'bg-gradient-to-r from-amber-300 to-orange-500 text-slate-900';
            case 2:
                return 'bg-gradient-to-r from-slate-200 to-gray-400 text-slate-900';
            case 3:
                return 'bg-gradient-to-r from-amber-600 to-orange-700 text-white';
            default:
                return 'bg-base-300/60 text-base-content/80';
        }
    };

    const progressWidth = (points: number) => (maxPoints ? Math.max((points / maxPoints) * 100, 4) : 0);

    const averagePoints = (competitor: LeaderboardCompetitor) =>
        competitor.opens.length ? competitor.points / competitor.opens.length : 0;
</script>

<section class="glass-panel rounded-3xl p-6 md:p-8 h-full flex flex-col">
    <div class="flex flex-wrap items-baseline justify-between gap-4">
        <div>
            <p class="text-xs uppercase tracking-[0.45em] text-base-content/60">{title}</p>
            <h2 class="text-2xl font-display text-white">Top performers</h2>
        </div>
        <span class="text-xs uppercase tracking-[0.35em] text-base-content/50">
            Showing {visibleCompetitors.length} / {sortedCompetitors.length}
        </span>
    </div>
    <div class="mt-6 overflow-hidden rounded-2xl border border-white/5">
        <table class="table w-full">
            <thead class="text-xs uppercase tracking-[0.3em] text-base-content/50 bg-base-200/60">
                <tr>
                    <th>Place</th>
                    <th>Competitor</th>
                    <th>Locks</th>
                    <th class="text-right">Points</th>
                </tr>
            </thead>
            <tbody>
                {#each visibleCompetitors as competitor, index}
                    <tr class={`align-middle transition ${rowAccent(index + 1)}`}>
                        <td class="font-mono text-sm text-base-content/70">
                            <span
                                class={`inline-flex items-center justify-center rounded-full px-3 py-1 font-semibold tracking-wide ${badgeAccent(index + 1)}`}>
                                {padRank(index + 1)}
                            </span>
                        </td>
                        <td>
                            <div class="font-semibold text-base text-white">{competitor.username}</div>
                            <div class="text-xs text-base-content/60 uppercase tracking-[0.3em]">
                                {numberFormatter.format(competitor.opens.length)} opens
                            </div>
                        </td>
                        <td class="max-w-[220px]">
                            <div class="flex items-center gap-3">
                                <span class="font-mono text-xl text-base-content/70">
                                    {numberFormatter.format(competitor.opens.length)}
                                </span>
                                <div class="flex-1 h-2 rounded-full bg-base-300/60 overflow-hidden">
                                    <div
                                        class={`h-full rounded-full ${index === 0 ? 'bg-primary' : 'bg-secondary'}`}
                                        style={`width: ${progressWidth(competitor.points)}%;`}></div>
                                </div>
                            </div>
                            <div class="text-[0.65rem] uppercase tracking-[0.4em] text-base-content/50 mt-2">
                                Share of leader
                            </div>
                        </td>
                        <td class="text-right">
                            <div class="text-2xl font-display text-white leading-tight">
                                {numberFormatter.format(competitor.points)}
                                <span class="text-sm text-base-content/60 ml-1">pts</span>
                            </div>
                            <div class="text-xs text-base-content/50">
                                Avg {averagePoints(competitor).toFixed(1)} pts / lock
                            </div>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</section>

```
