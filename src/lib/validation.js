import { z } from 'zod';

// Birthday wish form validation schema
export const wishSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(250, 'Message must be less than 250 characters')
    .refine(
      (msg) => msg.trim().length >= 10,
      'Message must contain at least 10 meaningful characters'
    ),
});

