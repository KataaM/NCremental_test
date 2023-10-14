const express = require("express");
const app = express();
const port = 3000;

const OpenAI = require("openai");
require("dotenv").config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const jsonSchema = {
  title: "string",
  description: "string",
};

let APIcall = async (touristicDestination) => {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content:
            'May you describe Montreal with : -a title.\
       The title will be used for SEO and should be generated to match the Search engine title restrictions.\
        - a description. The description should be generated for the specific touristic destination and should advertise the available rental properties.! \
        Also, could you format it in a json way like { title : "", description : ""}',
        },
      ],
    });

    const output_text = chatCompletion.choices[0].message;

    console.log(output_text);
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

app.get("*", (req, res) => {
  const requestedURL = req.url;
  console.log(`Received a request for URL: ${requestedURL}`);

  APIcall();

  res.send(`${requestedURL}`);
});
