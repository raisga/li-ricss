import os
from app.engine.index import get_index

def get_chat_engine():
    top_k = os.getenv("TOP_K", 3)
    system_prompt=os.getenv("CHAT_PROMPT")

    return get_index().as_chat_engine(
        similarity_top_k=int(top_k),
        system_prompt=system_prompt,
        chat_mode="condense_plus_context",
    )

def get_new_engine():
    top_k = os.getenv("TOP_K", 3)
    system_prompt=os.getenv("NEW_PROMPT")

    return get_index().as_chat_engine(
        similarity_top_k=int(top_k),
        system_prompt=system_prompt,
        chat_mode="condense_plus_context",
    )
