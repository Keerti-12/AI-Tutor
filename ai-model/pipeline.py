import sys
import os
from trainer import train_if_data_exists
from chat import chat


def run_pipeline(question):
    try:
        # Check if data folder exists and has files
        data_path = os.path.join(os.path.dirname(__file__), "data")

        if os.path.exists(data_path) and len(os.listdir(data_path)) > 0:
            train_if_data_exists()

        response = chat(question)

        if not response:
            return "I am ready to help you learn. Ask me any question!"

        return response

    except Exception as e:
        return f"Pipeline error: {str(e)}"


# CLI runner for Node.js API
if __name__ == "__main__":
    try:
        question = sys.argv[1]
        result = run_pipeline(question)
        print(result, flush=True)
    except Exception as e:
        print(f"Error: {str(e)}", flush=True)