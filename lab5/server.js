// TASK 1A: What does the require function do?
/**
 * A require function
 * load and cache Javascript modules.
 */
const express = require('express')  
const fs = require('fs/promises')

// TASK 1B: What are these two parameters and how do they work with express?
/**
 * These two parameters are req and res.
 * req stands for request and is an object that contains information about the HTTP request
 * res is a response and that sends back the desired HTTP response
 */
const getAllMoods = (req, res) => {
  const allMoods = Object.keys(res.app.locals.reactions);

  // TASK 1C: What does the res.status() function do? What allows this to be chained?
  /**
   * The res.status() function sets the HTTP status for the response and returns an object
   * It is chainable because of Node's response.statusCode.
   */
  res.status(200).send(allMoods);
};

const getAllGifs = (req, res) => {
  //Object.keys returns an array of a given object's own enumarable property names
  const allGifs = res.app.locals.reactions;
  //keys returns index, values returns actual value
  //can also just return object itself
  //console.log('request: ' + JSON.stringify(res.app.locals.reactions));
  //console.dir('dir: ' + res.app.locals.reactions);
  res.status(200).send(allGifs);
};

const getRandomGifByMood = (req, res) => {
  console.log('mood: ' + req.params.mood);
  let randomMood = res.app.locals.reactions[req.params.mood];

  if (!Array.isArray(randomMood)){ //if randomMood doesn't exist
  //client error
    res.sendStatus(404);
    return;
  }

  if (!randomMood.length){
  //successful but returns no content
    res.status(204);
    return;
  }

  let gifIndex = Math.floor(Math.random() * Math.floor(randomMood.length));
  console.log('object: ' + randomMood);
  let randomGif = { "gif": randomMood[gifIndex] };
  res.status(200).send(randomGif);
      
  //const a = {key: value, key1: value1} creates an object
  //= {} makes object
  //anything else {} makes scope (ie. line 20)
};

const addMood = (req, res) => {
  
  //server looks for the "mood" property on the body
  let moodSelection = req.body.mood;
  console.log(moodSelection);
  let gifObject = res.app.locals.reactions
  console.log("before change: " + gifObject)

  if (!moodSelection) {
    res.sendStatus(404);
    return;
  }

  //add new array to the res.app.locals.reactions object with a corresponding key
  gifObject[moodSelection] = []
  console.log("after change: " + gifObject)
  res.status(200).send(gifObject);
};

const addGif = (req, res) => {

  //server looks for the "link" property on the body
  let linkSelection = req.body.link;
  console.log("link: " + linkSelection);
  let moodSelection = req.params.mood;
  console.log("mood: " + moodSelection);
  let gifObject = res.app.locals.reactions
  console.log("before push: " + gifObject)

  if (!moodSelection) {
    res.sendStatus(404);
    return;
  }

  if (!linkSelection) {
    res.sendStatus(404);
    return;
  }

  gifObject[moodSelection].push(linkSelection);
  //given link is added into the corresponding array for moods
  console.log("after push: " + gifObject)
  res.status(200).send(gifObject);
};

const deleteMood = (req, res) => {
  
  //server deletes the associated mood from the res.app.locals.reactions object
  //returns the property status code
  let moodSelection = req.params.mood;
  console.log("mood: " + moodSelection);
  let gifObject = res.app.locals.reactions
  console.log("gifObject: " + JSON.stringify(gifObject));
  let arrayLink = gifObject[moodSelection];
  console.log("arrayLink: " + JSON.stringify(gifObject));

  if (!moodSelection) {
    res.sendStatus(404);
    return;
  }

  if(!Array.isArray(arrayLink)) {
    res.sendStatus(404);
    return;
  }
    
  delete gifObject[moodSelection];
  console.log("after delete: " + gifObject)
  res.status(200).send(gifObject);
};

const deleteGif = (req, res) => {

  //when a user sends a DELETE request to /gif/:moods
    //server looks for a JSON body with the "link" property
    //loops through specific mood's array and removes the link if found
    let linkSelection = req.body.link;
    console.log("link: " + linkSelection);
    let moodSelection = req.params.mood;
    console.log("mood: " + moodSelection);
    let gifObject = res.app.locals.reactions
    console.log("gifObject: " + JSON.stringify(gifObject));
    let arrayLink = gifObject[moodSelection];
    console.log("arrayLink: " + JSON.stringify(gifObject));

    if (!linkSelection) {
      res.sendStatus(404);
      return;
    }

    if (!moodSelection) {
      res.sendStatus(404);
      return;
    }

    if (!Array.isArray(arrayLink)) {
      res.sendStatus(404);
      return;
    }

    let index = 0;
    for (const link of arrayLink) {
      console.log(link)
      if (link === linkSelection) {
        arrayLink.splice(index, 1);
        console.log("updated arrayLink: " + arrayLink)
        res.status(200).send(arrayLink);
      }
    }
};

const main = () => {
  const app = express();
  const port = 3000;

  // TASK 1D: What does this line do?
  /**
   * This is a method to recognize the incoming Request Object as a JSON object.
   * The app object is instantiated as part of the Express server
   */
  app.use(express.json());

  // TASK 1E: What does this line do?
  /**
   * This routes the HTTP GET requests to the specific path with specific call back functions
   * in this case, the path is /moods
   */
  app.get("/moods", getAllMoods);
  app.get("/gifs", getAllGifs);
  app.get("/gif/:mood", getRandomGifByMood);
  app.post("/mood", addMood);
  app.post("/gif/:mood", addGif);
  app.delete("/mood/:mood", deleteMood);
  app.delete("/gif/:mood", deleteGif)

  fs.readFile("./gifs.json", "utf-8")
    .then((fileContents) => JSON.parse(fileContents))
    .then((data) => {

      // TASK 1F: What is the locals property in on the app object?
      /**
       * The locals property has local variables within the application
       */
      app.locals.reactions = data;

      // TASK 1G: What does this do?
      /**
       * This app starts a server and listens on the port we set for connections.
       * In this case, the port is 3000.
       */
      app.listen(port, () => {
        console.log(`Reaction gifs started on http://localhost:${port}`);
      });
    });
};

main();
