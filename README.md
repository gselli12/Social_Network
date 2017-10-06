# Pokenetwork

## Summary:
A social network for Pokémon – the fastest way to catch them all.

Hosted on [Heroku](https://pokenetwork.herokuapp.com/welcome#/) (using the free Heroku plan, so it might take a few seconds to load)


## Tech Stack:
* React.js and Redux
* Node.js & Express.js
* PostgreSQL database
* AWS S3 for image storing
* socket.io

##Features:
* Registration and login for new users (passwords are hashed and salted).
* Users can upload profile pictures and change their bio's (which can only be seen by friends)
* Users can befriend, unfriend and refriend each other.
* Users can chat with each other in real time.
![Pokenetwork Chat GIF](https://github.com/gselli12/social_network/blob/master/Images/gifChat.gif)
* Users can see other users that are currently online.
* Friends can post on each others walls (if links are posted, these links are crawled of tags and displayed as a summary of the content)
![Pokenetwork Wallpost GIF](https://github.com/gselli12/social_network/blob/master/Images/gifWallposts.gif)
* Users can search for other users registered.
![Pokenetwork User Search GIF](https://github.com/gselli12/social_network/blob/master/Images/gifSearch.gif)
