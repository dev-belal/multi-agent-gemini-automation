const draft = $node['Agent A HTTP Request'].json.candidates[0].content.parts[0].text || '';

// Define max length in words (e.g., 200)
const maxWords = 200;
const wordCount = draft.split(/\s+/).length;

// Check for hallucination by simple heuristics
const forbiddenPhrases = ["as an AI language model", "cannot predict", "in this new era", "visionary insights"];
const hallucinates = forbiddenPhrases.some(p => draft.includes(p));

if (!draft || wordCount > maxWords || hallucinates) {
  return {
    json: {
      topic: $('set Agent A Prompt').first().json.topic,
      draft: draft || 'Draft unavailable',
      validDraft: false,
      reason: !draft ? 'Empty draft' : hallucinates ? 'Hallucination detected' : 'Too long'
    }
  };
} else {
  return {
    json: {
      topic: $('set Agent A Prompt').first().json.topic,
      draft,
      validDraft: true
    }
  };
}
