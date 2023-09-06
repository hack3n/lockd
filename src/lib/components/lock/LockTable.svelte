<script>
  import UpdateLockModal from "./UpdateLockModal.svelte";

  export let locks;

  let modal;
  let modalLock;

  function openModal(lock){
    modalLock = lock;
    modal.showModal();
  }
</script>

<UpdateLockModal bind:modal={modal} lock={modalLock}></UpdateLockModal>

<article class="mt-4 prose">
  <h2>Locks</h2>
</article>
<div class="overflow-x-auto">
  <table class="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Pinning</th>
        <th>Opens</th>
        <th>Points</th>
      </tr>
    </thead>
    <tbody>
      {#each locks as lock}
        <tr class="hover" on:click={() => openModal(lock)}>
          <th>{lock.id}</th>
          <td>{lock.name}</td>
          <td>{lock.pinning}</td>
          <td>{lock.opens?.length}</td>
          <td>{lock.points}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
