const minimist = require("minimist");
const express = require("express");
const app = express();

const args = minimist(process.argv.slice(2));
const port = args.port || 5000;

//Start an app server
const server = app.listen(port, () => {
  console.log("App listening on port %PORT%".replace("%PORT%", port));
});

app.get('/app/', (req, res) => {
  // Respond with status 200
  res.statusCode = 200;
  // Respond with status message "OK"
  res.statusMessage = "OK";
  res.writeHead(res.statusCode, { "Content-Type": "text/plain" });
  res.end(res.statusCode + " " + res.statusMessage);
});

app.get('/app/flips/:number', (req, res) => {
	const flips = manyflips(req.params.number)
    
});

// Default response for any other request
app.use(function (req, res) {
    res.status(404).send("404 NOT FOUND");
  });

//Coin flip functions

function coinFlip() {
  return Math.floor(Math.random() * 2) == 0 ? "heads" : "tails";
}

function coinFlips(flips) {
  const results = [];

  for (let i = 0; i < flips; i++) {
    results[i] = Math.floor(Math.random() * 2) == 0 ? "heads" : "tails";
  }

  return results;
}

function countFlips(array) {
  let head = 0;
  let tail = 0;

  for (let i = 0; i < array.length; i++) {
    if (array[i] == "heads") {
      head++;
    }
    if (array[i] == "tails") {
      tail++;
    }
  }

  if (head == 0) {
    return { tails: tail };
  } else if (tail == 0) {
    return { heads: head };
  }

  return { heads: head, tails: tail };
}

function flipACoin(call) {
  let result = Math.floor(Math.random() * 2) == 0 ? "heads" : "tails";

  if (call == result) {
    return "win";
  } else {
    return "lose";
  }
}
