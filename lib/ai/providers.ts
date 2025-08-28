// providers/myProvider.ts
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';
import { isTestEnvironment } from '../constants';

// Instantiate OpenRouter (reads key from env)
const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
  // Optional but recommended: identify your app & site for OpenRouter analytics/rate benefits
  // See https://openrouter.ai/docs#request-headers
  headers: {
    ...(process.env.OPENROUTER_SITE_URL
      ? { 'HTTP-Referer': process.env.OPENROUTER_SITE_URL }
      : {}),
    ...(process.env.OPENROUTER_APP_NAME
      ? { 'X-Title': process.env.OPENROUTER_APP_NAME }
      : {}),
  },
});

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel
      },
    })
  : customProvider({
      languageModels: {
        // General chat model - GLM-4.5-Air
        'chat-model': openrouter.chat('z-ai/glm-4.5-air:free'),

        // Reasoning model - DeepSeek-R1
        'chat-model-reasoning': wrapLanguageModel({
          model: openrouter.chat('deepseek/deepseek-r1-0528:free'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        // Lightweight/cheap titling model
        'title-model': openrouter.chat('qwen/qwen3-coder:free'),

        // Artifact/content model (choose what fits your use case best)
        'artifact-model': openrouter.chat('z-ai/glm-4.5-air:free')
      }
    });
