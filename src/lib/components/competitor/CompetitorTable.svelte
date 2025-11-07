<script lang="ts">
    import type { CompetitorWithOpens, Modal } from '$lib/types';

    import UpdateCompetitorModal from './UpdateCompetitorModal.svelte';

    export let competitors: CompetitorWithOpens[];

    let modal: Modal;
    let modalCompetitor: CompetitorWithOpens;

    function openModal(competitor: CompetitorWithOpens) {
        modalCompetitor = competitor;
        modal.showModal();
    }

    const competitorPoints = (competitor: CompetitorWithOpens) =>
        competitor.opens.reduce((accumulator, open) => accumulator + open.lock.points, 0);
</script>

<UpdateCompetitorModal bind:modal competitor={modalCompetitor} />

<section class="glass-panel rounded-3xl p-6 md:p-8 shadow-glow">
    <div class="flex flex-wrap items-baseline justify-between gap-4">
        <div>
            <p class="text-xs uppercase tracking-[0.45em] text-base-content/60">Roster</p>
            <h2 class="text-2xl font-display text-white">Competitors</h2>
        </div>
        <p class="text-xs uppercase tracking-[0.35em] text-base-content/60">
            {competitors.length} entries
        </p>
    </div>
    <div class="mt-6 overflow-x-auto rounded-2xl border border-white/5">
        <table class="table table-zebra">
            <thead class="text-xs uppercase tracking-[0.3em] text-base-content/50 bg-base-200/60">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Opens</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {#each competitors as competitor}
                    <tr
                        class="hover cursor-pointer"
                        on:click={() => openModal(competitor)}>
                        <th class="font-mono text-xs text-base-content/60">{competitor.id}</th>
                        <td class="font-semibold">{competitor.username}</td>
                        <td>
                            <div class="font-mono text-sm">{competitor.opens.length}</div>
                            <div class="text-[0.65rem] uppercase tracking-[0.35em] text-base-content/50">
                                logs
                            </div>
                        </td>
                        <td class="text-right font-semibold">
                            {competitorPoints(competitor)}
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</section>
