# BTK-Hackathon-BSB_team

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
   node index.js
   ```
3. **Frontend setup**
   ```bash
   cd client
   npm install
   npm run start
   ```
