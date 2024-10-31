Sport appointment App

 This application connects individuals and organizations to find times for playing sports together. Whether you’re a company or an individual player, Sportista provides a platform to enhance your sporting experience.
Features

    User Roles: Join as a player or a company and discover opportunities to play.
    Full CRUD Admin Panel: Administrators can manage users, teams, and fields with ease.
    Field Listings: Browse available sports fields and view their locations on an integrated map using a mapping API.
    Teams and Members: View teams and their members, with filtering options available for easy navigation.
    Event Management:
        Scheduled Events: View completed events on your user profile and leave reviews.
        Join Events: Explore available events to join and create new ones.
        Team Creation: Create teams and add players easily.
    User Profile: Access and edit your personal information, upload a profile picture, and manage your activities.
    Company Profiles: Companies can publish their branding images and connect with players.

Getting Started

To get started with the Sportista application, follow these steps:

   Clone the Repository:


    git clone https://github.com/AldinKajmovic/sport-appointments.git
    cd sport-appointments

Install Dependencies:

    cd app
    npm install
    cd api
    pip install -r requirements.txt

Set Up Environment Variables: Create a .env file in the root directory and add your configuration settings.

Run the Application:

    cd api
    fastapi dev main.py
    cd app
    npm run dev


Please note that the project is not 100% complete.
