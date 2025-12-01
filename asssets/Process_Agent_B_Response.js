const res = $node['Agent B HTTP Request'].json;
let text = res?.candidates?.[0]?.content?.parts?.[0]?.text || '';

// Remove Markdown code fences (```json ... ``` or ``` ... ```)
text = text.replace(/```(json)?\n?/g, '').replace(/```$/, '').trim();

// Try to parse JSON safely
let parsed;
try {
  parsed = JSON.parse(text);
} catch (err) {
  parsed = {
    critique: 'Parsing failed or invalid JSON',
    final_post: text || 'No output'
  };
}

// Get token usage
const usageA = $('Prepare Agent B Prompt').first().json.usageA || 0;
const usageB = res?.usageMetadata?.totalTokenCount || 0;

// Total tokens
const totalTokens = usageA + usageB;

// Estimated cost (Gemini pricing: $0.0005 per 1K tokens)
const costPerThousandTokens = 0.0005;
const estimatedCost = (totalTokens / 1000) * costPerThousandTokens;

return {
  json: {
    topic: $json.topic,
    draft: $json.draft,
    final_post: parsed.final_post,
    critique: parsed.critique,
    usageA,
    usageB,
    totalTokens,
    estimatedCost: Number(estimatedCost.toFixed(6)), // Round to 6 decimals
    timestamp: new Date().toISOString(),
    status: 'success'
  }
};
