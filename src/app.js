const express = require("express");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
const axios = require("axios");
const app = express();
const port = 8080;
const router = express.Router();

app.use(bodyParser.json());

const p2gScoreWidgets = {
  1: `<g><path stroke="hsl(100, 50%, 50%)" stroke-width="16" fill="none" d="M 10.055626315603554 37.021286236252195 A 42 42 0 0 0 13.626933041053576 71"></path><path stroke="hsl(100, 50%, 50%)" stroke-width="16" fill="none" d="M 32.917060990816395 11.631090779010762 A 42 42 0 0 0 10.532909926991849 35.63515398032192"></path><path stroke="hsl(100, 50%, 50%)" stroke-width="16" fill="none" d="M 67.08293900918362 11.63109077901077 A 42 42 0 0 0 34.26652307653168 11.058278108194934"></path><path stroke="hsl(100, 50%, 50%)" stroke-width="16" fill="none" d="M 89.94437368439645 37.0212862362522 A 42 42 0 0 0 68.41158816514125 12.250650055434981"></path><path stroke="hsl(100, 50%, 50%)" stroke-width="16" fill="none" d="M 86.37306695894644 70.99999999999997 A 42 42 0 0 0 90.3729912294094 38.42323105568601"></path></g><g transform="translate(50, 36)"><text fill="hsl(200, 20%, 20%)" text-anchor="middle" font-size="12">P2G</text></g><g transform="translate(50, 62)"><text fill="hsl(200, 20%, 20%)" text-anchor="middle" font-size="24">1 | 3</text></g><g transform="translate(0, 75)"><g><rect fill="none" stroke="none" x="0" y="0" width="100" height="25"></rect></g><g transform="translate(50, 12.5)"><text fill="hsl(200, 20%, 20%)" text-anchor="middle" font-size="14">Excellent</text></g></g>`,
  2: `<g><path stroke="hsl(80, 50%, 50%)" stroke-width="16" fill="none" d="M 10.055626315603554 37.021286236252195 A 42 42 0 0 0 13.626933041053576 71"></path><path stroke="hsl(80, 50%, 50%)" stroke-width="16" fill="none" d="M 32.917060990816395 11.631090779010762 A 42 42 0 0 0 10.532909926991849 35.63515398032192"></path><path stroke="hsl(80, 50%, 50%)" stroke-width="16" fill="none" d="M 67.08293900918362 11.63109077901077 A 42 42 0 0 0 34.26652307653168 11.058278108194934"></path><path stroke="hsl(80, 50%, 50%)" stroke-width="16" fill="none" d="M 89.94437368439645 37.0212862362522 A 42 42 0 0 0 68.41158816514125 12.250650055434981"></path><path stroke="hsl(0, 0%, 92%)" stroke-width="16" fill="none" d="M 86.37306695894644 70.99999999999997 A 42 42 0 0 0 90.3729912294094 38.42323105568601"></path></g><g transform="translate(50, 36)"><text fill="hsl(200, 20%, 20%)" text-anchor="middle" font-size="12">P2G</text></g><g transform="translate(50, 62)"><text fill="hsl(200, 20%, 20%)" text-anchor="middle" font-size="24">2 | 2</text></g><g transform="translate(0, 75)"><g><rect fill="none" stroke="none" x="0" y="0" width="100" height="25"></rect></g><g transform="translate(50, 12.5)"><text fill="hsl(200, 20%, 20%)" text-anchor="middle" font-size="14">Above Avg</text></g></g>`,
  3: `<g><path stroke="hsl(50, 70%, 50%)" stroke-width="16" fill="none" d="M 10.055626315603554 37.021286236252195 A 42 42 0 0 0 13.626933041053576 71"></path><path stroke="hsl(50, 70%, 50%)" stroke-width="16" fill="none" d="M 32.917060990816395 11.631090779010762 A 42 42 0 0 0 10.532909926991849 35.63515398032192"></path><path stroke="hsl(50, 70%, 50%)" stroke-width="16" fill="none" d="M 67.08293900918362 11.63109077901077 A 42 42 0 0 0 34.26652307653168 11.058278108194934"></path><path stroke="hsl(0, 0%, 92%)" stroke-width="16" fill="none" d="M 89.94437368439645 37.0212862362522 A 42 42 0 0 0 68.41158816514125 12.250650055434981"></path><path stroke="hsl(0, 0%, 92%)" stroke-width="16" fill="none" d="M 86.37306695894644 70.99999999999997 A 42 42 0 0 0 90.3729912294094 38.42323105568601"></path></g><g transform="translate(50, 36)"><text fill="hsl(200, 20%, 20%)" text-anchor="middle" font-size="12">P2G</text></g><g transform="translate(50, 62)"><text fill="hsl(200, 20%, 20%)" text-anchor="middle" font-size="24">3 | 1</text></g><g transform="translate(0, 75)"><g><rect fill="none" stroke="none" x="0" y="0" width="100" height="25"></rect></g><g transform="translate(50, 12.5)"><text fill="hsl(200, 20%, 20%)" text-anchor="middle" font-size="14">Average</text></g></g>`,
  4: `<g><path stroke="hsl(40, 80%, 50%)" stroke-width="16" fill="none" d="M 10.055626315603554 37.021286236252195 A 42 42 0 0 0 13.626933041053576 71"></path><path stroke="hsl(40, 80%, 50%)" stroke-width="16" fill="none" d="M 32.917060990816395 11.631090779010762 A 42 42 0 0 0 10.532909926991849 35.63515398032192"></path><path stroke="hsl(0, 0%, 92%)" stroke-width="16" fill="none" d="M 67.08293900918362 11.63109077901077 A 42 42 0 0 0 34.26652307653168 11.058278108194934"></path><path stroke="hsl(0, 0%, 92%)" stroke-width="16" fill="none" d="M 89.94437368439645 37.0212862362522 A 42 42 0 0 0 68.41158816514125 12.250650055434981"></path><path stroke="hsl(0, 0%, 92%)" stroke-width="16" fill="none" d="M 86.37306695894644 70.99999999999997 A 42 42 0 0 0 90.3729912294094 38.42323105568601"></path></g><g transform="translate(50, 36)"><text fill="hsl(200, 20%, 20%)" text-anchor="middle" font-size="12">P2G</text></g><g transform="translate(50, 62)"><text fill="hsl(200, 20%, 20%)" text-anchor="middle" font-size="24">4 | 1</text></g><g transform="translate(0, 75)"><g><rect fill="none" stroke="none" x="0" y="0" width="100" height="25"></rect></g><g transform="translate(50, 12.5)"><text fill="hsl(200, 20%, 20%)" text-anchor="middle" font-size="14">Fair</text></g></g>`,
  5: `<g><path stroke="hsl(20, 70%, 55%)" stroke-width="16" fill="none" d="M 10.055626315603554 37.021286236252195 A 42 42 0 0 0 13.626933041053576 71"></path><path stroke="hsl(0, 0%, 92%)" stroke-width="16" fill="none" d="M 32.917060990816395 11.631090779010762 A 42 42 0 0 0 10.532909926991849 35.63515398032192"></path><path stroke="hsl(0, 0%, 92%)" stroke-width="16" fill="none" d="M 67.08293900918362 11.63109077901077 A 42 42 0 0 0 34.26652307653168 11.058278108194934"></path><path stroke="hsl(0, 0%, 92%)" stroke-width="16" fill="none" d="M 89.94437368439645 37.0212862362522 A 42 42 0 0 0 68.41158816514125 12.250650055434981"></path><path stroke="hsl(0, 0%, 92%)" stroke-width="16" fill="none" d="M 86.37306695894644 70.99999999999997 A 42 42 0 0 0 90.3729912294094 38.42323105568601"></path></g><g transform="translate(50, 36)"><text fill="hsl(200, 20%, 20%)" text-anchor="middle" font-size="12">P2G</text></g><g transform="translate(50, 62)"><text fill="hsl(200, 20%, 20%)" text-anchor="middle" font-size="24">5 | 0</text></g><g transform="translate(0, 75)"><g><rect fill="none" stroke="none" x="0" y="0" width="100" height="25"></rect></g><g transform="translate(50, 12.5)"><text fill="hsl(200, 20%, 20%)" text-anchor="middle" font-size="14">Unmatched</text></g></g>`,
};
/*
//create a server object:
http
  .createServer(function (req, res) {
    console.log(req);
    res.setHeader("Content-Type", "image/svg+xml");
    res.write(""); //write a response to the client
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080
*/

const svgStart = `<svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 100 100" style="background: transparent; font-family: 'Roboto', sans-serif;">`;
const svgEnd = `</svg>`;

router.get("/", (req, res) => {
  const { p2g } = req.query;
  const p2gScoreWidgetSVG = p2gScoreWidgets[p2g];
  if (p2gScoreWidgetSVG) {
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svgStart + p2gScoreWidgetSVG + svgEnd);
  } else {
    res.send(
      "Please provide a P2G score from 1 to 5 as request query parameter e.g. https://<base_url>/?p2g=2"
    );
  }
});

router.get("/alerts", (req, res) => {
  const url =
    "https://hooks.slack.com/services/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";
  axios
    .post(url, {
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text:
              "Dean Jones - 1234 Park Ave, New York, NY 10035 \nNet Worth increased from $29MM to $35MM (up 20%)\n\n<https://example.com|View notification>",
          },
        },
        {
          type: "image",
          block_id: "image4",
          image_url: "http://placekitten.com/500/500",
          alt_text: "An incredibly cute kitten.",
        },
      ],
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
  res.end();
});

// Mount the router on the app
app.use("/.netlify/functions/app", router);

module.exports = app;
module.exports.handler = serverless(app);
