# ⚖️ NyayaSakhi AI

### Multilingual AI Legal Assistant for Rural Women in India

NyayaSakhi AI is a **Generative AI-powered legal guidance platform** designed to provide **simple, accessible, and multilingual legal support** to rural women in India, especially around **inheritance and property rights**.

---

## 🚀 Features

* 🌐 **Multilingual Support**
  Supports multiple Indian languages (Hindi, Tamil, Telugu, Marathi, etc.)

* 🤖 **AI-Powered Chatbot**
  Uses a Large Language Model (Gemini 2.5 Flash) to generate legal guidance

* 🧠 **Prompt-Engineered Responses**
  Ensures:

  * Simple language
  * Cultural sensitivity
  * Legal relevance

* ⚡ **Real-Time Streaming Responses**
  Chat responses are streamed live for better UX

* 🔒 **Secure Backend with Supabase**
  Uses Supabase Edge Functions for scalable AI execution

* 💬 **Domain-Specific Guidance**
  Focused on:

  * Hindu Succession Act (2005 Amendment)
  * Muslim Personal Law
  * Indian Succession Act
  * Women’s legal rights

---

## 🏗️ Tech Stack

### Frontend

* React + Vite
* TypeScript
* Tailwind CSS

### Backend

* Supabase (Edge Functions)
* Deno (Serverless functions)

### AI Layer

* Gemini 2.5 Flash (via Lovable AI Gateway)
* Prompt Engineering
* Streaming API responses

---

## 🧠 How It Works

1. User enters a legal query
2. Request is sent to Supabase Edge Function
3. A **system prompt** guides the AI behavior:

   * Language selection
   * Legal constraints
   * Tone and safety rules
4. LLM generates response
5. Response is streamed back to frontend

---

## 📁 Project Structure

```
nyayasakhi-ai/
│
├── src/
│   ├── components/       # UI Components
│   ├── pages/            # Application pages
│   ├── hooks/            # Custom React hooks
│   ├── integrations/     # API + Supabase integrations
│   ├── lib/              # Utility functions
│
├── supabase/
│   ├── functions/nyaya-chat/   # AI backend (Edge Function)
│
├── public/               # Static assets
├── .env                  # Environment variables
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

Create a `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_key
```

Also configure in Supabase:

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

## 🔐 Environment Variables

| Variable                      | Description            |
| ----------------------------- | ---------------------- |
| VITE_SUPABASE_URL             | Supabase project URL   |
| VITE_SUPABASE_PUBLISHABLE_KEY | Supabase public key    |
| LOVABLE_API_KEY               | API key for AI Gateway |

---

## ⚠️ Limitations

* No persistent chat memory (yet)
* No vector database (RAG not implemented)
* Relies on API-based LLM (no custom-trained model)

---

## 🔮 Future Improvements

* 🧠 Add RAG (Retrieval-Augmented Generation)
* 💾 Store chat history in database
* 📊 Add analytics for usage insights
* 🔍 Integrate legal document retrieval
* 📱 Mobile-first UI improvements

---

## 🤝 Contribution

Contributions are welcome!
Feel free to fork and submit pull requests.

---

## 📜 Disclaimer

This application provides **general legal guidance** and is **not a substitute for professional legal advice**. Users are encouraged to consult certified legal professionals or legal aid services.

---

## ❤️ Acknowledgment

Built to empower women with accessible legal knowledge and bridge the justice gap using AI.

---
