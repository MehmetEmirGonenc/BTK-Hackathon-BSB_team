# Dependencies gTTS (Google Text-to-Speech) !pip install gtts langdetect
from gtts import gTTS
from langdetect import detect

class text2speech:
    def __init__ (self, text, name="output", destination_path=""):
        self._row_text = text
        self.name = name
        self.destination_path = destination_path
        
    def _say (self):
        self._detected_language = detect(self._row_text)
        self.voice = gTTS(text=self._row_text, lang=self._detected_language)
        
    def _save (self):
        out_file_name = self.name+".mp3"
        self.voice.save(self.destination_path+out_file_name)    
        print("Speech saved as", out_file_name)
        
    def text2speech(self):
        self._say()
        self._save()
