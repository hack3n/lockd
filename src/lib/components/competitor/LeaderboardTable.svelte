<script lang="ts">
    import type { CompetitorWithOpens } from '$lib/types';

    export let competitors: CompetitorWithOpens[];

    const sortedCompetitors = competitors
        .map((competitor) => ({
            ...competitor,
            points: competitor.opens.reduce((accumulator, open) => {
                return accumulator + open.lock.points;
            }, 0),
        }))
        .sort((a, b) => a.points < b.points)
        .slice(0, 10);

    function leaderClass(place: Number) {
        switch (place) {
            case 1:
                return 'text-primary font-semibold';
            case 2:
                return 'text-secondary font-semibold';
        }
    }
</script>

<article class="mt-4 prose">
    <h2>Leaderboard</h2>
</article>
<div class="overflow-x-auto">
    <table class="table">
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Locks Opened</th>
                <th>Points</th>
                <th />
            </tr>
        </thead>
        <tbody>
            {#each sortedCompetitors as competitor, index}
                <tr class={leaderClass(index + 1)}>
                    <th>{index + 1}</th>
                    <td>{competitor.username}</td>
                    <td>{competitor.opens.length}</td>
                    <td>{competitor.points}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
