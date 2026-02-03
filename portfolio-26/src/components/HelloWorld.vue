<template>
    <div>
        <HeaderBar name="Your Name" role="Frontend Developer" />

        <main class="container hero">
            <div class="card heroCard">
                <div class="headline">Board-style Portfolio</div>
                <div class="muted desc">Vue CLI 구조에 맞춰 컴포넌트 분리 + 데이터 레이어 분리까지 완료된 템플릿입니다.</div>

                <div class="quick">
                    <a class="btn" href="#career">경력 보기</a>
                    <a class="btn" href="#media">미디어</a>
                    <a class="btn" href="#contact">문의</a>
                </div>
            </div>
        </main>

        <CareerBoard :items="careers" />
        <MediaGallery :items="mediaItems" />
        <ContactSection toEmail="your.email@example.com" />

        <footer class="container footer muted">© {{ new Date().getFullYear() }} Your Name</footer>
    </div>
</template>

<script setup>
import HeaderBar from "./components/HeaderBar.vue";
import CareerBoard from "./components/CareerBoard.vue";
import MediaGallery from "./components/MediaGallery.vue";
import ContactSection from "./components/ContactSection.vue";

import { careers } from "./data/careers";
import { mediaItems } from "./data/media";
</script>

<style scoped>
.hero {
    margin-top: 18px;
}
.heroCard {
    padding: 18px;
}
.headline {
    font-size: 24px;
    font-weight: 800;
    letter-spacing: 0.2px;
}
.desc {
    margin-top: 8px;
    line-height: 1.6;
}
.quick {
    display: flex;
    gap: 10px;
    margin-top: 14px;
    flex-wrap: wrap;
}
.footer {
    padding: 24px 0 34px;
    font-size: 13px;
}
</style>
