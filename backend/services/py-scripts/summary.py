import argparse  # Library for parsing command-line arguments
import google.generativeai as genai  # Import Google Generative AI library
import os

# Set up argument parser with a description for the script
parser = argparse.ArgumentParser(description="Summarize the given text file")

# Add positional argument for TXT file path and an optional argument for context
parser.add_argument("txt_file", type=str)
parser.add_argument("context", type=str, nargs='?', default="")

# Parse command-line arguments and store them in `args`
args = parser.parse_args()

# Extract TXT file path and context argument values
sourceFile = args.txt_file  # Path to the input TXT file
input_prompt = args.context  # Context for the summary, optional

# Default the prompt to "All File" if no specific context is provided
if len(input_prompt) < 1:
    input_prompt = "All File"

# Open the TXT file and load the content as a Python dictionary
with open(sourceFile, 'r', encoding='utf-8') as file:
# Extract the main text content to be summarized from the TXT
    textDocument = file.read()

# Configure the Generative AI model with the API key (Replace with env variable in production)
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel(model_name="gemini-1.5-flash")

# Formulate the prompt for content generation

final_prompt = f"""Create a comprehensive summary on {input_prompt} using the provided document as a source. 
Your goal is to present the material in an engaging and informative way, starting with a brief overview of the main themes. 
Then, provide detailed insights into each topic. Use clear language, and emphasize key points with appropriate punctuation and symbols. 
Ensure a smooth flow of information, making it easy for listeners to follow. 
Focus on conveying the content clearly and fully, without referencing external sources.
Use a formal language. 
"""

# Generate content based on the provided document text and the prompt
response = model.generate_content([textDocument, final_prompt])

if not hasattr(response, 'text') or response.text is None:
    print("generate_content failed or returned no text.")
    exit(1)

text_output =  response.text

# Modify the file name to indicate it's a summarized version and save as JSON
out_path = sourceFile.split(".")
out_path[-2] = out_path[-2] + "-sum"
out_path[-1] = "txt"
out_path = ".".join(out_path)

# Write the summary output to the new TXT file
with open(out_path, "w",encoding="utf-8") as file:
    file.write(text_output)

# Print the path of the output summary file
print(out_path)
