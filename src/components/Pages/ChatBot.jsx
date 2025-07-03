import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { FaArrowRight, FaComment, FaTimes } from "react-icons/fa";

// Constants
const API_KEY = "AIzaSyBf9XvFntm6ECbziPW1vDh5lcPUDgtFVBg";

const USER_DETAILS_ENDPOINT =
  "http://localhost/rent-easy/public/userDetails.php";
// console.log(USER_DETAILS_ENDPOINT);

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

const ChatBot = () => {
  // State
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your Rent Easy assistant. How can I help you today?",
      sender: "bot",
      id: Date.now(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const messagesEndRef = useRef(null);

  // Memoized AI instance
  const genAI = useMemo(() => new GoogleGenerativeAI(API_KEY), []);

  // Message helpers
  const addMessage = useCallback((text, sender) => {
    setMessages((prev) => [...prev, { text, sender, id: Date.now() }]);
  }, []);
  const addBotMessage = useCallback(
    (text) => addMessage(text, "bot"),
    [addMessage]
  );

  // Fetch user details once
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(USER_DETAILS_ENDPOINT);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setUserDetails(data);
      } catch (err) {
        console.error("Failed to load user details", err);
        addBotMessage(
          "Failed to load user data. Some features might be limited."
        );
      }
    })();
  }, [addBotMessage]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || !userDetails) return;

    const userText = inputValue.trim();
    setInputValue("");
    addMessage(userText, "user");
    setIsLoading(true);
    addBotMessage("...");

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: {
          role: "system",
          parts: [
            {
              text: `You are the Rent Easy Assistant. The data is:
${JSON.stringify(userDetails, null, 2)}

Use only this data to answer tenant queries about rent payments, lease terms, maintenance requests, and account balances. Do not introduce external topics.

Response requirements:
→ Response in plain text; do not use asterisks for formatting.
→ Parse and cite specific userDetails fields.
→ Use → prefix for bullets.
→ Separate sections with ---.
→ Be concise and include up to 2 emojis.

Response structure:
1. Acknowledge user question.
2. Reference exact userDetails fields.
3. Provide actionable information.`,
            },
          ],
        },
        safetySettings,
      });

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: userText }] }],
      });
      const response = await result.response;
      const responseText = await response.text();

      setMessages((prev) =>
        prev.map((msg) =>
          msg.text === "..."
            ? { text: responseText, sender: "bot", id: Date.now() }
            : msg
        )
      );
    } catch (err) {
      console.error("Error generating content", err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.text === "..."
            ? {
                text: "Sorry, I'm having trouble. Please try again later.",
                sender: "bot",
                id: Date.now(),
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) handleSendMessage();
  };

  return (
    <>
      {/* Floating chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-5 right-5 w-14 h-14 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 z-40 ${
          isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
        }`}
        aria-label="Open chat"
      >
        <FaComment className="w-5 h-5" />
      </button>

      {/* Chat container */}
      <div
        className={`fixed bottom-5 right-5 w-72 flex flex-col bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 transition-all duration-300 transform ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 pointer-events-none"
        } z-50`}
        style={{
          maxHeight: isOpen ? "70vh" : "0",
          height: isOpen ? "auto" : "0",
          minHeight: isOpen ? "350px" : "0",
        }}
      >
        <header className="bg-blue-600 text-white p-3 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Rent Easy Assistant</h2>
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
              aria-label="Online status"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Close chat"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
        </header>

        <section
          className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
          aria-live="polite"
          style={{ minHeight: "200px" }}
        >
          {messages.map(({ text, sender, id }) => (
            <div
              key={id}
              className={`flex ${
                sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] px-3 py-2 text-sm rounded-lg ${
                  sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 border border-gray-200 rounded-tl-none"
                }`}
              >
                {text === "..." ? (
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{text}</p>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </section>

        <footer className="border-t border-gray-200 p-3 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              aria-label="Type your message"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about your lease, payments..."
              disabled={isLoading}
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              aria-label="Send message"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700 disabled:bg-gray-300 disabled:hover:bg-gray-300"
            >
              {isLoading ? (
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : (
                <FaArrowRight className="h-5 w-5" />
              )}
            </button>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ChatBot;
