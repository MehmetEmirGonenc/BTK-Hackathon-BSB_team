# Notperver

![Notperver Proje Görseli](path/to/your/image.jpg)  <!-- Burada resmin yolu belirtin -->

Notperver, kullanıcıların kendi sağladıkları dökümanlar üzerinden eğitim ve öğrenme süreçlerini desteklemeyi amaçlayan bir web uygulamasıdır. Şu anda PDF ve PPTX formatındaki belgeleri destekleyen platform, gelecekte daha fazla formatın eklenmesiyle gelişmeyi hedeflemektedir.

## Ana Özellikler:

- **Not Çıkarma:** Kullanıcılar, yükledikleri dökümanlardan seçtikleri bir bölüm veya tamamı hakkında not çıkarabilirler. Bu özellik, belge içeriğinin daha iyi anlaşılmasını sağlarken, öğrenme sürecine katkıda bulunur.

- **Değerlendirme Sınavı Oluşturma:** Kullanıcılar, belirledikleri bir bölüm veya belgenin tamamı için değerlendirme sınavı oluşturma imkanı bulurlar. Bu, öğrenilen bilgilerin pekiştirilmesine yardımcı olur.

- **Sesli Anlatım:** Kullanıcılar, özetledikleri konuları ses formatında anlatma seçeneğine sahiptir. Bu özellik, özellikle işitme engelli bireyler için erişilebilirlik sunarken, öğrenme stillerini çeşitlendirir.

Notperver, bu özellikleri ile eğitim alanında önemli bir araç olmayı hedeflemektedir. Uygulamamız, kullanıcıların kendi bilgilerini daha etkin bir şekilde yönetmelerine ve paylaşmalarına olanak tanır.

## Ekip Üyeleri:

Projemizi dört arkadaş olarak geliştiriyoruz. Ekip üyelerinin görev dağılımı ve GitHub hesapları aşağıda belirtilmiştir:

- **Mehmet Emir Gönenc** - Proje Yöneticisi | [GitHub](https://github.com/MehmetEmirGonenc)
- **Ahmet Yılmaz** - Backend Geliştirici | [GitHub](https://github.com/AhmetYilmaz)
- **Ayşe Demir** - Frontend Geliştirici | [GitHub](https://github.com/AyseDemir)
- **Zeynep Çelik** - İçerik Yöneticisi | [GitHub](https://github.com/ZeynepCelik)

## Teknolojik Altyapı:

Notperver, modern web teknolojileri kullanılarak geliştirilmiştir. Frontend kısmı React ile, backend kısmı ise Express.js ile inşa edilmiştir. Uygulama, kullanıcı dostu bir arayüz ile etkili bir kullanıcı deneyimi sunmayı hedeflemektedir.

### Node.js Ortamının Kurulumu:

1. **Node.js İndir:** Node.js’in en son sürümünü [Node.js resmi web sitesinden](https://nodejs.org/) indirip kurun.

2. **Proje Klasörüne Git:** Terminal veya komut istemcisine giderek proje dizinine geçin:
   ```bash
   cd /path/to/your/project
   ```

3. **Bağımlılıkları Yükle:** Projenin kök dizininde (client ve backend dizinlerinin bulunduğu yerde) aşağıdaki komutları çalıştırarak gerekli bağımlılıkları yükleyin:
   ```bash
   cd backend
   npm install
   cd ../client
   npm install
   ```

### Projeyi Başlatma:

1. **Backend Sunucusunu Çalıştır:** `backend` dizininde terminal açarak sunucuyu başlatın:
   ```bash
   cd backend
   npm run start
   ```

2. **Frontend Uygulamasını Çalıştır:** Başka bir terminal penceresi açarak `client` dizininde aşağıdaki komutu çalıştırın:
   ```bash
   cd client
   npm run start
   ```

3. **Tarayıcıda Açın:** Her iki sunucu da çalışmaya başladıktan sonra, tarayıcınızı açarak `http://localhost:3000` adresine gidin ve uygulamanızı görüntüleyin.

## Python Gereksinimleri:

Projemiz için gerekli Python kütüphaneleri `py_requirements.txt` dosyasında belirtilmiştir. Aşağıda kütüphanelerin listesi bulunmaktadır:

```
PyPDF2>=3.0.0
python-pptx>=0.6.21
google-generativeai>=0.1.0
gtts>=2.2.3
```

Bu kütüphaneleri yüklemek için terminalde aşağıdaki komutu çalıştırabilirsiniz:

```bash
pip install -r py_requirements.txt
```

## Proje Geliştirme Süreci:

Proje, BTK 2024 Hackathon'u için geliştirilmiş olup, sadece iki haftada tamamlanmıştır. Bu süreçte ekip olarak kullanıcı geri bildirimlerine dayalı yenilikçi çözümler sunmayı ve sürekli gelişim hedefini ön planda tutmayı amaçladık. Ekip içindeki iş birliği ve hızlı geri dönüşlerle, uygulamanın temel özelliklerini başarıyla entegre ettik.

### BTK-Hackathon-BSB_team

This repository was created for developing an application about education on BTK 2024 Hackathon.

# Text to Speech App

This project is a **Text to Speech** web application built using React (frontend) and Express.js (backend). The app allows users to upload text files (PDF, PPTX, TXT) and convert the text content into speech.

## Project Structure

- `backend/`: Contains the Express.js server setup.

  - `index.js`: Main server file.
  - `multer.js`: Handles file upload using Multer.

- `client/`: Contains the React application.

  - `src/`: Main source code for the frontend.
  - `public/`: Public assets for the frontend.

- `Samples/`: Directory for storing sample files.

  - `pdf_samples/`: Example PDF files.
  - `pptx_samples/`: Example PowerPoint (PPTX) files.
  - `txt_samples/`: Example text files.

- `src/`: Contains Python scripts for file conversions.
  - `conversions.py`: Handles file format conversions.
  - `text2speech.py`: Converts text into speech using a text-to-speech engine.

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- Node.js
- Python 3.x (for handling conversions)
- pip (Python package manager)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MehmetEmirGonenc/BTK-Hackathon-BSB_team.git
   cd BTK-Hackathon-BSB_team
   ```

2. **Backend setup**
   ```bash
   cd backend
   npm install
   ```
3. **Backend setup**
   ```bash
   cd backend
   npm install
   node index.js
   ```
4. **Frontend setup**
   ```bash
   cd client
   npm install
   npm run start
   ```
