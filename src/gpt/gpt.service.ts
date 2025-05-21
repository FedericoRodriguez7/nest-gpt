import { Injectable, InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';
import { OrthographyDto } from './dtos';

@Injectable()
export class GptService {

  constructor(
    // Si usás inyección, aquí va OpenAI, sino instancia en el método
  ) {}

  async orthographyCheck(dto: OrthographyDto) {
    try {
      // Aquí va la llamada real a OpenAI
      // Por ejemplo:
      /*
      const openai = new OpenAI();
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: 'system', content: '...' },
          { role: 'user', content: dto.prompt }
        ],
      });
      return JSON.parse(completion.choices[0].message.content);
      */

      // MOCK: respuesta simulada
      return {
        ok: true,
        userScore: 100,
        errors: [],
        message: "🎉 ¡Perfecto! No se encontraron errores en tu texto."
      };

    } catch (error) {
      if (error.code === 'insufficient_quota' || error.status === 429) {
        // Respuesta mock cuando la cuota se agotó
        return {
          ok: true,
          userScore: 90,
          errors: ['No se pudo verificar con OpenAI por cuota agotada. Este es un resultado simulado.'],
          message: "⚠️ Hemos usado una respuesta simulada porque tu cuota de OpenAI se agotó."
        };
      }
      console.error(error);
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }
}
