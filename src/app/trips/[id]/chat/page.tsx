"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";

import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

import {
  Bot,
  Send,
  Sparkles,
  User,
  AlertCircle,
  ArrowLeft,
  Clock3,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

const quickPrompts = [
  "Optimize my trip budget",
  "Find luxury restaurants",
  "Add adventure activities",
  "Suggest nightlife places",
  "Create rainy day backup plan",
  "Find hidden gems nearby",
];

const thinkingStages = [
  "Analyzing your itinerary...",
  "Checking nearby attractions...",
  "Optimizing travel routes...",
  "Finding the best recommendations...",
  "Generating personalized suggestions...",
];

const ChatRoom = () => {

  const params = useParams();

  const tripId =
    (params as { id?: string })?.id;

  const textareaRef =
    useRef<HTMLTextAreaElement | null>(null);

  const listRef =
    useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] =
    useState<ChatMessage[]>([]);

  const [input, setInput] = useState("");

  const [isSending, setIsSending] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);


  const [thinkingText, setThinkingText] =
    useState(thinkingStages[0]);

  const canSend = useMemo(() => {
    return Boolean(tripId) &&
      input.trim().length > 0 &&
      !isSending;
  }, [tripId, input, isSending]);

  // LOAD CHAT HISTORY
  useEffect(() => {

    if (!tripId) return;

    const saved =
      localStorage.getItem(
        `trip-chat-${tripId}`
      );

    if (saved) {
      setMessages(JSON.parse(saved));
    }

  }, [tripId]);

  // SAVE CHAT HISTORY
  useEffect(() => {

    if (!tripId) return;

    localStorage.setItem(
      `trip-chat-${tripId}`,
      JSON.stringify(messages)
    );

  }, [messages, tripId]);

  // AUTO SCROLL
  useEffect(() => {

    if (!listRef.current) return;

    listRef.current.scrollTop =
      listRef.current.scrollHeight;

  }, [messages]);

  // AUTO TEXTAREA HEIGHT
  useEffect(() => {

    if (!textareaRef.current) return;

    textareaRef.current.style.height = "0px";

    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";

  }, [input]);

  // THINKING STAGES
  useEffect(() => {

    if (!isSending) return;

    let i = 0;

    const interval = setInterval(() => {

      i =
        (i + 1) %
        thinkingStages.length;

      setThinkingText(
        thinkingStages[i]
      );

    }, 1800);

    return () => clearInterval(interval);

  }, [isSending]);

  const sendMessage = async () => {

    if (!tripId) {
      setError("Missing trip id");
      return;
    }

    const text = input.trim();

    if (!text || isSending) return;

    setError(null);

    setIsSending(true);

    setInput("");

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      role: "user",
      content: text,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    try {

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem(
            "accessToken"
          )
          : null;

      const res = await fetch(
        `/api/trips/${tripId}/chat`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            ...(token
              ? {
                Authorization:
                  `Bearer ${token}`,
              }
              : {}),
          },

          body: JSON.stringify({
            message: text,
          }),
        }
      );

      const data =
        (await res.json()) as {
          reply?: string;
          error?: string;
          message?: string;
        };

      if (!res.ok) {

        throw new Error(
          data.error ||
          data.message ||
          "Failed to send"
        );
      }

      const reply =
        data.reply ||
        "No response received.";

      const assistantMessage: ChatMessage = {
        id: `${Date.now()}-assistant`,
        role: "assistant",
        content: reply,
        createdAt:
          new Date().toISOString(),
      };

      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);

    } catch (e) {

      setError(
        e instanceof Error
          ? e.message
          : "Failed to send"
      );

    } finally {

      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#030712] text-white">

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-[-200px] left-[-120px] w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full" />

        <div className="absolute bottom-[-200px] right-[-120px] w-[500px] h-[500px] bg-purple-500/20 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col h-screen px-3 sm:px-6 py-4">

        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            mb-4
            rounded-3xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
            p-4
            sm:p-6
          "
        >

          <div className="flex items-start gap-4">

            {/* BACK */}
            <button
              onClick={() =>
                window.history.back()
              }
              className="
                w-12
                h-12
                rounded-2xl
                border
                border-white/10
                bg-white/5
                flex
                items-center
                justify-center
                hover:bg-white/10
                transition-all
                shrink-0
              "
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* ICON */}
            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                via-blue-500
                to-purple-600
                flex
                items-center
                justify-center
                shadow-lg
                shadow-cyan-500/20
                animate-pulse
                shrink-0
              "
            >
              <Bot className="w-7 h-7 text-white" />
            </div>

            {/* TEXT */}
            <div>

              <h1
                className="
                  text-2xl
                  sm:text-3xl
                  font-black
                  bg-gradient-to-r
                  from-white
                  via-blue-100
                  to-purple-300
                  bg-clip-text
                  text-transparent
                "
              >
                AI Trip Assistant
              </h1>

              <p className="text-sm text-gray-400 mt-1">
                Your intelligent travel concierge.
              </p>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  mt-4
                  px-4
                  py-2
                  rounded-full
                  bg-gradient-to-r
                  from-blue-500/20
                  to-purple-500/20
                  border
                  border-white/10
                "
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />

                <span className="text-sm text-cyan-200">
                  Real-Time AI Planning
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CHAT BOX */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="
            flex-1
            rounded-3xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
            overflow-hidden
            flex
            flex-col
          "
        >

          {/* QUICK ACTIONS */}
          <div className="px-4 sm:px-6 pt-5">

            <div className="flex flex-wrap gap-3">

              {quickPrompts.map((prompt) => (

                <button
                  key={prompt}
                  onClick={() =>
                    setInput(prompt)
                  }
                  className="
                    px-4
                    py-2
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    hover:bg-white/10
                    text-sm
                    text-gray-300
                    transition-all
                  "
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* MESSAGES */}
          <div
            ref={listRef}
            className="
              flex-1
              overflow-y-auto
              p-4
              sm:p-6
              space-y-5
            "
          >

            {/* EMPTY */}
            {messages.length === 0 && (

              <div className="h-full flex items-center justify-center">

                <div className="text-center max-w-lg">

                  <div
                    className="
                      mx-auto
                      mb-6
                      w-24
                      h-24
                      rounded-3xl
                      bg-gradient-to-r
                      from-blue-500
                      to-purple-600
                      flex
                      items-center
                      justify-center
                      shadow-xl
                      shadow-blue-500/20
                    "
                  >
                    <Bot className="w-12 h-12 text-white" />
                  </div>

                  <h2 className="text-3xl font-bold mb-4">
                    Start Your AI Journey
                  </h2>

                  <p className="text-gray-400 leading-relaxed">
                    Ask anything about your trip,
                    destination planning,
                    restaurants, hotels,
                    budgets, activities,
                    hidden gems, or travel tips.
                  </p>
                </div>
              </div>
            )}

            {/* CHAT MESSAGES */}
            <AnimatePresence>

              {messages.map((m) => (

                <motion.div
                  key={m.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  className={`
                    flex
                    ${m.role === "user"
                      ? "justify-end"
                      : "justify-start"
                    }
                  `}
                >

                  <div
                    className={`
                      max-w-[92%]
                      sm:max-w-[80%]
                      rounded-3xl
                      px-5
                      py-4
                      shadow-xl
                      backdrop-blur-xl
                      border
                      ${m.role === "user"
                        ? `
                            bg-gradient-to-r
                            from-blue-500
                            to-purple-600
                            border-blue-400/20
                            text-white
                          `
                        : `
                            bg-white/5
                            border-white/10
                            text-gray-200
                          `
                      }
                    `}
                  >

                    {/* TOP */}
                    <div className="flex items-center gap-2 mb-3">

                      <div
                        className={`
                          w-8
                          h-8
                          rounded-full
                          flex
                          items-center
                          justify-center
                          ${m.role === "user"
                            ? "bg-white/20"
                            : "bg-gradient-to-r from-cyan-500 to-purple-600"
                          }
                        `}
                      >
                        {m.role === "user"
                          ? (
                            <User className="w-4 h-4" />
                          )
                          : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                      </div>

                      <span className="text-sm font-semibold">
                        {m.role === "user"
                          ? "You"
                          : "AI Assistant"}
                      </span>

                      <div className="flex items-center gap-1 text-xs text-gray-500 ml-auto">
                        <Clock3 className="w-3 h-3" />

                        {new Date(
                          m.createdAt
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>

                    {/* CONTENT */}
                    {m.role === "assistant"
                      ? (
                        <div
                          className="
                            prose
                            prose-invert
                            max-w-none
                            prose-p:text-gray-200
                            prose-strong:text-white
                            prose-code:text-cyan-300
                            prose-pre:bg-black/30
                          "
                        >
                          <ReactMarkdown
                            remarkPlugins={[
                              remarkGfm,
                            ]}
                          >
                            {m.content}
                          </ReactMarkdown>
                        </div>
                      )
                      : (
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {m.content}
                        </div>
                      )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>


            {/* THINKING */}
            {isSending && (

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                className="flex justify-start"
              >

                <div
                  className="
                    rounded-3xl
                    bg-white/5
                    border
                    border-white/10
                    backdrop-blur-xl
                    px-5
                    py-4
                    max-w-[80%]
                  "
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-8
                        h-8
                        rounded-full
                        bg-gradient-to-r
                        from-cyan-500
                        to-purple-600
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Bot className="w-4 h-4 text-white" />
                    </div>

                    <div className="flex gap-1">

                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" />

                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />

                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                    </div>

                    <span className="text-sm text-gray-400">
                      {thinkingText}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* ERROR */}
          {error && (

            <div className="px-4 sm:px-6 pb-3">

              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-red-500/20
                  bg-red-500/10
                  px-4
                  py-3
                  text-sm
                  text-red-300
                "
              >
                <AlertCircle className="w-4 h-4 shrink-0" />

                <span>{error}</span>
              </div>
            </div>
          )}

          {/* INPUT */}
          <div
            className="
              border-t
              border-white/10
              p-4
              sm:p-6
              bg-black/10
              sticky
              bottom-0
            "
          >

            <div className="flex items-end gap-3">

              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                placeholder="Ask AI about your trip..."
                onChange={(e) =>
                  setInput(e.target.value)
                }
                onKeyDown={(e) => {

                  if (
                    e.key === "Enter" &&
                    !e.shiftKey
                  ) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                disabled={isSending}
                className="
                  flex-1
                  max-h-40
                  overflow-y-auto
                  resize-none
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  px-5
                  py-4
                  text-white
                  placeholder:text-gray-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

              <Button
                onClick={sendMessage}
                disabled={!canSend}
                className="
                  h-14
                  w-14
                  rounded-2xl
                  bg-gradient-to-r
                  from-cyan-500
                  via-blue-500
                  to-purple-600
                  hover:scale-105
                  transition-all
                  duration-300
                  shadow-lg
                  shadow-cyan-500/20
                  shrink-0
                "
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatRoom;