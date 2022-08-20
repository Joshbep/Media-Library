> The Home of Stories

## Project Description
A database/library for personal media, such as books, movies, and possibly shows. This is a place to store your favorite books, movies, and shows. Now when someone asks you for a recommendation you have it all in one place. 
> Models including field names and their datatypes<br />
I am assuming I will have to have multiple models. One for the author or director. One for the books, one for the movies, and one for the shows. <br />

Author
- Name: string, required <br />
Books
- title: string, required
- description: String
- publish date: date
-page count: number
https://thecodebarbarian.com/an-overview-of-buffers-in-node-js.html#:~:text=MongoDB%20actually%20stores%20buffers%20in,js%20buffer.
-cover image: buffer, required
author: pull from author schema
Books
- title: string, required
- description: String
- publish date: date
-page count: number
https://thecodebarbarian.com/an-overview-of-buffers-in-node-js.html#:~:text=MongoDB%20actually%20stores%20buffers%20in,js%20buffer.
-cover image: buffer, required
author: pull from author schema <br />
Movies
- title: string, required
- description: String
- release date: date
-Movie length: number
-cover image: buffer, required
Director: pull from director schema <br />
Show
- title: string, required
- description: String
-cover image: buffer, required
Created by: pull from director schema <br />
> A list of routes (e.g. `POST /pins/ allows users to post a picture of a pin`)<br />

## Wireframes
> Each page on the bottom shows multiple views
wireframe: https://lucid.app/lucidchart/6084ccc3-baf2-49ac-bfa8-fc3f95b35fe2/edit?viewport_loc=-262%2C4%2C1667%2C867%2C0_0&invitationId=inv_4733e417-0a3d-4929-8891-a1c88cd4c478#


## User Stories
> User stories detailing app functionality<br />
- As a user, I want to be able to create a book and add the things listed above, so they will show up on the show page
- As a user, I want to be able to create a movie and add the things listed above, so they will show up on the show page
- As a user, I want to be able to edit an entry, so I can change the value to be updated.
- As a user, I want to be able to delete an entry, so I can correct any incorrect entry.

### MVP Goals
- Working MEN stack application
- CRUD app with MVC structure
- One model with all 7 RESTful routes and full CRUD.
- Be deployed online and accessible to the public via Heroku
- The app can show books and movies entered

### Stretch Goals
- Style to look like a professional app
-Add it to where you can add shows as well
- Include sign-up/log-in functionality, with encrypted passwords & an authorization flow
- Add a second model that will make the app entries exclusive to each user only.
- Use EJS Partials
-Add sorting by most recently added
