# ⚖️ NyayaSakhi AI

### Multilingual AI Legal Assistant for Rural Women in India

NyayaSakhi AI is a **Generative AI-powered legal assistant** that provides **simple, multilingual legal guidance** to rural women in India, focusing on **inheritance and property rights**.

---

## 🚀 Features

* 🌐 **Multilingual Support**
  Supports multiple Indian languages (Hindi, Tamil, Telugu, Marathi, etc.)

* 🤖 **AI-Powered Chatbot**
  Uses Gemini 2.5 Flash (via API) to generate legal guidance

* 🧠 **Prompt Engineering**
  Ensures:

  * Simple explanations
  * Cultural sensitivity
  * Legal relevance

* ⚡ **Real-Time Streaming Responses**
  Chat responses are streamed live

* 📄 **Document Upload & Explanation (NEW 🔥)**

  * Upload legal documents (PDF/Text)
  * AI extracts and explains them in simple language
  * Helps users understand complex legal papers

* 🔒 **Serverless Backend**
  Built using Supabase Edge Functions (Deno)

---

## 🧠 How It Works

1. User enters a query OR uploads a document
2. Request is sent to Supabase Edge Function
3. System prompt guides AI behavior
4. AI processes:

   * Chat query OR
   * Document text
5. Response is streamed back to frontend

---

## 📄 Document Upload Feature

### 💡 What it does

* Upload a legal document (PDF or text)
* Extracts content
* Explains in **simple, user-friendly language**

### 🧠 Example Use Case

> A user uploads a property document →
> AI explains ownership, rights, and important clauses in simple terms.

---

## 🏗️ Tech Stack

### Frontend

* React + Vite
* TypeScript
* Tailwind CSS

### Backend

* Supabase Edge Functions (Deno)

### AI Layer

* Gemini 2.5 Flash (via Lovable AI Gateway)
* Prompt Engineering
* Streaming responses

---

## 📁 Project Structure

```
nyayasakhi-ai/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── integrations/
│   ├── lib/
│
├── supabase/
│   ├── functions/nyaya-chat/
│
├── public/
├── .env
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/nyayasakhi-ai.git
cd nyayasakhi-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create `.env`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_key
```

In Supabase:

```
LOVABLE_API_KEY=your_api_key
```

---

### 4. Run the project

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

---

## 🔮 Future Improvements

* 🧠 Chat memory (persistent conversations)
* 📚 RAG (document-based knowledge retrieval)
* 🎤 Voice input/output
* 📍 Location-based legal help
* 📊 Admin analytics dashboard

---

## ⚠️ Disclaimer

This application provides **general legal guidance only** and is **not a substitute for professional legal advice**.

---

## ❤️ Acknowledgment

Built to empower women with accessible legal knowledge using AI.
