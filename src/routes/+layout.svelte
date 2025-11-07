<script lang="ts">
    import '../app.css';
    import { page } from '$app/stores';

    const eventName = import.meta.env.VITE_EVENT_NAME ?? 'Lockd Competition';
    const eventTagline =
        import.meta.env.VITE_EVENT_TAGLINE ?? 'Live standings direct from the lockpicking village.';

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

<header class="glass-panel rounded-3xl border border-white/5 p-6 md:p-8 mb-10 shadow-glow">
    <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div class="space-y-3">
            <p class="text-xs uppercase tracking-[0.65em] text-primary/70">Live leaderboard</p>
            <h1 class="text-3xl md:text-4xl font-display text-white">{eventName}</h1>
            <p class="text-sm text-base-content/70 max-w-2xl">
                {eventTagline}
            </p>
        </div>
        <nav class="flex flex-wrap gap-3 justify-end">
            {#each navLinks as link}
                <a
                    class={`nav-pill ${isActive(link.href, $page.url.pathname) ? 'nav-pill--active' : ''}`}
                    href={link.href}
                    title={link.label}>
                    <i class={`${link.icon} text-lg`}></i>
                    {link.label}
                </a>
            {/each}
        </nav>
    </div>
</header>

<main class="space-y-8">
    <slot />
</main>
