import argparse
import google.generativeai as genai
import os


# Komut satırı argümanlarını tanımlayın
parser = argparse.ArgumentParser(description="Ders notlarından sınav oluştur")
parser.add_argument("file", type=str, help="Kaynak dosyanın adı (JSON formatında)")
args = parser.parse_args()

sourceFile = args.file

# API anahtarını ayarla
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel(model_name="gemini-1.5-flash")

# Kaynak dosyayı oku
with open(sourceFile, 'r', encoding='utf-8') as file:
    textDocument = file.read()

# Sınav oluşturma istemini hazırla
final_prompt = """
Create a well-structured exam based on the provided lecture notes.
The exam should assess students' understanding of the key concepts, their ability to apply these concepts to new situations, and their critical thinking skills.
Create an answer key at the end.
"""

# Modelden içerik üret
response = model.generate_content([textDocument, final_prompt])

# Yanıtın doğru olup olmadığını kontrol et
if not hasattr(response, 'text') or response.text is None:
    print("generate_content başarısız oldu veya metin döndürmedi.")
    exit(1)

text_output = response.text

# Çıkış dosya adını ayarla
out_path = sourceFile.split(".")
out_path[-2] = out_path[-2] + "-exam"
out_path[-1] = "txt"
out_path = ".".join(out_path)

# Sonucu dosyaya yaz
with open(out_path, "w", encoding='utf-8') as file:
    file.write("Generated Exam:\n\n")
    file.write(text_output)

print(out_path)
