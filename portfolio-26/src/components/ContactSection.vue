<template>
    <section id="contact" class="section" style="padding-bottom: 28px">
        <div class="container">
            <h2 class="h2">Contact</h2>
            <div class="card wrap">
                <div class="left">
                    <div class="muted">메일로 바로 문의할 수 있어요.</div>
                    <div class="email">{{ toEmail }}</div>

                    <div class="row">
                        <button class="btn" @click="copyEmail">이메일 복사</button>
                        <span v-if="copied" class="muted" style="font-size: 12px">복사됨</span>
                    </div>
                </div>

                <form class="right" @submit.prevent="submit">
                    <label class="muted">제목</label>
                    <input class="input" v-model="subject" placeholder="예: 포트폴리오 관련 문의" />

                    <label class="muted" style="margin-top: 10px">내용</label>
                    <textarea class="textarea" v-model="message" placeholder="하고 싶은 말을 적어주세요." />

                    <div class="actions">
                        <button class="btn" type="submit">메일 앱 열기</button>
                        <a class="btn link" :href="mailtoPreview" title="미리보기 링크">mailto 링크</a>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed, ref, defineProps } from "vue";
import { useEmail } from "../composables/useEmail";

const props = defineProps({
    toEmail: { type: String, required: true },
});

const subject = ref("");
const message = ref("");
const copied = ref(false);

const { buildMailto, openMail } = useEmail(props.toEmail);

const mailtoPreview = computed(() =>
    buildMailto({
        subject: subject.value,
        body: message.value,
    }),
);

const submit = () => {
    openMail({ subject: subject.value, body: message.value });
};

const copyEmail = async () => {
    try {
        await navigator.clipboard.writeText(props.toEmail);
        copied.value = true;
        setTimeout(() => (copied.value = false), 1200);
    } catch (e) {
        alert("클립보드 복사에 실패했어요. 수동으로 복사해주세요: " + props.toEmail);
    }
};
</script>

<style scoped>
.wrap {
    padding: 16px;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 14px;
}
@media (max-width: 860px) {
    .wrap {
        grid-template-columns: 1fr;
    }
}
.left {
    padding: 14px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.04);
}
.email {
    margin-top: 8px;
    font-weight: 700;
    letter-spacing: 0.2px;
}
.row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 12px;
}
.right {
    display: flex;
    flex-direction: column;
    padding: 14px;
}
.actions {
    display: flex;
    gap: 10px;
    margin-top: 12px;
    flex-wrap: wrap;
}
.link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
</style>
