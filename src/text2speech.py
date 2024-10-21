# Dependencies gTTS (Google Text-to-Speech) !pip install gtts langdetect
from gtts import gTTS
from langdetect import detect
import convertions

class text2speech:
    def __init__ (self, file_path_, name="output", destination_path=""):
        self._file_path = file_path_
        self.name = name
        self.destination_path = destination_path
        
    def _extract_text (self):
        self._row_text = convertions.convert2txt(self._file_path)

    def summarise (self):
        # Unprepared Gemini part yet! Just tried manually ## TODO 
        self.sum_text = self._row_text
        
    def say (self):
        self._detected_language = detect(self._row_text)
        self.voice = gTTS(text=self._row_text, lang=self._detected_language)
        
    def save (self):
        out_file_name = self.name+".mp3"
        self.voice.save(self.destination_path+out_file_name)    
        print("Speech saved as", out_file_name)
