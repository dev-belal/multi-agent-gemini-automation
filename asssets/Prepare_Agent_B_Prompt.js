const draft = $node['Agent A HTTP Request'].json.candidates[0].content.parts[0].text;
const usageA = $node['Agent A HTTP Request'].json.usageMetadata.totalTokenCount;

return {
  json: {
    topic: $json.topic,
    draft: draft,
    usageA: usageA,
    agent_b_prompt: `You are a professional editor and content strategist with a sharp eye for clarity and impact.\n\nYour role is to critique and refine the draft written by Agent A. Follow these instructions strictly:\n1. Critique: Identify any unclear phrases, corporate jargon, buzzwords, or vague statements. Highlight areas that could be more direct and actionable.\n2. Refine: Rewrite the post to make it more concise, punchy, and professional. Preserve meaning, enhance clarity, and improve reader engagement.\n3. Tone: Ensure the final version is authoritative, polished, and suitable for LinkedIn's professional audience.\n4. Structure: Keep the post between 150–200 words, maintain logical flow, and add a strong closing or call to action if missing.\n5. Output: Return strictly in JSON format ONLY, like this:\n{\n  \"critique\": \"...\",\n  \"final_post\": \"...\"\n}\nDo NOT include any extra text, Markdown code fences, or explanations outside the JSON.\n\nHere is the draft from Agent A:\n${draft}`
  }
};
