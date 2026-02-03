export function useEmail(toEmail) {
    const buildMailto = ({ subject, body }) => {
        const s = encodeURIComponent(subject || "");
        const b = encodeURIComponent(body || "");
        return `mailto:${toEmail}?subject=${s}&body=${b}`;
    };

    const openMail = (payload) => {
        const url = buildMailto(payload);
        // 기본 메일 앱 열기
        window.location.href = url;
    };

    return { buildMailto, openMail };
}
