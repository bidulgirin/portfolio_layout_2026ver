<template>
    <section id="career" class="section">
        <div class="container">
            <h2 class="h2">Career Board</h2>
            <p class="muted" style="margin: 0 0 12px 0">카드 형태로 경력/프로젝트를 정리합니다.</p>

            <div class="grid board">
                <CareerCard v-for="c in items" :key="c.id" :item="c" />
            </div>
        </div>
    </section>
</template>

<script setup>
import CareerCard from "./CareerCard.vue";
import { defineProps } from "vue";

defineProps({
    items: { type: Array, default: () => [] },
});
</script>

<style scoped>
.board {
    grid-template-columns: repeat(12, 1fr);
}
.board :deep(article) {
    grid-column: span 6;
}
@media (max-width: 820px) {
    .board :deep(article) {
        grid-column: span 12;
    }
}
</style>
