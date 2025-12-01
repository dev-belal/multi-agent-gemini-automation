# Multi-Agent Gemini LinkedIn Workflow

This repository contains an automated **multi-agent content-generation workflow**, built in **n8n**, that creates polished LinkedIn posts using Google's **Gemini 2.5 Flash** model.  
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
  ```bash
  $0.0005 per 1,000 tokens
```
