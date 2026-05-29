from dotenv import load_dotenv
import os

load_dotenv()

class Settings:

    MONGO_URI = os.getenv("MONGO_URI")

    IBM_API_KEY = os.getenv("IBM_API_KEY")

    IBM_PROJECT_ID = os.getenv("IBM_PROJECT_ID")

    IBM_URL = os.getenv("IBM_URL")

    JWT_SECRET = os.getenv("JWT_SECRET")

settings = Settings()