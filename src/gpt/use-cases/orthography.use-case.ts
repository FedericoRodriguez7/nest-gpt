import OpenAI from 'openai';

interface Options {
  prompt: string;
}


export const orthographyCheckUseCase = async (openai: OpenAI, options: Options) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `...` // omitido por brevedad
      },
      {
        role: 'user',
        content: prompt,
      }
    ],
    model: "gpt-3.5-turbo-1106",
    temperature: 0.3,
    max_tokens: 150,
    response_format: {
      type: 'json_object'
    }
  });

  const content = completion.choices[0].message.content;

  if (content === null) {
    return { ok: false };
  }

  try {
    const jsonResp = JSON.parse(content);
    return {
      ok: true,
      ...jsonResp // debe contener userScore, errors, message
    };
  } catch (error) {
    return { ok: false };
  }
};
