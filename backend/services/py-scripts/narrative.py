import argparse  # Library for parsing command-line arguments
import json  # Library for handling JSON data
import google.generativeai as genai  # Google Generative AI library for generating content

# Set up argument parser with description
parser = argparse.ArgumentParser(description="Generate a narrative from the provided text")

# Add argument for JSON file path
parser.add_argument("json_file", type=str)
# Parse command-line arguments and store in `args`
args = parser.parse_args()

# Retrieve the JSON file path from command-line arguments
sourceFile = args.json_file

# Load the JSON file's content into a dictionary
with open(sourceFile, 'r', encoding='utf-8') as file:
    inputVeri = json.load(file)

# Extract the main text content to be processed from the JSON
textDocument = inputVeri["text"]

# Configure the Generative AI model with the API key (best practice: replace with environment variable in production)
genai.configure(api_key="AIzaSyDqC5cme1DLiVksst_l5KDWOJ8o842Gj_I")
model = genai.GenerativeModel(model_name="gemini-1.5-flash")

# Define the prompt to create a detailed educational narrative from the text content
final_prompt = "Create a detailed educational narrative that explains the information provided."

# Generate the narrative based on the document's text and the prompt
response = model.generate_content([textDocument, final_prompt])

# Prepare the output data dictionary with source file and the generated narrative text
outputVeri = {
    "source": sourceFile,
    "text": response.text,
}

# Modify the output file name to indicate it's a narrative version and save as JSON
out_path = sourceFile.split(".")
out_path[-2] = out_path[-2] + "-nar"
out_path[-1] = "json"
out_path = ".".join(out_path)

# Write the narrative output to the new JSON file
with open(out_path, 'w') as f:
    json.dump(outputVeri, f, ensure_ascii=False, indent=4)

# Print the path of the output JSON file
print(out_path)
