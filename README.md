![](src/public/img/TMlogo.png)
# A task management web application
v1.2

Task Manage is a kanban board style task management app.

The app allows users to create, update and delete task cards to keep track of their projects. It has four columns indicating each stage of the current task and users can easily move cards between the columns.  
  
I built this project using ReactJS for the frontend and NodeJS/Express on the backend. Express handles the calls to the MongoDB NoSQL database. MongoDB was selected for the database due to its flexibility and ease of scaling if extra features are added in the future.  
  
After completing a React course which focused on class based components, I built an initial version of the project (code can be viewed [here](https://github.com/GregBaughDev/Task-Manage)) which incorporated a drag and drop library to allow for drag and drop functionality. After the integration of the library the initial development became a combination of class and functional based components. Attempting to integrate user data into the application became increasingly difficult. Returning to the drawing board, I completed another React course which taught functional components. With the changes in React moving towards functional based components and hooks, I've now rebuilt the app integrating functional components and hooks. Utilising only functional components has definitely made the development process easier and kept the codebase consistent.

For future versions of the app, users will be able to customise columns in the app and store these to the database for persistence.

I've used the [Hauora](https://github.com/WCYS-Co/Hauora-Sans) font family for this project.

## Technologies used
HTML, React, Node, MongoDB, Styled Components, Figma

#### Deployed project
The project is available [here](https://taskmanage2.herokuapp.com/)

#### Test login user details
Username: testuser   
Login: test1234

#### Licence
MIT License
Copyright (c) 2021 Greg Baugh

##### In Progress 
* Editing columns
* Update styles so scolling works on x & y axis  
* Delete all cards in deleted column  
* Load individual user cards and column  
* Refactor, check current functions and add comments
* Update errors for DB disconnection

###### Future Developments
Version 2  
* Change 'user' to select menu - Select from currently registered users  
