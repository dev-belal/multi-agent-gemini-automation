# Multi-Agent Gemini LinkedIn Workflow

This repository contains an automated **multi-agent content-generation workflow**, built in **n8n**, that creates polished LinkedIn posts using Google's **Gemini 2.5 Flash** model. 

---

## 📁 Repository Structure
```
/
├── workflow.json                 # n8n export of the workflow
├── workflow.png                  # Image of the workflow
├── README.md                     # Documentation
├── ./assets                      # All custom code that I have used
```

---

The workflow uses two AI agents:

- **Agent A — Content Writer:** Creates a first-draft LinkedIn post based on a topic.  
- **Agent B — Editor & Critic:** Reviews, critiques, and rewrites the draft into a final polished LinkedIn post.

The workflow also performs:
- Draft validation  
- Hallucination detection  
- Token usage tracking  
- Cost estimation  
- Automatic logging to Google Sheets  

---

## 📸 Workflow Diagram
![Workflow Diagram](./workflow.png)

---

## 🚀 Features
### 🧠 1. Multi-Agent AI Content Pipeline
This workflow implements a **two-agent architecture**:
- **Agent A (Writer)** generates a structured draft (150–200 words)
- **Agent B (Editor)** evaluates clarity, tone, jargon, and readability — then rewrites the post
- The editor returns output **strictly in JSON format**, enforced by prompt constraints

---

### 🛑 2. Draft Validation & Hallucination Detection
Before sending the draft to Agent B, the workflow validates:
- Draft exists
- Draft ≤ 200 words
- No banned phrases like ```"as an AI language model"```
- No generic hallucinations
If validation fails → Agent A regenerates until a valid draft is produced.

---

### 🧮 3. Token + Cost Tracking
The workflow extracts:
- **Agent A token usage**
- **Agent B token usage**
- **Total tokens**
- **Estimated cost** using rate:
  ```
    $0.0005 per 1,000 tokens
Logged data helps track generation efficiency over time.

---

### 📊 4. Google Sheets Logging
Each execution appends a row to a Google Sheet containing:
- Timestamp
- Topic
- Agent A draft
- Agent B final version
- Total tokens
- Estimated cost
Perfect for auditing content quality & spend analytics.

---

## 🧩 Workflow Architecture
### 1. Manual Trigger
Starts the workflow manually inside n8n.
### 2. Set Agent A Prompt
Defines a high-quality static prompt for Agent A and sets the topic:
- Topic can later be parameterized
- Includes rules for tone, structure, clarity, and style
### 3. Agent A HTTP Request
Sends the writer prompt to Gemini 2.5 Flash.
Response includes:
- Draft text
- Token usage
### 4. Draft Validation (Code Node)
Checks for:
- Length > 0
- Max 200 words
- No hallucination patterns
- No invalid phrases
If invalid → loops back to Agent A for regeneration.
### 5. Prepare Agent B Prompt (Code Node)
Builds a JSON-restricted prompt for Agent B, including:
- Critique rules
- Editing instructions
- Strict JSON-only output
- No Markdown or text outside JSON
### 6. Agent B HTTP Request
- Sends editor prompt + draft to Gemini 2.5 Flash.
- Returns critique + refined final post.
### 7. Process Agent B Response (Code Node)
Cleans responses by:
- Removing accidental Markdown fences
- Safe-parsing returned JSON
- Assembling final structured output
- Calculating cost
- Adding timestamp & success flag
### 8. Google Sheets (Append Row)
Writes the following data:
- Timestamp
- Topic
- Agent A draft
- Agent B final version
- Total tokens
- Estimated cost

---

## 🔧 Setup Instructions
### 1. Install n8n
Follow official installation instructions:
https://docs.n8n.io/getting-started/installation/

### 2. Import the Workflow
Inside n8n:
```
Settings → Workflows → Import from File
```
Upload the ```.json``` workflow included in this repo.

### 3. Add Environment Variables
Set your Gemini API key:
```
GEMINI_API_KEY=your_api_key_here
```
Alternatively, hardcode inside the HTTP Request nodes (not recommended for production).

### 4. Add Google Sheets Credentials
Go to:
```
Settings → Credentials → Google Sheets OAuth2
```
Provide:
- Client ID
- Client Secret
- Refresh Token
- Required scopes

---

## 🧪 Recommended Enhancements
- Convert topic input from static → form, webhook, or Airtable
- Add email/slack notification
- Build an API endpoint version
- Replace hardcoded prompts with environment variables
- Add optional SEO agent (Agent C)

---

## 🤝 Contributing
Pull requests are welcome!
If you improve the prompts or extend the automation, feel free to submit enhancements.

---

## 📄 License
MIT License — free to use, modify, and distribute.
