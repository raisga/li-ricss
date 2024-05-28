import os
from typing import Dict
from llama_index.core.settings import Settings
from llama_index.core.embeddings import resolve_embed_model
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.llms.ollama import Ollama

def llm_config_from_env() -> Dict:
    from llama_index.core.constants import DEFAULT_TEMPERATURE

    model = os.getenv("MODEL")
    temperature = os.getenv("LLM_TEMPERATURE", DEFAULT_TEMPERATURE)
    max_tokens = os.getenv("LLM_MAX_TOKENS")
    request_timeout = os.getenv("REQUEST_TIMEOUT")

    config = {
        "model": model,
        "temperature": float(temperature),
        "max_tokens": int(max_tokens) if max_tokens is not None else None,
        "request_timeout": int(request_timeout) if request_timeout is not None else 60.0,
    }
    return config


def embedding_config_from_env() -> Dict:
    model_name = os.getenv("EMBEDDING_MODEL")
    # dimension = os.getenv("EMBEDDING_DIM")

    config = {
        "model_name": model_name,
        # "dimension": int(dimension) if dimension is not None else None,
    }
    return config


def init_settings():
    llm_configs = llm_config_from_env()
    embedding_configs = embedding_config_from_env()

    Settings.llm = Ollama(**llm_configs)
    Settings.embed_model = resolve_embed_model(HuggingFaceEmbedding(**embedding_configs))
    Settings.chunk_size = int(os.getenv("CHUNK_SIZE", "1024"))
    Settings.chunk_overlap = int(os.getenv("CHUNK_OVERLAP", "20"))
