from dotenv import load_dotenv
from os import listdir

load_dotenv()

import logging
from llama_index.core.indices import (
    VectorStoreIndex,
)
from app.engine.constants import STORAGE_DIR, DATA_DIR
from app.engine.loader import get_documents
from app.settings import init_settings


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()


def generate_datasource():
    logger.info("Creating new index")
    # load the documents and create the index

    dir_files = listdir(DATA_DIR)
    if len(dir_files) > 0:
        documents = get_documents()
        index = VectorStoreIndex.from_documents(
            documents,
        )
        # store it for later
        index.storage_context.persist(STORAGE_DIR)
        logger.info(f"Finished creating new index. Stored in {STORAGE_DIR}")


if __name__ == "__main__":
    init_settings()
    generate_datasource()
