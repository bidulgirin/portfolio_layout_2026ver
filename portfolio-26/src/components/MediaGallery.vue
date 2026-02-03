<template>
    <section id="media" class="section">
        <div class="container">
            <h2 class="h2">Media</h2>
            <p class="muted" style="margin: 0 0 12px 0">public/media 폴더에 파일을 넣고 src/data/media.js만 수정하면 됩니다.</p>

            <div class="grid gallery">
                <div v-for="m in items" :key="m.id" class="card tile">
                    <div class="media">
                        <img v-if="m.type === 'image'" :src="m.src" :alt="m.title" loading="lazy" />
                        <video v-else :src="m.src" controls playsinline preload="metadata"></video>
                    </div>

                    <div class="cap">
                        <div class="t">{{ m.title }}</div>
                        <div class="muted s">{{ m.type.toUpperCase() }}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
    items: { type: Array, default: () => [] },
});
</script>

<style scoped>
.gallery {
    grid-template-columns: repeat(12, 1fr);
}
.tile {
    grid-column: span 4;
    overflow: hidden;
}
@media (max-width: 980px) {
    .tile {
        grid-column: span 6;
    }
}
@media (max-width: 620px) {
    .tile {
        grid-column: span 12;
    }
}

.media {
    width: 100%;
    aspect-ratio: 16/10;
    background: rgba(0, 0, 0, 0.25);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
}
.media img,
.media video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}
.cap {
    padding: 12px 12px 14px 12px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 10px;
}
.t {
    font-weight: 650;
    font-size: 14px;
}
.s {
    font-size: 12px;
}
</style>
