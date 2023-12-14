**Instructions for deploying locally:**

Assuming Node is installed, **npm install** first, then **npm run all** to run both server and client.
Navigate to **localhost:8080** to run app

**Discuss potential bugs or exploits with either the game mechanics or the RPC interface. How can we make it more robust? How would you improve the overall architecture?**

**Response**

**Security**

To further enhance security, we could implement a WSS protocol which ensures encrypted communication and preventing unauthorized acceess. Other security protocols we could implement include rate limiting and traffic shaping where we can prevent DDOS attacks or unintentional overloading of the server.

Although much of the concern is towards server side on security, we can also implement client side security where we safeguard against attacks such as data leaks, injection attacks, and robust client logic.

**State Management**

Incorporating a database for storing live game data would improve security and performance. On the server side, we could implement a caching database to quickly store and retrieve the game state. The implementation of database may also reduce the access to the state of the game this way and therefore improving security. Similarly, on the front-end side we can utilize a state management tool like Redux so we can store and manage our state in a organized and efficient way. State management and synchronization proves to be challenging in this assignment. With increased scale, this will become an even larger issue to tackle, but we could use techniques such as optimistic updates to help with this.

**Pub/Sub**

Wouldve been useful here to be able to unsuscribe from state here so that they are not constantly being sent, even when we are done playing the game. Could have also used a queue here to slow down the rate at which messages were being processed. In this case, there was only one client but with mulitple clients queues can help buffer and load balance messages, making the pub/sub design more scalable.

**Error Handling / Data Cleansing**

Didn't get around to implementing robust error handling, but would be useful in a case like this where a heavy volume of messsages are being sent on both client/server side. With more development around error logs, bugs can be easier to find throughout development, especially if it is something that is happening during production.
