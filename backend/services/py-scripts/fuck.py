import time
import argparse

parser = argparse.ArgumentParser(description="metni")
parser.add_argument("metin", type=str, nargs='?', default="")
args = parser.parse_args()
# 10 saniye bekle
time.sleep(3)

# "hello" yazdır
print(args.metin)
