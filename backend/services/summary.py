import argparse
import PyPDF2

import google.generativeai as genai
genai.configure(api_key="AIzaSyDqC5cme1DLiVksst_l5KDWOJ8o842Gj_I")

parser = argparse.ArgumentParser(description="PDF dosyasını özetle")

parser.add_argument("file_path", type=str)
parser.add_argument("context", type=str, nargs='?', default="")
args = parser.parse_args()


file = args.pdf_file
input_prompt = args.context


if (len(input_prompt)<1):
    input_prompt = "All File"

def extract_text_from_pdf(pdf_path):
    """
    convert pdf to text 
    """
    with open(pdf_path, 'rb') as pdf_file:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        extracted_text = ""
        for page in pdf_reader.pages:
            text = page.extract_text()
            if text:
                extracted_text += text
        return extracted_text

sample_file = extract_text_from_pdf(file)

model = genai.GenerativeModel(model_name="gemini-1.5-flash")




final_prompt =f"Create a lecture note summary on {input_prompt}. Use the given document as a source."


response = model.generate_content([sample_file ,final_prompt])
#Summarize the text in about 400 words in the given context : Algorithms : file 

print(response.text)