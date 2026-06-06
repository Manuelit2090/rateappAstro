<script lang="ts"></script>


<template>
    <form action="/search" method="get" class="relative flex-1 max-w-xl">
        <!-- Search icon inline SVG (no JS needed here) -->
        <svg class="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
        </svg>
        <input name="q" type="search" placeholder="Search restaurants, dishes, neighborhoods…"
            class="w-full h-11 pl-11 pr-12 rounded-full bg-surface border border-border/60 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-lime/60 focus:ring-2 focus:ring-lime/20 transition" />
        <button type="submit"
            class="absolute right-1 top-1/2 -translate-y-1/2 h-9 px-4 rounded-full bg-primary text-primary-content text-sm font-semibold hover:bg-primary-focus transition">
            Buscar
        </button>
    </form>

</template>