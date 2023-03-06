//This file creates a severless, backend function that securely calls OpenAI.
import { Configuration, OpenAIApi } from 'openai';


//We're using OpanAI JS library to setup the API easily. But you'll see here we need a process.env.OPEN_API_KEY.
//This will come from our .env file (without this, people can copy and paste your API key from GitHub once you push the code)
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = "Write me a response as if you are my ex-boyfriend or ex-girlfriend who still loves me. Don't say my name. Me:";

const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)
  
  //Use the createCompletion endpoint that has different options
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.8,
    max_tokens: 500,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
  
};


export default generateAction;