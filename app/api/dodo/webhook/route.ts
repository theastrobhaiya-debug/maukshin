import { Webhooks } from "@dodopayments/nextjs";

export const POST = Webhooks({
  webhookKey: process.env.DODO_WEBHOOK_SECRET!,

  onPayload: async (payload) => {
    console.log("Dodo webhook received:", payload);
  },
});