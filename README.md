# Slot Savant

Slot Savant is a Vehicle Movement Analysis System designed to manage and analyze the entry and exit of vehicles in a parking lot. Utilizing Automatic Number Plate Recognition (ANPR) technology, it identifies and records vehicle license plates, monitors real-time parking slot availability, and provides detailed insights to administrators about parking lot usage.

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Closing](#closing)

## Project Description

Slot Savant is a comprehensive system designed to streamline the management of parking lots. It uses advanced ANPR technology to detect and record the entry and exit of vehicles, manage real-time parking slot availability, and provide administrators with valuable insights into parking lot usage. The system verifies vehicle registration against a database to ensure authorized access and maintains logs of all vehicle movements.

## Features

- **Automatic Number Plate Recognition (ANPR)**: Detect and recognize vehicle license plates.
- **Real-Time Parking Slot Availability**: Monitor and display the status of each parking slot.
- **Entry and Exit Logs**: Maintain detailed logs of vehicle movements in the parking lot.
- **Vehicle Registration Verification**: Verify if a vehicle is registered in the database before allowing entry.
- **Parking Lot Insights**: Provide administrators with specific insights into parking lot usage.
- **User Authentication**: Ensure secure access to the system for administrators.

## Technologies Used

- **MongoDB**: Database for storing vehicle and parking lot information.
- **Express.js**: Backend server for handling API requests.
- **React**: Frontend for the user interface.
- **Node.js**: Runtime for the backend server.
- **Python**: ANPR and data processing, parking space analysis.
- **OpenCV**: Image processing for license plate recognition.

## Installation

1. Clone the repository.

```sh
git clone "https://github.com/ShreedharJoshi31/slot-savant.git"
```

2. Navigate to the `slot-savant/src` directory.

## Usage

1. Run the backend development server.

```sh
cd backend
npm i
npm run dev
```

2. Run the frontend development server.

```sh
cd frontend
npm i
npm run start
```

3. Activate the Python virtual environment and run the ANPR module.

```sh
python -m venv ./env
env\Scripts\activate.bat
pip install -r requirements.txt
python app.py
```

## Configuration

Before running the application, set up the following environment variables in a `.env` file:

- **PORT**: The port on which the server will run.
- **MONGO_URI**: The URI for your MongoDB database.
- **JWT_SECRET_KEY**: A secret key used for JWT token generation and authentication.

Example of a `.env` file:

```sh
MONGO_URI=YOUR_MONGODB_URI
PORT=PORT
SECRET_KEY=YOUR_SECRET_KEY
```

## Closing

Slot Savant, a comprehensive solution for managing and analyzing vehicle movements in parking lots. We hope you find this system effective and useful in optimizing your parking lot operations. If you have any questions, encounter issues, or wish to contribute to the project, please don't hesitate to get in touch. Your feedback and involvement are highly valued as we continue to improve and expand Slot Savant. Enjoy efficient parking management with Slot Savant!
