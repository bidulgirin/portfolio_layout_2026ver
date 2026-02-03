<template>
    <header class="header">
        <div class="container inner">
            <div class="brand">
                <div class="logo">◼︎</div>
                <div>
                    <div class="name">{{ name }}</div>
                    <div class="role muted">{{ role }}</div>
                </div>
            </div>

            <nav class="nav muted">
                <a href="#career">Career</a>
                <a href="#media">Media</a>
                <a href="#contact">Contact</a>
            </nav>
        </div>
    </header>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
    name: { type: String, default: "Your Name" },
    role: { type: String, default: "Frontend Developer" },
});
</script>

<style scoped>
.header {
    position: sticky;
    top: 0;
    z-index: 20;
    background: rgba(11, 13, 18, 0.55);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
}
.inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 0;
}
.brand {
    display: flex;
    align-items: center;
    gap: 10px;
}
.logo {
    width: 34px;
    height: 34px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.16);
    display: flex;
    align-items: center;
    justify-content: center;
}
.name {
    font-weight: 700;
    letter-spacing: 0.2px;
}
.role {
    font-size: 12px;
    margin-top: 2px;
}
.nav {
    display: flex;
    gap: 14px;
    font-size: 13px;
}
.nav a:hover {
    color: rgba(255, 255, 255, 0.92);
}
</style>
