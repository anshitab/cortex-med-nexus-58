import { useState, useCallback, useRef } from "react";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isError?: boolean;
}

const SYSTEM_PROMPT = `You are the CORTEX Assistant, a professional AI representative for CORTEX Medical Inc., a pharmaceutical B2B company based in Katha-Baddi, Himachal Pradesh, India.

About CORTEX Medical Inc.:
- Specializes in contract pharmaceutical manufacturing with 600+ formulations
- Therapeutic areas: Anti-diabetic, Antibiotic, Analgesic, Antihypertensive, Lipid-lowering medications
- Services: Contract Manufacturing, Formulation Development, Quality Assurance (QA), Regulatory Support
- Certifications: Schedule-M GMP (Good Manufacturing Practice) and GLP (Good Laboratory Practice) compliant
- Location: Katha-Baddi, Himachal Pradesh, India — a major pharmaceutical hub

Your role:
- Answer questions about products, formulations, therapeutic categories, and manufacturing capabilities
- Explain services like contract manufacturing and formulation development
- Highlight certifications and quality standards
- Help qualify B2B leads and guide potential partners toward consultation
- Keep responses professional, concise, and limited to 2-4 sentences
- For complex inquiries or partnership discussions, encourage users to contact CORTEX directly or request a consultation

Always maintain a professional, knowledgeable, and helpful tone appropriate for pharmaceutical B2B interactions.`;

const makeGreeting = (): ChatMessage => ({
  id: "greeting",
  role: "assistant",
  content:
    "Hello! I'm the CORTEX Assistant. I can help you learn about our pharmaceutical manufacturing capabilities, 600+ formulations, certifications, and B2B partnership opportunities. How can I assist you today?",
  timestamp: new Date(),
});

export function useGroqChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([makeGreeting()]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  const sendMessage = useCallback(async (userInput: string) => {
    const trimmed = userInput.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    // Build API history from current messages + new user message
    const currentMessages = messagesRef.current;
    const apiMessages = [...currentMessages, userMessage]
      .filter((m) => !m.isError && m.id !== "greeting")
      .map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;

      if (!apiKey) {
        throw new Error("VITE_GROQ_API_KEY is not set in .env");
      }

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            max_tokens: 512,
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...apiMessages,
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Groq API error:", response.status, errorBody);
        throw new Error(`API error ${response.status}: ${errorBody}`);
      }

      const data = await response.json();
      const assistantContent: string =
        data.choices?.[0]?.message?.content ??
        "I'm sorry, I couldn't process that request.";

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: assistantContent,
          timestamp: new Date(),
        },
      ]);
    } catch (err) {
      console.error("useGroqChat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "I'm sorry, I'm having trouble connecting right now. Please try again in a moment or contact us directly for assistance.",
          timestamp: new Date(),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([makeGreeting()]);
  }, []);

  return { messages, isLoading, sendMessage, clearMessages };
}
