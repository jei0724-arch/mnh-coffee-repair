const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const Anthropic = require("@anthropic-ai/sdk");
const cors = require("cors")({ origin: true });

const anthropicApiKey = defineSecret("ANTHROPIC_API_KEY");

const categoryLabel = {
  home: "가정용 전자동 머신",
  commercial: "상업용 그룹헤드 머신",
  capsule: "캡슐 커피머신",
};

exports.generateDescription = onRequest(
  { secrets: [anthropicApiKey] },
  (req, res) => {
    cors(req, res, async () => {
      if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
      }

      const { title, category } = req.body || {};
      if (!title || typeof title !== "string" || !title.trim()) {
        res.status(400).json({ error: "제목을 입력해주세요." });
        return;
      }

      try {
        const client = new Anthropic({ apiKey: anthropicApiKey.value() });
        const label = categoryLabel[category] || "";
        const message = await client.messages.create({
          model: "claude-opus-4-8",
          max_tokens: 500,
          system:
            '너는 커피머신 수리 업체의 수리 사례 등록을 돕는 어시스턴트야. 관리자가 입력한 사례 제목을 보고, 고객에게 보여줄 "수리 내용" 문단을 한국어로 작성해. 증상 → 원인 → 조치 순서로 2~4문장 정도로 간결하게 쓰고, 제목에서 유추할 수 없는 구체적 수치나 사실은 지어내지 마. 다른 설명 없이 본문 내용만 출력해.',
          messages: [
            {
              role: "user",
              content: `사례 제목: ${title.trim()}${label ? `\n카테고리: ${label}` : ""}\n\n위 제목에 맞는 수리 내용 문단을 작성해줘.`,
            },
          ],
        });

        const textBlock = message.content.find((block) => block.type === "text");
        res.status(200).json({ description: textBlock ? textBlock.text.trim() : "" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "생성 중 오류가 발생했습니다: " + err.message });
      }
    });
  }
);
