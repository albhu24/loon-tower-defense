**Instructions for deploying locally:**

Assuming Node is installed, **npm install** first, then **npm run all** to run both server and client.
Navigate to **localhost:8080** to run app

**Discuss potential bugs or exploits with either the game mechanics or the RPC interface. How can we make it more robust? How would you improve the overall architecture?**

**Response**

Security- To enhance security, we could implement a WSS protocol which ensures encrypted communication and preventing unauthorized acceess. Additionally we could implement authentication and authorization so we can ensure that only authorized individuals may access the the services of the game.

Database - Incorporating a database for storing live game data would improve security and performance. We could use a caching database to quickly store and retrieve the game state. (loonState) We can reduce the access to the state of the game this way and additionally improve scalability and responsiveness.

Pub/Sub - Wouldve been useful here to be able to unsuscribe from state here so that they are not constantly being sent, even when we are done playing the game. Could have also used a queue here to slow down the rate at which messages were being processed. In this case, there was only one client but with mulitple clients queues can help buffer and load balance messages, making the pub/sub design more scalable.

Error Handling / Data Cleansing - Didn't get around to implementing error handling, but would be useful in a case like this where a heavy volume of messsages are being sent on both client/server side. With more development around error logs, bugs can be easier to find later in development, especially if it is something that is happening during production.
