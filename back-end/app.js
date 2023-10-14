const express = require("express");
const app = express();
const port = 3000;

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
  },
};

// This function is used to call the chatGPT API and return in a json format the title and the description of our destination.
let getDestinationContent = async (touristicDestination) => {
  try {
    const contentMessage = `May you describe ${touristicDestination} with : -a title.\
    The title will be used for SEO and should be generated to match the Search engine title restrictions.\
     - a description. The description should be generated for the specific touristic destination and should advertise the available rental properties.!`;

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
