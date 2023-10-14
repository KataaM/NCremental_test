const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

const OpenAI = require("openai");
require("dotenv").config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// The Json schema that will be used to retrieve chatGpt generation
const jsonSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      description: "Descriptive title of the destination",
    },
    description: {
      type: "string",
      description: "Descriptive description the destination",
    },
    rental_properties: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "The attractive name of the rental property.",
          },
          rate: {
            type: "number",
            description:
              "The rate or rating of the rental property (e.g., out of 5).",
          },
          price_per_night: {
            type: "number",
            description: "The price per night for renting the property.",
          },
          available_dates: {
            type: "array",
            items: {
              type: "string",
              format: "date",
              description: "Dates when the property is available for rent.",
            },
          },
        },
        required: ["name", "rate", "price_per_night", "available_dates"],
      },
    },
  },
};

// This function is used to call the chatGPT API and return in a json format the title and the description of our destination.
let getDestinationContent = async (touristicDestination) => {
  try {
    const contentMessage = `May you describe ${touristicDestination} with : -a title.\
    The title will be used for SEO and should be generated to match the Search engine title restrictions.\
     - a description. The description should be generated for the specific touristic destination \
     Also  you could fill the rental_properties array with generated rental properties : attractive name, rate number out of 5 (generally close to 5), price per night, and available dates (2024)`;

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: contentMessage,
        },
      ],

      functions: [{ name: "set_description", parameters: jsonSchema }],
      function_call: { name: "set_description" },
    });

    const generatedText =
      chatCompletion.choices[0].message.function_call.arguments;

    const jsonObj = JSON.parse(generatedText);

    return jsonObj;
  } catch (err) {
    if (err.response) {
      console.log(err.response.status);
      console.log(err.response.data);
    } else {
      console.log(err.message);
    }
  }
};

app.listen(port, () => {
  console.log(`NCremental app listening on port ${port}`);
});

// Route that responds with "hello NCremental"
app.get("/", (req, res) => {
  res.send("Hello Ncremental!");
});

app.get("*", (req, res) => {
  const requestedDestination = req.url.slice(1); // Remove the leading slash
  console.log(`Received a request for URL: ${requestedDestination}`);

  // Call getDestinationContent and handle the response
  getDestinationContent(requestedDestination)
    .then((destinationContent) => {
      // Send the content back as a JSON response
      res.json(destinationContent);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});
