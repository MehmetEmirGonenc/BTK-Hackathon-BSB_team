import argparse
import json
import google.generativeai as genai

parser = argparse.ArgumentParser(description="PDF dosyasını özetle")

parser.add_argument("json_file", type=str)
parser.add_argument("context", type=str, nargs='?', default="")
args = parser.parse_args()

sourceFile = args.json_file #json
input_prompt = args.context #string

if (len(input_prompt)<1):
    input_prompt = "All File"

with open(sourceFile, 'r', encoding='utf-8') as file:
    inputVeri = json.load(file)

textDocument = inputVeri["text"]

genai.configure(api_key="AIzaSyDqC5cme1DLiVksst_l5KDWOJ8o842Gj_I")#enve bağla
model = genai.GenerativeModel(model_name="gemini-1.5-flash")

final_prompt =f"Create a lecture note summary on {input_prompt}. Use the given document as a source."

response = model.generate_content([textDocument ,final_prompt])

outputVeri = {
    "source":sourceFile,
    "context":input_prompt,
    "text": response .text,
}

out_path = sourceFile.split(".")
out_path[-2] = out_path[-2]+"-sum"
out_path[-1] = "json"
out_path = ".".join(out_path)

with open(out_path, 'w') as f:
    f.write(response.text)

with open(out_path, 'w') as f:
    json.dump(outputVeri, f, ensure_ascii=False, indent=4)

print(out_path)