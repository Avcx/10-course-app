# School Course App

This administrative for keeping track of courses in a database. Allowing users to view, create, edit and delete courses in the database.
Modification actions are restircted to registered users and courses can only be modified by their creator.
The client uses React for UI in conjuction with React-Router-DOm for routing. While the api uses Express for authentication, database maangement and serving dynamic data to the client.

## Installation Instructions

1. Download the project files.

2. Make sure port 3000 and 5000 are available.

3. Open the terminal in the '/api' folder and run:

   ``` zsh
   npm i
   ```

   This will install Express and the other required modules.
   After these install, run:

   ``` zsh
   npm run
   ```

   This will get the server up and running, ready to server respond to the client's requests.

4. Next, open another terminal in the '/client' folder and run:

   ``` zsh
   npm i
   ```

   This will install React along with the other required modules.
   After these install, run:

   ``` zsh
   npm run
   ```

   This will start the client-side of the application allowing for easier interaction with the server api.
   Additionally, it will automatically open a new browser tab and navigate to the main index page ready to go!

5. You're all set! After the browser tab opens, everything is ready to go!
