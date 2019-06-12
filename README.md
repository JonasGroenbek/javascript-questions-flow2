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
    PM2 does this out of the box, and it has watch options to include should you want to restart on specific file-change.
* ##### Ensure that you Node-process restarts after a server (Ubuntu) restart
    PM2 can be given a "startup hook" specified in their documentation
    ```Bash
    sudo su -c env PATH=$PATH:/home/unitech/.nvm/versions/node/v4.3/bin pm2 startup <distribution> -u <user> --hp <home-path>
    ```
* ##### Ensure that you can take advantage of a multi-core system
    You can ensure to take advantage of multiple cores with cluster.js. You can run more than one server on a nginx-reverse proxy as a load balancer.
* ##### Ensure that you can run “many” node-applications on a single droplet on the same port (80)
    The following use-cases can be done with a process manager.
    Node-processes can be run as a service with PM2. PM2 will handle restarting your node application should it fail. You can also create a startup script running the node server as a service on startup. 

### Explain the difference between “Debug outputs” and application logging. What’s wrong with console.log(..) statements in our backend-code.

The problem with using console.log is that the output cannot easily be disabled when deployed to a production environment. Since console.log is a blocking call, the impact on the performance of the application will suffer.
Debug output is like an augmented version of console.log, but unlike console.log, you don’t have to comment out debug logs in production code. Logging is turned off by default and can be conditionally turned on by using the DEBUG environment variable.

The debug package exposes a function that can be used to print debugging messages.
```js
const a = require('debug')('a') // Creates a debug function with the name a
const c = require('debug')('c') // Creates a debug function with the name c

a('Printed by a')
b('Printed by b')
c('Printed by c')
```
If you then run the script with 
```bash
    DEBUG=a node file.js
 ```
 the a debug statements will be printed

These messages can easily be enabled or disabled based on the DEBUG environment variable.

Furthermore console.log in client side can pose some security risks. It is expensive CPU wise to console.log() inside of loops as well.

### Demonstrate a system using application logging and “coloured” debug statements.

Done under the debugging folder

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

Sessions have information stored on the server, and gives the client a token to retrieve their rightful session. This means that the data relevant for the functioning of the 
application is stored on the server.

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

legal implications must be according to the GDPR, using cookies must inform users. Furthermore if you store any permanent data. The users have to be informed.

It is a legal requirement for websites to comply with countries governing privacy laws. Cookies are downloaded and stored to your computer when you visit a website. It allows a website to store data locally on a clients machine for faster processing, rather then downloading it each and every-time the website is viewed or loaded.

### Compare the express strategy toward (server side) templating with the one you used with Java on second semester.
A template engine enables you to use dynamic template files in your application. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client. This approach makes it easier to design dynamic HTML content.
In second semester, we used servlets. We wrote HTML as strings, from the servlets HTTP methods equivalent response objects PrintWriter. This is highly prone to error, since dynamic use is fragile and escaping the strings each time variables needs to be represented are needed. 
Later on we used JSP files, which syntax wise is highly comparable to EJS. JSP is the default template engine of Tomcat, in express you have to declare which engine you are using.
In our fourth semester we have been introduced to two template engines, pug and ejs. I personally chose to use EJS, so I will use that as my baseline. 

### Demonstrate a simple Server Side Rendering example using a technology of your own choice (pug, EJS, ..).
This is demonstrated in the templating folder

### Explain, using relevant examples, your strategy for implementing a REST-API with Node/Express and show how you can "test" all the four CRUD operations programmatically using, for example, the Request package.
The project can be found at ![CRUD-aoo](/restCrudTemplate/test) The assertions are made using the chai testing framework. The requests to the server are made using the chai-http library. The tests are run using the mocha library, using the npm test script.
```js
chai.request(app)
  .get('/')
```
When passing an app to request; it will automatically open the server for incoming requests (by calling listen()) and, once a request has been made the server will automatically shut down (by calling .close()). If you want to keep the server open, perhaps if you’re making multiple requests, you must call .keepOpen() after .request(), and manually close the server down:

cp - 28j!
mongo "mongodb+srv://gettingstarted-upvoz.mongodb.net/test" --username jonasgroenbek
 Copy -!

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
* Used asynchronous functions exclusively to improve performance
* Used nginx as a reverse proxy
* Used a process manager to handle crashes
* Used up to date packages
* Hashing passwords
* Use a cloud-based solution to handle my databse - they handle security to some extend
* Use TLS

This is my config file for nginx

```
server {
  root /var/www/jonasgroenbek.com/build;
  index index.html;
  server_name jonasgroenbek.com  www.jonasgroenbek.com;
  location / {
    try_files $uri $uri/ /index.html  $uri/ =404;
  }
    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/jonasgroenbek.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/jonasgroenbek.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

    location /play {
            rewrite /play/(.*)  /$1 break;
            proxy_pass http://localhost:1234;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
}
```

# NoSQL, MongoDB and Mongoose

### Explain, generally, what is meant by a NoSQL database.
A NoSQL database stands for not only SQL, and refers to non-relational databases. This means that NoSQL databases does not have to be anything alike each other.
he term NoSQL encompasses a large number of different database approaches. The one common component, is that they all differ from relational databases. We have previously used MongoDB which stores data in documents in key-value pairs in a JSON like format instead of the SQL table, rows and columns approach. 

>[Relational databases] organizes data into one or more tables (or "relations") of columns and rows, with a unique key identifying each row. Rows are also called records or tuples. > Columns are also called attributes. Generally, each table/relation represents one "entity type" (such as customer or product). The rows represent instances of that type of entity (such > as "Lee" or "chair") and the columns representing values attributed to that instance (such as address or price).

### Explain Pros & Cons in using a NoSQL database like MongoDB as your data store, compared to a traditional Relational SQL Database like MySQL.
MongoDB is a schemaless database, that means that a MongoDB collection which is roughly the equivalent of a table in MySQL has no strict schema.
This has the pro of eliminating empty columns but introduces the con of inconsistency. If not scaled correctly it can become unreliable.

Pros
* Flexible Data Model. Unlike relational databases, NoSQL databases easily store and combine any type of data, both structured and unstructured. You can also dynamically update the schema to evolve with changing requirements and without any interruption or downtime to your application.
* Elastic Scalability. NoSQL databases scale out on low cost, commodity hardware, allowing for almost unlimited growth.
* Simplicity. NoSQL databases may be more simple to get up and running.
Cons
* With a NoSQL datastore, you have to code the integrity mechanisms into your application. As a rule, they’re simple key=value stores; nothing in the way the data is structured or stored imposes any logical consistency (across tables).


### Explain reasons to add a layer like Mongoose, on top on of a schema-less database like MongoDB
Even though a schema-less database could have some advantages, most projects benifit from the data validation and integrity that comes with having a schema. As a developer, you still retain the benifits of a schema-less database, since mongoose schema valition can be applied to a subset of all your Models.

Mongoose provides all the simple datatypes defined in ECMAScript, along with validation of sub-documents. Mongoose also provides static methods for querying the models.

```js
Model.deleteMany()
Model.deleteOne()
Model.find()
Model.findById()
Model.findByIdAndDelete()
Model.findByIdAndRemove()
Model.findByIdAndUpdate()
Model.findOne()
Model.findOneAndDelete()
Model.findOneAndRemove()
Model.findOneAndUpdate()
Model.replaceOne()
Model.updateMany()
Model.updateOne()
```

### Explain about indexes in MongoDB, how to create them, and demonstrate how you have used them.
Indexing in monbodb means to index certain data for faster search times. 
> Indexes support the efficient execution of queries in MongoDB. Without indexes, MongoDB must perform a collection scan, i.e. scan every document in a collection, to select those documents that match the query statement. If an appropriate index exists for a query, MongoDB can use the index to limit the number of documents it must inspect.

There are various types of indexes that can be applied:

* Single Field indexes are applied to a single field on some document.
* Compound indexes are applied to multiple fields at the same time. An example of usage could be uniqueness accross multiple fields.
* Multikey indexes are applies to array values in documents. Applying an index to Person.address of type [String] would mean that an index is created for all the addresses.

### Explain, using your own code examples, how you have used some of MongoDB's "special" indexes like TTL and 2dsphere
Denormalization is when you edit content of a database to not be the best practise, but makes sense in your use-case. 
* ttl index expires documents after a certain amount of seconds.

Demonstration of Thomas implementation of ttl
```js
const SECONDS = 1;
const EXPIRES = 60 * SECONDS;

export const UserPositionSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    created: {type: Date, expires: EXPIRES, default: Date.now},
    position: ...
});
```

>Using mongoose, i defined a Schema to represent the position of a user. I added the expires property to the created field of the Schema. The value of the expires property is the number of seconds the document lives for (60).

The equivalent index could be added using plain Mongo like so:
```
db.userPositions.createIndex( 
    { "created": 1 }, 
    { expireAfterSeconds: EXPIRES })
```

* 2dsphere is an index converts the data to GeoJSON Point.

>A 2dsphere index supports queries that calculate geometries on an earth-like sphere. 2dsphere index supports all MongoDB geospatial queries: queries for inclusion, intersection and proximity. For more information on geospatial queries, see Geospatial Queries.

types 2dsphere supports:
* Version 2 and later 2dsphere indexes includes support for additional GeoJSON object: MultiPoint, MultiLineString, MultiPolygon, and GeometryCollection. For details on all supported GeoJSON objects, see GeoJSON Objects.

```js
export const UserPositionSchema = new Schema({
    ...
    position: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
        },
        coordinates: {
            type: [Schema.Types.Number]
        }
    }
});


UserPositionSchema.index({ position: "2dsphere" });
```

Above i used the mongoose schema definition strategy to add the 2dshere to the position field. The type of the position field matches syntax of the GeoJson Point data type.

### Demonstrate, using a REST-API you have designed, how to perform all CRUD operations on a MongoDB

I have two folders in this repo that does so, one with a frontend using server-side rendering and a stand-alone rest-api

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

When using normalization, we have to perform a JOIN to retrieve the relationship between Book and Author. This incurs a performance penalty. We could of course embed one entity into the other, but this would also come with some serious drawbacks. We can no longer effeciently perform search on the embedded document Author, since we would first need to iterate through all the parent documents (Book).

We would also have lots of duplicate data. If we embedded the Author entity inside the Book entity, we many have multiple Author records representing the same author. If we wanted to update that author, we would need to update the information in multiple Book documents.

A real example could be if the position of a Post is denormalized and the position of a User is normalized, and the positional data has been extracted out into the UserPosition collection.


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

#Explain, using a relevant example, a full JavaScript backend including relevant test cases to test the REST-API.

jonasgroenbek.com