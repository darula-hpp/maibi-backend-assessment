/**
*@swagger
*components:
*   schemas:
*       UserRegistration:
*           type: object
*           required:
*               -name
*               -surname
*               -email
*               -password
*               -phone
*               -gender
*           properties:
*               name:
*                   type: string
*                   description: valid name of the user
*               surname:
*                   type: string
*                   description: valid surname of the user
*               email:
*                   type: string
*                   description: valid email address of the user
*               password:
*                   type: string
*               phone:
*                   type: string
*               gender:
*                   type: string
*       UserLogIn:
*           type: object
*           required:
*               -email
*               -password
*           properties:
*               email:
*                   type: string
*               password:
*                   type: string
*       UpdateUser:
*           type: object
*           required:
*               -name
*               -surname
*               -email
*               -phone
*               -gender
*           properties:
*               name:
*                   type: string
*                   description: valid name of the user
*               surname:
*                   type: string
*                   description: valid surname of the user
*               email:
*                   type: string
*                   description: valid email address of the user
*               phone:
*                   type: string
*               gender:
*                   type: string  
*       storySchema:
*           type: object
*           required:
*               -storyTitle
*               -storyBody
*               -userId
*           properties:
*               storyTitle:
*                   type: string
*               storyBody:
*                   type: string  
*               userId:
*                   type: string 
*       UpdatestorySchema:
*           type: object
*           required:
*               -storyTitle
*               -storyBody
*           properties:
*               storyTitle:
*                   type: string
*               storyBody:
*                   type: string  
*/

/**
*@swagger
* tags:
*   name: User
*   description: API to manage Users(note that only registration and login endpoints are not protected).
*/

/**
*@swagger
* tags:
*   name: Stories
*   description: API to manage all posted stories.(all endpoints are protected, authorize by token you get from login)
*/
//user end points
/**
* @swagger
* /user/register/:
*     post:
*       summary: Allows User create new accounts
*       tags: [User]
*       requestBody:
*         required: true
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/UserRegistration'
*       responses:
*         "200":
*           description: The new account was succefully created.     
*/

/**
*@swagger
* /user/login/:
*     post:
*       summary: Allows User to log in to the system(returned token is used to authorize access to other endpoints)
*       tags: [User]
*       requestBody:
*         required: true
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/UserLogIn'
*       responses:
*         "200":
*           description: Login successful.     
*/

/** 
*@swagger
* /user/getUserById/{id}:
*     get:
*       summary: Gets the info of the user based on their ID,(useful when user wants to view profile)
*       tags: [User]
*       parameters:
*       -   in: path
*           name: id
*           schema:
*               type: string
*           required: true
*           description: user ID of a specific your
*       responses:
*         "200":
*           description: profile info retreived successfully.     
*/

/** 
*@swagger
* /user/deleteUserById/{id}:
*     delete:
*       summary: Deletes the user based on their ID,(useful when user wants to remove account)
*       tags: [User]
*       parameters:
*       -   in: path
*           name: id
*           schema:
*               type: string
*           required: true
*           description: user ID of a specific your
*       responses:
*         "200":
*           description: user successfully deleted.     
*/

/**
* @swagger
* /user/updateUser/{id}:
*     put:
*       summary: Allows User update their profile info
*       tags: [User]
*       requestBody:
*         required: true
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/UpdateUser'
*       parameters:
*       -   in: path
*           name: id
*           schema:
*               type: string
*           required: true
*           description: user ID of a specific your
*       responses:
*         "200":
*           description: The profile info was successfully updated     
*/

/**
* @swagger
* /user/getAllUsers/:
*     get:
*       summary: Gets all registered users in the system
*       tags: [User]
*       responses:
*         "200":
*           description: Succefully retrieved all users.     
*/
//story endpoints
/**
* @swagger
* /story/post/:
*     post:
*       summary: Allows User to post a story
*       tags: [Stories]
*       requestBody:
*         required: true
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/storySchema'
*       responses:
*         "200":
*           description: The new story was successfully added.     
*/

/** 
*@swagger
* /story/getStoryById/{id}:
*     get:
*       summary: Gets the story by ID,(useful when user wants to read whole story)
*       tags: [Stories]
*       parameters:
*       -   in: path
*           name: id
*           schema:
*               type: string
*           required: true
*           description: story ID 
*       responses:
*         "200":
*           description: story successfully retreived.     
*/

/** 
*@swagger
* /story/deleteStoryById/{id}:
*     delete:
*       summary: Deletes the story by ID
*       tags: [Stories]
*       parameters:
*       -   in: path
*           name: id
*           schema:
*               type: string
*           required: true
*           description: story ID 
*       responses:
*         "200":
*           description: story successfully deleted.     
*/

/**
* @swagger
* /story/updateStory/{id}:
*     put:
*       summary: Allows User update/edit the story
*       tags: [Stories]
*       requestBody:
*         required: true
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/UpdatestorySchema'
*       parameters:
*       -   in: path
*           name: id
*           schema:
*               type: string
*           required: true
*           description: enter story id here
*       responses:
*         "200":
*           description: The story was successfully updated.     
*/
/**
* @swagger
* /story/getAllStories/:
*     get:
*       summary: Gets all posted stories
*       tags: [Stories] 
*       responses:
*         "200":
*           description: All stories retreived    
*/