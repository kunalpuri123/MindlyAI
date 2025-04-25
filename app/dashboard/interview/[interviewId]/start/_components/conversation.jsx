"use client";
import Script from "next/script";
import { useState, useCallback, useEffect } from "react";
import { useConversation } from "@11labs/react";

import Webcam from "react-webcam";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // Import router
import ModelPrediction from "./ModelPrediction";


export function Conversation() {
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(false);

  const [interviewData, setInterviewData] = useState(null);
  const [conversationStatus, setConversationStatus] = useState("Disconnected");
  const [conversationId, setConversationId] = useState(null);
  const { user } = useUser();
  const router = useRouter(); // Corrected router initialization

  const conversation = useConversation({
    onConnect: () => console.log("Connected"),
    onDisconnect: () => console.log("Disconnected"),
    onMessage: (message) => console.log("Message:", message),
    onError: (error) => console.error("Error:", error),
  });





  const startConversation = useCallback(async () => {


    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const id = await conversation.startSession({
        agentId: "x3toNp0ruSnmNpUW6Vtx",
      });
      console.log("Conversation ID:", id);
      setConversationId(id);
      setConversationStatus("Listening");
    } catch (error) {
      console.error("Error starting conversation:", error);
      setConversationStatus("Error");
    }
  }, [conversation, isPaid]);

  const stopConversation = useCallback(async () => {
    try {
      await conversation.endSession();

      
      if (conversationId) {
        router.push(`/dashboard/summary/${conversationId}`);
      } else {
        console.error("No conversation ID available.");
      }
    } catch (error) {
      console.error("Error stopping conversation:", error);
    }
  }, [conversation, user, interviewData, conversationId, router]);



  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-black-100 rounded-lg shadow-md">

      <h2 className="text-lg font-semibold text-white">Mindly AI Psycologist and Mindfullness coach</h2>
      
      <Webcam style={{ height: 300, width: "100%" }} mirrored={true} />
    <ModelPrediction />


        <>
          <button onClick={startConversation} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Start</button>
          <button onClick={stopConversation} className="px-4 py-2 bg-red-500 text-white rounded-lg">Stop</button>
        </>
   
    </div>
  );
}