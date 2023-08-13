import logging
import os

# Define log format
log_format = "%(asctime)s - %(levelname)s - %(message)s"

# Create a logs directory if it doesn't exist
if not os.path.exists("logs"):
    os.makedirs("logs")

logging.basicConfig(filename="logs/app.log", level=logging.INFO, format=log_format)

logger = logging.getLogger()

# Optional: add a console handler to print logs to the console as well
console_handler = logging.StreamHandler()
console_handler.setFormatter(logging.Formatter(log_format))
logger.addHandler(console_handler)
