<script lang="ts">
    import "../app.css";
</script>

<div class="flex justify-between items-center border-b border-primary pb-2 mb-8">
    <h1 class="font-bold uppercase"><a href="/">BSides Melbourne Lockpicking Competition</a></h1>

    <div class="inline-flex items-center gap-5 text-sm">
        <a href="/" title="Leaderboard">Dashboard</a>
        <a href="/manage" title="Manage Competition">Manage</a>
    </div>
</div>

<slot />