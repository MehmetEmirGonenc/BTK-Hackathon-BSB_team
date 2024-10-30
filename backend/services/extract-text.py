import argparse
import PyPDF2
import json

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

parser = argparse.ArgumentParser(description="extract  text from given sourceFile")
parser.add_argument("file_path", type=str)
args = parser.parse_args()

sourceFile = args.file_path

out_path = sourceFile.split(".")
file_type =  out_path[-1]
out_path[-1] = "json"
out_path = ".".join(out_path)


text_output = ""

if file_type == "pdf":
    text_output = extract_text_from_pdf(sourceFile)

veri = {
    "source":sourceFile,
    "text":text_output,
}

with open(out_path, 'w') as f:
    json.dump(veri, f, ensure_ascii=False, indent=4)

print(out_path)
