import argparse  # Library for parsing command-line arguments
import json  # Library for working with JSON data
import google.generativeai as genai  # Import Google Generative AI library

# Set up argument parser with a description for the script
parser = argparse.ArgumentParser(description="Summarize the given text file")

# Add positional argument for JSON file path and an optional argument for context
parser.add_argument("json_file", type=str)
parser.add_argument("context", type=str, nargs='?', default="")

# Parse command-line arguments and store them in `args`
args = parser.parse_args()

# Extract JSON file path and context argument values
sourceFile = args.json_file  # Path to the input JSON file
input_prompt = args.context  # Context for the summary, optional

# Default the prompt to "All File" if no specific context is provided
if len(input_prompt) < 1:
    input_prompt = "All File"

# Open the JSON file and load the content as a Python dictionary
with open(sourceFile, 'r', encoding='utf-8') as file:
    inputVeri = json.load(file)

# Extract the main text content to be summarized from the JSON
textDocument = inputVeri["text"]

# Configure the Generative AI model with the API key (Replace with env variable in production)
genai.configure(api_key="AIzaSyDqC5cme1DLiVksst_l5KDWOJ8o842Gj_I")
model = genai.GenerativeModel(model_name="gemini-1.5-flash")

# Formulate the prompt for content generation
final_prompt = f"Create a lecture note summary on {input_prompt}. Use the given document as a source."

# Generate content based on the provided document text and the prompt
response = model.generate_content([textDocument, final_prompt])

# Prepare the output data dictionary with source, context, and the generated summary text
outputVeri = {
    "source": sourceFile,
    "context": input_prompt,
    "text": response.text,
}

# Modify the file name to indicate it's a summarized version and save as JSON
out_path = sourceFile.split(".")
out_path[-2] = out_path[-2] + "-sum"
out_path[-1] = "json"
out_path = ".".join(out_path)

# Write the summary output to the new JSON file
with open(out_path, 'w') as f:
    json.dump(outputVeri, f, ensure_ascii=False, indent=4)

# Print the path of the output summary file
print(out_path)
