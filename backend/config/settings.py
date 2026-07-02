from dotenv import load_dotenv
import os

load_dotenv()


class Settings:

    APP_NAME = os.getenv("APP_NAME", "Engineering Memory Copilot")

    APP_VERSION = os.getenv("APP_VERSION", "0.1.0")

    LLM_API_KEY = os.getenv("LLM_API_KEY")

    COGNEE_API_KEY = os.getenv("COGNEE_API_KEY")

    COGNEE_BASE_URL = os.getenv("COGNEE_BASE_URL")


settings = Settings()