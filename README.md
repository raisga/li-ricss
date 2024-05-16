# li-ricss

(L)lama(I)ndex as a (R)hythmic (I)nsightful (C)reative (S)emantic (S)ystem

Based on the [rag-stream-intermediate-events-tutorial](
https://github.com/rsrohan99/rag-stream-intermediate-events-tutorial)

We use Server-Sent Events which will be recieved by Vercel AI SDK on the frontend.

## Getting Started

First clone the repo:

```bash
git clone git@github.com:raisga/li-ricss.git

cd li-ricss
```

### Backend

`cd` into the `backend` directory

```bash
cd backend
```

#### First create `.env` from `.env.example`

```bash
cp .env.example .env
```

#### Set the OpenAI key in .env

! TODO: Replace OpenAI API Key with local LLM

```bash
OPENAI_API_KEY=****
```

#### Install the dependencies

For mac users

```bash
brew install poetry
```

```bash
poetry install
```

The currently activated Python version 3.12.3 is not supported by the project (^3.11,<3.12).
Trying to find and use a compatible version.
Using python3.11 (3.11.7)

#### Generate the Index for the first time

```bash
poetry run python app/engine/generate.py
```

#### Start the backend server

```bash
poetry run python main.py
```

### Frontend

`cd` into the `frontend` directory

```bash
cd frontend
```

#### First create `.env` from `.env.example`

```bash
cp .env.example .env
```

#### Install the dependencies

```bash
npm i
```

#### Start the frontend server

```bash
npm run dev
```
