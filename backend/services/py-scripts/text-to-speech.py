import os
from gtts import gTTS
import argparse  # Library for parsing command-line arguments

# Set up argument parser with a description for the script
parser = argparse.ArgumentParser(description="Summarize the given text file")

# Add positional argument for TXT file path and an optional argument for context
parser.add_argument("txt_file", type=str)

# Parse command-line arguments and store them in `args`
args = parser.parse_args()

sourceFile = args.txt_file  # Path to the input TXT file

# Open the TXT file and load the content as a Python dictionary
with open(sourceFile, 'r', encoding='utf-8') as file:
# Extract the main text content to be summarized from the TXT
    textDocument = file.read()

out_path = sourceFile.split(".")
out_path[-2] = out_path[-2] + "-sound"
out_path[-1] = "mp3"
out_path = ".".join(out_path)

tts = gTTS(textDocument)
tts.save(out_path)

# Print the path of the output summary file
print(out_path)
