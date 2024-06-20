const Anthropic = require('@anthropic-ai/sdk');

class AnthropicLLM {
  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async ask(messages, tools, { system = undefined } = {}) {
    console.log('Getting response for messages: ', messages, tools);
    const response = await this.anthropic.messages.create({
      model: "claude-3-opus-20240229",
      messages,
      tools,
      system,
      max_tokens: 1000,
      temperature: 0,
    });
    console.log('LLM response: ', response);

    return response;
  }
}

module.exports = AnthropicLLM;
