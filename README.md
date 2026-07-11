# 🎉 EVENTO --- AI-Powered Event Décor & Prop Rental Recommendation System

EVENTO is an AI-powered event décor and prop rental recommendation
platform designed to simplify event planning.

Instead of manually browsing hundreds of décor items, users can describe
their event in natural language. EVENTO understands the requirement,
retrieves semantically relevant décor and props, applies real-world
constraints such as budget and availability, and uses an LLM to re-rank
the results with meaningful explanations.

> **Final Year Project --- AI-Integrated Recommendation System for Event
> Management & Prop Rental**

------------------------------------------------------------------------

## 🚀 The Problem

Planning event décor is often a time-consuming and fragmented process.

Users usually have to:

-   Search through multiple vendors
-   Browse large décor catalogues manually
-   Compare prices and availability
-   Explain the same requirements repeatedly
-   Find items matching a specific theme or event style

Traditional keyword search also fails when the user's description does
not exactly match product tags.

For example:

> *"I need a classy pastel setup for a small outdoor engagement under
> ₹50,000."*

A normal search engine may only match exact keywords. EVENTO focuses on
understanding the **meaning and intent** behind the request.

------------------------------------------------------------------------

## 💡 The Solution

EVENTO uses a hybrid AI recommendation pipeline combining:

-   Semantic search
-   Text embeddings
-   Vector similarity
-   Rule-based filtering
-   Hybrid scoring
-   LLM re-ranking
-   AI-generated explanations

The system converts a user's event requirement into an embedding and
searches a vector database for semantically similar décor items.

The retrieved results are then filtered and ranked using practical event
constraints before an LLM generates the final recommendation order.

------------------------------------------------------------------------

## ✨ Key Features

### 🤖 AI-Based Event Recommendations

Users describe their event using natural language and receive
context-aware décor and prop recommendations.

### 🔍 Semantic Vector Search

EVENTO uses embeddings and cosine similarity to retrieve items based on
meaning rather than exact keyword matches.

### 🎯 Rule-Based Filtering

Recommendations are filtered using real-world constraints such as:

-   Budget
-   Item availability
-   Vendor distance
-   Required quantity

### 📊 Hybrid Recommendation Scoring

Each retrieved item is evaluated using multiple signals:

``` text
Sᵢ = α₁Tᵢ + α₂Vᵢ + α₃Simᵢ + α₄Popᵢ + α₅(1/Pᵢ)
```

Where:

  Signal   Description
  -------- -----------------------------
  `Tᵢ`     Theme relevance
  `Vᵢ`     Vendor relevance
  `Simᵢ`   Semantic similarity
  `Popᵢ`   Item popularity
  `Pᵢ`     Price factor
  `α`      Configurable signal weights

### 🧠 LLM Re-Ranking

Top candidates are sent to an LLM for contextual re-ranking based on the
complete event requirement.

### 💬 Explainable Recommendations

The system can generate human-readable reasons explaining why an item is
recommended.

Example:

> **Recommended because it matches your pastel engagement theme, fits
> your budget and is available near your selected location.**

### 🏪 Vendor & Décor Management

Vendors can manage their profiles and décor inventory, including:

-   Item information
-   Categories
-   Theme tags
-   Pricing
-   Availability
-   Popularity data

------------------------------------------------------------------------

## 🧠 AI Recommendation Pipeline

``` text
User Event Requirement
          │
          ▼
    Embedding API
          │
          ▼
     Vector Database
          │
          ▼
 Top-K Cosine Similarity Search
          │
          ▼
    Rule-Based Filtering
  ┌─────────────────────────┐
  │ Budget                  │
  │ Availability            │
  │ Distance                │
  │ Required Quantity       │
  └─────────────────────────┘
          │
          ▼
      Hybrid Scoring
          │
          ▼
      LLM Re-Ranking
          │
          ▼
 AI Explanation Generation
          │
          ▼
 Final Ranked Recommendations
```

------------------------------------------------------------------------

## 🛠️ Tech Stack

### Mobile Application

-   React Native
-   JavaScript / TypeScript

### Backend

-   Node.js
-   Express.js
-   REST APIs
-   JWT Authentication

### AI & Recommendation Engine

-   Text Embeddings
-   Semantic Search
-   Cosine Similarity
-   Vector Search
-   Rule-Based Filtering
-   Hybrid Scoring
-   Large Language Model Re-Ranking

### Vector Database

The recommendation engine is designed around a vector database for
semantic retrieval.

-   ChromaDB
-   Compatible architecture for Pinecone / Weaviate

------------------------------------------------------------------------

## 🏗️ System Architecture

``` text
┌──────────────────────┐
│  React Native App    │
└──────────┬───────────┘
           │ REST API
           ▼
┌──────────────────────┐
│ Node.js / Express.js │
│     Backend API      │
└───────┬──────┬───────┘
        │      │
        │      └──────────────────┐
        ▼                         ▼
┌──────────────────┐    ┌─────────────────────┐
│ Authentication & │    │ AI Recommendation   │
│ Business Logic   │    │ Engine              │
└──────────────────┘    └──────────┬──────────┘
                                   │
                                   ▼
                         ┌─────────────────────┐
                         │ Embedding Service   │
                         └──────────┬──────────┘
                                   │
                                   ▼
                         ┌─────────────────────┐
                         │ Vector Database     │
                         └──────────┬──────────┘
                                   │
                                   ▼
                         ┌─────────────────────┐
                         │ Hybrid Scoring +    │
                         │ LLM Re-Ranking      │
                         └─────────────────────┘
```

------------------------------------------------------------------------

## 📁 Core Data Entities

### User

``` text
user_id
name
phone
email
location
created_at
```

### Vendor

``` text
vendor_id
shop_name
owner_name
address
latitude
longitude
rating
verified
created_at
```

### Décor Item

``` text
item_id
vendor_id
name
description
theme_tags
category
price
availability
popularity_score
created_at
```

### Event Query

``` text
query_id
user_id
query_text
event_type
budget
venue_type
created_at
```

### Recommendation

``` text
recommendation_id
query_id
item_id
semantic_score
rule_score
llm_score
final_score
```

------------------------------------------------------------------------

## 🔌 API Overview

### Authentication

``` http
POST /api/v1/auth/signup
POST /api/v1/auth/login
POST /api/v1/auth/otp
```

### Event Recommendation

``` http
POST /api/v1/events/query
GET  /api/v1/events/{query_id}/recommendations
```

### AI Services

``` http
POST /api/v1/ai/embed
POST /api/v1/ai/rerank
POST /api/v1/ai/explain
```

### Vendor & Décor Management

``` http
GET    /api/v1/vendors
POST   /api/v1/vendors
GET    /api/v1/decor-items
POST   /api/v1/decor-items
PUT    /api/v1/decor-items/{item_id}
DELETE /api/v1/decor-items/{item_id}
```

------------------------------------------------------------------------

## 🔄 Example Recommendation Flow

### User Query

``` json
{
  "query_text": "Pastel outdoor engagement decoration with floral props",
  "event_type": "Engagement",
  "budget": 50000,
  "venue_type": "Outdoor"
}
```

### AI Processing

1.  Convert the event query into an embedding.
2.  Retrieve Top-K semantically similar décor items.
3.  Filter unavailable and unsuitable items.
4.  Apply budget, distance and quantity constraints.
5.  Calculate a hybrid recommendation score.
6.  Re-rank the strongest candidates using an LLM.
7.  Generate explanations for the final recommendations.

### Example Output

``` json
{
  "recommendations": [
    {
      "item": "Pastel Floral Arch",
      "final_score": 0.94,
      "reason": "Strong theme match, within budget and suitable for an outdoor engagement."
    }
  ]
}
```

------------------------------------------------------------------------

## ⚙️ Getting Started

### 1. Clone the Repository

``` bash
git clone <your-repository-url>
cd evento
```

### 2. Install Dependencies

``` bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root.

``` env
PORT=5000
JWT_SECRET=your_jwt_secret

AI_API_KEY=your_ai_api_key

VECTOR_DB_URL=your_vector_database_url
VECTOR_DB_API_KEY=your_vector_database_api_key
```

> Never commit your `.env` file or API keys to GitHub.

### 4. Start the Development Server

``` bash
npm run dev
```

For the React Native application, follow the mobile app setup in the
relevant project directory.

------------------------------------------------------------------------

## 🎯 Project Objectives

-   Reduce manual event décor discovery
-   Improve recommendation relevance using semantic AI
-   Connect event requirements with suitable vendor inventory
-   Apply practical business constraints to AI retrieval
-   Build an explainable hybrid recommendation system
-   Demonstrate real-world usage of embeddings, vector databases and
    LLMs

------------------------------------------------------------------------

## 🔮 Future Scope

-   Multilingual event queries
-   Image-based décor search
-   AI-generated complete event themes
-   Vendor recommendation engine
-   Real-time inventory synchronization
-   Location-aware recommendations
-   Personalized recommendations using user history
-   In-app vendor communication
-   Booking and payment integration

------------------------------------------------------------------------

## 🎓 Academic Context

EVENTO was developed as a **Final Year Project** to explore the
practical implementation of an AI-integrated recommendation system for
event management and prop rental.

The project demonstrates how **semantic retrieval, vector databases,
hybrid ranking and Large Language Models** can be combined to solve a
real-world recommendation problem.

------------------------------------------------------------------------

## 👨‍💻 Author

**Himanshu Kumar**

Full Stack Developer \| AI-Powered Product Builder

------------------------------------------------------------------------

## ⭐ Support

If you find this project interesting, consider giving the repository a
⭐.

Feedback and suggestions are always welcome.
