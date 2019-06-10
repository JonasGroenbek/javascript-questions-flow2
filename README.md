### Why would you consider a Scripting Language as JavaScript as your Backend Platform?
Scripting languages like PHP, JavaScript, Python or Ruby often allow for faster development. These languages are often more expressive and therefore allow for more features and functionality using fewer lines of code. On top of that these languages are interpreted rather than compiled, which means no building process. This can be especially important when using server-side rendering. Buidling each time when fiddling with minor changes can be really time-consuming.

I would consider JavaScript as my backend because the codebase of my web-application would remain mostly JavaScript. That is good for many reasons
like:

* It is easier to maintain in the long-term 
* Should a team work on the webapp, then the developers would not attain areas according to their language repertoire
* Connection between the frontend and backend has less abstraction

JavaScript being a scripting language, comes with the downside of being interpreted rather than compiled. This is usually the slower of the two, however will probably be faster in development due to not needing to compile and redeploy after every change.

### Explain Pros & Cons in using Node.js + Express to implement your Backend compared to a strategy using, for example, Java/JAX-RS/Tomcat

* JavaScript - Node.js & express
    * Pros
        * Frontend & Backend has same codebase
        * Fast development, especially with libraries like nodemon.
     * Cons
        * Generally speaking slower
* Java - JAX-RS & apache tomcat
    * Pros
        * Generally speaking faster
    * Cons
        * Codebase in different languages
        * Time consuming development

### Node.js uses a Single Threaded Non-blocking strategy to handle asynchronous task. Explain strategies to implement a Node.js based server architecture that still could take advantage of a multi-core Server.
Usually Node.js applications only run on a single core. We can take advantage of more cores by using the cluster application programming interface. The cluster API is imported using import 'cluster' or require('cluster')
cluster.js gives you the ability to spawn workers acting like multiple applications running the same time. 
The cluster API works by creating new processes using the cluster.fork function. These new processes then compete for incomming requests.
This obviously introduces performance enhancement but also stability. Should your server die on what without cluster.js would be a single application it would simply die. Or have to close and open the whole backend. However with Cluster.js this downtime would be taken care of by one of the workers handled by cluster.js.

### Explain briefly how to deploy a Node/Express application including how to solve the following deployment problems:
* ##### Ensure that you Node-process restarts after a (potential) exception that closed the application
* ##### Ensure that you Node-process restarts after a server (Ubuntu) restart
* ##### Ensure that you can take advantage of a multi-core system
* ##### Ensure that you can run “many” node-applications on a single droplet on the same port (80)
The following use-cases can be done with a process manager.
Node-processes can be run as a service with PM2. PM2 will handle restarting your node application should it fail. You can also create a startup script running the node server as a service on startup. 
You can ensure to take advantage of multiple cores with cluster.js. You can run more than one server on a nginx-reverse proxy as a load balancer.
Explain the difference between “Debug outputs” and application logging. What’s wrong with console.log(..) statements in our backend-code.
Debug output is like an augmented version of console.log, but unlike console.log, you don’t have to comment out debug logs in production code. Logging is turned off by default and can be conditionally turned on by using the DEBUG environment variable.

### Explain the difference between “Debug outputs” and application logging. What’s wrong with console.log(..) statements in our backend-code.

The problem with using console.log is that the output cannot easily be disabled when deployed to a production environment. Since console.log is a blocking call, the impact on the performance of the application will suffer.

The debug package exposes a function that can be used to print debugging messages.
```js
const a = require('debug')('a') // Creates a debug function with the name a
const b = require('debug')('b') // Creates a debug function with the name b
const c = require('debug')('c') // Creates a debug function with the name c

a('Printed by a')
b('Printed by b')
c('Printed by c')

const a = require('debug')('name:a') //activates A
```

These messages can easily be enabled or disabled based on the DEBUG environment variable.

### Demonstrate a system using application logging and “coloured” debug statements.

TODO

### Explain, using relevant examples, concepts related to testing a REST-API using Node/JavaScript + relevant packages 
Concepts specifically relevant for testing a REST-API would be;
* Asynchronous testing is relevant because HTTP methods are asynchronous.
* Mocking might also become relevant. For having reliable test-data to consent independent tests. 

I can showcase this in a personal project.

### Explain, using relevant examples, the Express concept; middleware.
Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

The express concept middleware is used for modules to extend the functionality of the express server. 
Popular express middleware examples would be:
* body-parser
* cors
* debug

### Explain, using relevant examples, how to implement sessions and the legal implications of doing this.

Sessions can easily be implemented using the express-session middleware. This middleware adds a cookie to the response. This cookie contains the session-id of the user. A session property is then added to the request object provided to the express middleware and routes.

```js
const express = require('express')
const session = require('express-session')
const app = express()

app.use(session({secret: '|^3x"<EP65z+(lK`Q\ECuGre'})) // apply the session middleware to the entire apps

app.get('/', function(req, res) {
    if(!req.session.visits)
        req.session.visits = 1
    else
        req.session.visits++;

    res.send(`Numbers of visits: ${req.session.visits}`);
})
```

The session middleware has multiple strategies for session storage. The default strategy is MemoryStorage, however the developers state that:

Warning The default server-side session storage, `MemoryStore, is purposely not designed for a production environment. It will leak memory under most conditions, does not scale past a single process, and is meant for debugging and developing.

### Compare the express strategy toward (server side) templating with the one you used with Java on second semester.
A template engine enables you to use dynamic template files in your application. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client. This approach makes it easier to design dynamic HTML content.
In second semester, we used servlets. We wrote HTML as strings, from the servlets HTTP methods equivalent response objects PrintWriter. This is highly prone to error, since dynamic use is fragile and escaping the strings each time variables needs to be represented are needed. 
Later on we used JSP files, which syntax wise is highly comparable to EJS. JSP is the default template engine of Tomcat, in express you have to declare which engine you are using.
In our fourth semester we have been introduced to two template engines, pug and ejs. I personally chose to use EJS, so I will use that as my baseline. 

### Demonstrate a simple Server Side Rendering example using a technology of your own choice (pug, EJS, ..).
This is demonstrated in the templating folder

### Explain, using relevant examples, your strategy for implementing a REST-API with Node/Express and show how you can "test" all the four CRUD operations programmatically using, for example, the Request package.
The project can be found at rest-api-test-example. The assertions are made using the chai testing framework. The requests to the server are made using the chai-http library. The tests are run using the mocha library, using the npm test script.

### Explain, using relevant examples, about testing JavaScript code, relevant packages (Mocha etc.) and how to test asynchronous code.
Testing code is always important when developing software. But one could argue that testing JavaScript is even more useful than testing statically types languages like Java or C#.
Since there is a lot of errors to be found which type-safety solves. One could argue that JavaScripts conversion of types is quirky and could need extensive testing.

chai-http extension to chai is good for testing HTTP processes. Since it gives the request object to chai. 

```js
chai.request(server) // The server is an instance of HttpServer
    .get('/url') // There are functions for the other HTTP methods (.post, .delete, .put)
    .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res).to.be.json
    })
```

Since JavaScript focuses heavily on asynchronous code, the testing frameworks must also be designed to handle that type of code. The standard way to test asynchronous code in Mocha, is to invoke the callback provided to the before, after, it and other blocks. This function is by convention called done

### Explain, using relevant examples, different ways to mock out databases, HTTP-request etc.

Mocking is primarily used in unit testing. An object under test may have dependencies on other (complex) objects. To isolate the behavior of the object you want to replace the other objects by mocks that simulate the behavior of the real objects. This is useful if the real objects are impractical to incorporate into the unit test.

In short, mocking is creating objects that simulate the behavior of real objects.

Below is an example of a process that could be mocked. The reason being is that Webscraper is dependent of external information, that could change and falsely crash the test.
```js 
// WebScaper.js
class WebScraper {
    
    constructor(fetcher) {
        this.fetcher = fetcher
    }

    async scrape(url) {
        const response = this.fetcher(url)
        return response.text.substring(5)
    }
}

const instance = new WebScraper(fetch) // fetch from node-fetch
```
to be able to rely on the returned value we mock the webscraper 
```js
// Create our mock
function createMockFetch(text) {
    return () => text
}

const testInstance = new WebScraper(createMockFetch('Hello World')) // provide our mock, instead of the real fetch function
const result = testInstance.scrape()
expect(result).to.be.eql('Hello')
```


### Explain, preferably using an example, how you have deployed your node/Express applications, and which of the Express Production best practices you have followed.
Previously I have used nginx as a reverse proxy and node.js for my backend. Express has listed all of the best practices for production here
https://expressjs.com/en/advanced/best-practice-performance.html. I have done the following
* Used asynchronous functions exclusively.
* Used a reverse-proxy
* Used PM2 for auto-restart should the server crash

# NoSQL, MongoDB and Mongoose

### Explain, generally, what is meant by a NoSQL database.
A NoSQL database stands for not only SQL, and refers to non-relational databases. This means that NoSQL databases does not have to be anything alike. We have previously used MongoDB which stores data in documents in key-value pairs in a JSON like format instead of the SQL table, row and
columns approach. 

### Explain Pros & Cons in using a NoSQL database like MongoDB as your data store, compared to a traditional Relational SQL Database like MySQL.
MongoDB is a schemaless database, that means that a MongoDB collection which is roughly the equivalent of a table in MySQL has no strict schema.
This has the pro of eliminating empty columns but introduces the con of inconsistency. If not scaled correctly it can become unreliable.c 


### Explain reasons to add a layer like Mongoose, on top on of a schema-less database like MongoDB
An application can benefit from the reliability of the data-validation a schema layer like mongoose gives.

### Explain about indexes in MongoDB, how to create them, and demonstrate how you have used them.
Indexing in monbodb means to index certain data for faster search times. If not done, a query might end up scanning the whole collection for a single document.

### Explain, using your own code examples, how you have used some of MongoDB's "special" indexes like TTL and 2dsphere
Denormalization is when you edit content of a database to not be the best practise, but makes sense in your use-case. 
* 2dsphere is an index converts the data to GeoJSON Point.
* ttl index expires documents after a certain amount of seconds.

### Demonstrate, using a REST-API you have designed, how to perform all CRUD operations on a MongoDB
I have designed a rest api and with all four crud operations it is in mongodb/crud and mongodb/restApi folders

### Explain the benefits of using Mongoose, and demonstrate, using your own code, an example involving all CRUD operations
The benefits of using mongoose is that it has schemas, validation and instance methods which i demonstrate together with CRUD operations together with a rest api in the mongodb


### Explain the “6 Rules of Thumb: Your Guide Through the Rainbow” as to how and when you would use normalization vs. denormalization.
src: https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-3
>
One: favor embedding unless there is a compelling reason not to
Two: needing to access an object on its own is a compelling reason not to embed it
Three: Arrays should not grow without bound. If there are more than a couple of hundred documents on the “many” side, don’t embed them; if there are more than a few thousand documents on the “many” side, don’t use an array of ObjectID references. High-cardinality arrays are a compelling reason not to embed.
Four: Don’t be afraid of application-level joins: if you index correctly and use the projection specifier (as shown in part 2) then application-level joins are barely more expensive than server-side joins in a relational database.
Five: Consider the write/read ratio when denormalizing. A field that will mostly be read and only seldom updated is a good candidate for denormalization: if you denormalize a field that is updated frequently then the extra work of finding and updating all the instances is likely to overwhelm the savings that you get from denormalizing.
Six: As always with MongoDB, how you model your data depends – entirely – on your particular application’s data access patterns. You want to structure your data to match the ways that your application queries and updates it.
>
### Demonstrate, using your own code-samples, decisions you have made regarding → normalization vs denormalization 'Consider the following model:

```
collection
    document

houses
    adress
inhabitants
    name
```

where there is a many to many relationship between Book and Author.
When using normalization, we have to perform a JOIN to retrieve the relationship between houses and inhabitants. This slows down the application. We could of course embed one entity into the other, but this would also come with some serious drawbacks. We can no longer effeciently perform search on the embedded document, since we would first need to iterate through all the parent documents.

We would also have lots of duplicate data. If we embedded the inhabitants entity inside the houses entity, we many have multiple inhabitants records representing the same inhabitant. If we wanted to update that inhabitant, we would need to update the information in multiple houses documents.

The tradeoff between embedding and not embedding is fast read vs fast write.