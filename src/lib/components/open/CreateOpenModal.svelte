<script>
  export let modal;
  export let competitors;
  export let locks;
</script>

<dialog bind:this={modal} class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Add Lock Open</h3>
      <p class="py-4">Enter competitor and lock</p>
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <form method="POST" action="?/createOpen">
        <div class="form-control mb-4">
          <select class="select select-bordered w-full max-w-xs" name="competitor">
            <option disabled selected>Competitor</option>
            {#each competitors as competitor}
              <option value={competitor.id}>{competitor.username}</option>
            {/each}
          </select>
        </div>
        <div class="form-control my-4">
          <select class="select select-bordered w-full max-w-xs" name="lock">
            <option disabled selected>Lock</option>
            {#each locks as lock}
              <option value={lock.id}>{lock.name}</option>
            {/each}
          </select>
        </div>
        <div class="modal-action">
          <button type="submit" class="btn btn-success">Save</button>
        </div>
      </form>
    </div>
  </dialog>
  