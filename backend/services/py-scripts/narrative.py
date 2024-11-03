import argparse  # Library for parsing command-line arguments
import google.generativeai as genai  # Google Generative AI library for generating content

# Set up argument parser with description
parser = argparse.ArgumentParser(description="Generate a narrative from the provided text")

# Add argument for TXT file path
parser.add_argument("json_file", type=str)
# Parse command-line arguments and store in `args`
args = parser.parse_args()

# Retrieve the TXT file path from command-line arguments
sourceFile = args.json_file

    # Open the TXT file and load the content as a Python dictionary
with open(sourceFile, 'r', encoding='utf-8') as file:
    textDocument = file.read()

# Configure the Generative AI model with the API key (best practice: replace with environment variable in production)
genai.configure(api_key="AIzaSyDqC5cme1DLiVksst_l5KDWOJ8o842Gj_I")
model = genai.GenerativeModel(model_name="gemini-1.5-flash")

# Define the prompt to create a detailed educational narrative from the text content
final_prompt = """Create a detailed educational narrative that explains the information provided. 
Incorporate various teaching methods such as examples, analogies, and visual aids to enhance understanding. 
Cover key concepts, essential details, and relevant background information in a structured manner. 
Use clear, accessible language appropriate for the audience's level of understanding. 
Ensure a logical flow of information, with clear transitions between sections. 
Include real-world applications or case studies to illustrate key points. 
Encourage critical thinking by posing questions or prompts for reflection throughout the narrative. 
Conclude with a summary of the main points to reinforce learning."""

#final_prompt = "Create a detailed educational narrative that explains the information provided."

# Generate the narrative based on the document's text and the prompt
response = model.generate_content([textDocument, final_prompt])

if not hasattr(response, 'text') or response.text is None:
    print("generate_content failed or returned no text.")
    exit(1)

text_output =  response.text

# Modify the output file name to indicate it's a narrative version and save as TXT
out_path = sourceFile.split(".")
out_path[-2] = out_path[-2] + "-nar"
out_path[-1] = "txt"
out_path = ".".join(out_path)

# Write the summary output to the new TXT file
with open(out_path, "w") as file:
    file.write(f"{sourceFile}\n")
    file.write(text_output)
# Print the path of the output TXT file
print(out_path)
