<template>
    <article class="card p">
        <div class="top">
            <div>
                <div class="title">{{ item.title }}</div>
                <div class="meta muted">{{ item.company }} · {{ item.period }}</div>
            </div>
        </div>

        <div class="tags">
            <span v-for="t in item.tags" :key="t" class="tag">{{ t }}</span>
        </div>

        <ul class="list">
            <li v-for="h in item.highlights" :key="h">{{ h }}</li>
        </ul>
    </article>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
    item: { type: Object, required: true },
});
</script>

<style scoped>
.p {
    padding: 14px;
}
.top {
    display: flex;
    justify-content: space-between;
    gap: 10px;
}
.title {
    font-weight: 700;
}
.meta {
    font-size: 12px;
    margin-top: 4px;
}
.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
}
.tag {
    font-size: 12px;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.06);
}
.list {
    margin: 12px 0 0 16px;
    padding: 0;
    color: rgba(255, 255, 255, 0.82);
    line-height: 1.55;
}
</style>
