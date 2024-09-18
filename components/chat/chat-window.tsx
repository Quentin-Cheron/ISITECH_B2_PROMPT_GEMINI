"use client";

import { Message } from "@/types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChatWindow({ data }: { data: Message[] }) {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {data?.length === 0 ? (
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Les créateurs du monde entier nous font confiance
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Soyez parmi les premiers à utiliser Gemini Prompt, un outil de
                génération de prompts pour les créateurs de contenu.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {data?.map((message, index) => (
              <div key={index} className="space-y-4">
                {/* Message envoyé */}
                <div className="w-full flex justify-start">
                  <div className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full break-words">
                    <p>{message.sendMessage || message.message}</p>
                    <span className="block text-sm text-gray-300 mt-1">
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>

                {/* Réponse de Gemini */}
                <div className="w-full flex justify-start">
                  <div className="bg-gray-200 text-gray-900 rounded-lg px-4 py-2 w-full break-words">
                    <p>{message.getMessage}</p>
                    <span className="block text-sm text-gray-500 mt-1">
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
