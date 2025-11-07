<script lang="ts">
    import '../app.css';
    import { page } from '$app/stores';

    const eventName = import.meta.env.VITE_EVENT_NAME ?? 'Lockd Competition';

    const navLinks = [
        { href: '/', label: 'Leaderboard', icon: 'bi bi-activity' },
        { href: '/manage', label: 'Manage', icon: 'bi bi-terminal' },
    ];

    const isActive = (href: string, path: string) => {
        if (href === '/') {
            return path === '/';
        }
        return path.startsWith(href);
    };
</script>

<header class="border-b border-white/10 pb-4 flex flex-wrap gap-4 items-end justify-between">
    <div class="space-y-2 max-w-3xl">
        <p class="text-xs uppercase tracking-[0.35em] text-base-content/50">Live leaderboard</p>
        <h1 class="text-2xl md:text-3xl font-display text-white leading-tight">{eventName}</h1>
    </div>
    <nav class="flex gap-4">
        {#each navLinks as link}
            <a
                class={`nav-link ${isActive(link.href, $page.url.pathname) ? 'nav-link--active' : ''}`}
                href={link.href}
                title={link.label}>
                {link.label}
            </a>
        {/each}
    </nav>
</header>

<main class="flex-1 flex flex-col gap-6">
    <slot />
</main>
