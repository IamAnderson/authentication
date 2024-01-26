import { z } from "zod";
import { SettingsSchema } from "@/schemas";

export const settings = async (
  values: z.infer<typeof SettingsSchema>,
  callbackUrl?: string | null
) => {};
