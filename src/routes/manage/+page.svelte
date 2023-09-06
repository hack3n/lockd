<script>
  import CompetitorTable from '$lib/components/competitor/CompetitorTable.svelte';
  import CreateCompetitorModal from '$lib/components/competitor/CreateCompetitorModal.svelte';
  import CreateLockModal from '$lib/components/lock/CreateLockModal.svelte';
  import LockTable from '$lib/components/lock/LockTable.svelte';
  import CreateOpenModal from '$lib/components/open/CreateOpenModal.svelte';

  export let data;
  export let form;

  let createOpenModal;
  let createCompetitorModal;
  let createLockModal;

  let toastOpen = true;

  setTimeout(() => {
    toastOpen = false;
  }, 3 * 1000);
</script>

{#if form?.message && toastOpen }
  <div class="toast toast-top toast-end">
    <div class="alert alert-success">
      <span>{form.message}</span>
    </div>
  </div>
{/if}

{#if form?.error && toastOpen }
  <div class="toast toast-top toast-end">
    <div class="alert alert-warning">
      <span>{form.error}</span>
    </div>
  </div>
{/if}

<div class="mt-4 mb-8">
  <button class="btn btn-primary" on:click={() => { createOpenModal.showModal() }}>
    New Open
  </button>
  <button class="btn btn-primary" on:click={() => { createCompetitorModal.showModal() }}>
    New Competitor
  </button>
  <button class="btn btn-primary" on:click={() => { createLockModal.showModal() }}>
    New Lock
  </button>
</div>

<CreateOpenModal 
  bind:modal={createOpenModal} 
  competitors={data.competitors} 
  locks={data.locks}>
</CreateOpenModal>

<CreateCompetitorModal 
  bind:modal={createCompetitorModal}>
</CreateCompetitorModal>

<CreateLockModal 
  bind:modal={createLockModal}>
</CreateLockModal>

<CompetitorTable competitors={data.competitors}></CompetitorTable>
<LockTable locks={data.locks}></LockTable>