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
</script>

<UpdateCompetitorModal bind:modal competitor={modalCompetitor} />

<article class="mt-4 prose">
    <h2>Competitors</h2>
</article>
<div class="overflow-x-auto">
    <table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Opens</th>
                <th>Score</th>
            </tr>
        </thead>
        <tbody>
            {#each competitors as competitor}
                <tr class="hover" on:click={() => openModal(competitor)}>
                    <th>{competitor.id}</th>
                    <td>{competitor.username}</td>
                    <td>{competitor.opens.length}</td>
                    <td>
                        {competitor.opens.reduce((accumulator, open) => {
                            return accumulator + open.lock.points;
                        }, 0)}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
