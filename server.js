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

app.get('/app/flip/', (req, res) => {
  result = coinFlip()

  dict = {"flip": result}
  // dictJSON = JSON.stringify(dict)

  res.json(dict)
})

app.get('/app/flips/:number', (req, res) => {
	const flips = coinFlips(req.params.number)

  results = countFlips(flips)

  dict = {"raw": flips, "summary": results}

  res.json(dict)
});

app.get('/app/flip/call/heads', (req, res) => {
  result = coinFlip()

  victory = "lose"

  if(result == "heads"){
    victory = "win"
  }

  res.json({"call": "heads", "flip": result, "result": victory})
})

app.get('/app/flip/call/tails', (req, res) => {
  result = coinFlip()

  victory = "lose"

  if(result == "tails"){
    victory = "win"
  }

  res.json({"call": "tails", "flip": result, "result": victory})
})

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
