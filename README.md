# SimpliShop

**SimpliShop** is an AI-powered shopping assistant that enables users to search, compare, and discover alternative products. It utilizes advanced embeddings and large language models to deliver structured recommendations.

### 📖 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How it Works](#how-it-works)
- [API Endpoints](#api-endpoints)
- [Future Enhancements](#future-enhancements)
- [References](#references)

### 🚀 Features

- **Product Search** – Retrieve relevant products using semantic embeddings.
- **Product Comparison** – Compare two products side-by-side (pros, cons, price, recommended alternatives).
- **Alternative Suggestions** – Find similar products based on a query or product link.
- **AI Chat Assistant** – Ask questions in natural language and receive structured JSON responses.
- **CLI Access** – Use all features via terminal commands.

### 🧰 Tech Stack

- **Backend:** Node.js & Express
- **AI/LLM:** Gemini AI (Google Generative)
- **Embeddings:** OpenAI Large Embeddings via RapidAPI
- **Vector Database:** ChromaDB
- **Validation:** AJV (JSON schema validation)
- **CLI:** Node.js, Commander.js, Chalk, cli-table3

### 📂 Project Structure

```
SimpliShop/
├── .env
├── package.json
├── server.js
├── src/
│   ├── routes/         # Express routes
│   ├── controllers/    # Route logic
│   ├── services/       # Embeddings, LLM prompts, vector store
│   ├── data/           # Product dataset
│   ├── schema/         # JSON schemas
│   ├── validation/     # AJV validators
│   ├── utils/          # Helper utilities
├── cli/                # Command-line interface
├── tests/              # Unit & integration tests
```

### ⚡ Getting Started

1. **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/simplishop.git
    cd simplishop
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Configure environment variables**

    Create a `.env` file in the root directory:

    ```
    PORT=5001
    GEMINI_API_KEY=your_gemini_key
    OPENAI_API_KEY=your_openai_key
    RAPIDAPI_KEY=your_rapidapi_key
    RAPIDAPI_HOST=openai-api-host-from-rapidapi
    ```

4. **Start the backend server**
    ```bash
    npm run dev
    # or
    node server.js
    ```

5. **Use CLI commands**

    - Search products:
      ```bash
      node cli/index.js search "best budget laptop"
      ```
    - Compare products:
      ```bash
      node cli/index.js compare "iPhone 14" "Samsung S23"
      ```
    - Find alternatives:
      ```bash
      node cli/index.js alternative "Apple laptops"
      ```
    - Chat with the AI assistant:
      ```bash
      node cli/index.js chat "recommend a gaming mouse under $50"
      ```

### 🔧 How it Works

1. **User Query:** The user submits a search, compare, or chat request.
2. **Embeddings:** The query is converted to a vector using OpenAI embeddings via RapidAPI.
3. **Vector Search:** ChromaDB retrieves similar products using cosine similarity.
4. **LLM Generation:** Gemini AI generates contextual recommendations in structured JSON (product, pros/cons, price, alternatives).
5. **CLI / API Response:** Results are shown in the terminal or returned via API.

### 📦 API Endpoints

| Route                | Method | Description                   |
|----------------------|--------|-------------------------------|
| `/api/search`        | POST   | Search products with a query  |
| `/api/compare`       | POST   | Compare two products          |
| `/api/alternative`   | POST   | Suggest alternatives          |
| `/api/assistant`     | POST   | Chat with AI assistant        |

### 🛠 Future Enhancements

- Web UI integration
- Multi-turn chat memory
- Hybrid search (vector + keyword fallback)
- Function calling for live price/product fetch

### 📚 References

- [Gemini AI](https://ai.google.dev/)
- [OpenAI Embeddings](https://platform.openai.com/docs/guides/embeddings)
- [ChromaDB](https://www.trychroma.com/)
- [RapidAPI](https://rapidapi.com/swift-api-swift-api-default/api/openai-embedding-v3-large)