const Anthropic = require('@anthropic-ai/sdk');

class AnthropicLLM {
  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async ask(messages, tools) {
    const response = await this.anthropic.messages.create({
      model: "claude-3-opus-20240229",
      messages: messages,
      max_tokens: 1000,
      temperature: 0,
      tools: tools
    });

    return response;
  }
}

module.exports = AnthropicLLM;
