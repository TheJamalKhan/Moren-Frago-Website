import React, { useContext, useState } from 'react';
import ai from "../assets/ai.png";
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import open from "../assets/open.mp3";
import { userDataContext } from '../context/UserContext';

function Ai() {
  const { showSearch, setShowSearch } = useContext(shopDataContext);
  const { logout, signInWithGoogle } = useContext(userDataContext);
  const navigate = useNavigate();
  const [activeAi, setActiveAi] = useState(false);
  const openingSound = new Audio(open);

  function speak(message) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 0.96;
    window.speechSynthesis.speak(utterance);
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.error("Speech Recognition not supported.");
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  // Tour Functionality
  const startTour = async () => {
    const pages = [
      { path: "/", message: "Welcome to Moren Frago. Let's start the tour from the homepage." },
      { path: "/about", message: "This is the About page. Here you learn about our mission, story, and brand vision." },
      { path: "/collection", message: "Now, we are at the Collection page where you can explore all our latest products and categories." },
      { path: "/cart", message: "This is your Cart. When you shop items, they appear here before checkout." },
      { path: "/order", message: "Here's your Orders page to track everything you’ve bought." },
      { path: "/faq", message: "In the FAQ section, you’ll find answers to frequently asked questions." },
      { path: "/returns", message: "This is the Returns policy page. Learn how you can return items easily." },
      { path: "/privacy-policy", message: "Our Privacy Policy page ensures transparency and data protection for users like you." },
      { path: "/terms", message: "This is the Terms and Conditions page to understand our platform’s usage policies." },
    ];

    for (let i = 0; i < pages.length; i++) {
      const { path, message } = pages[i];
      navigate(path);
      speak(message);
      await new Promise(resolve => setTimeout(resolve, 9000)); // Wait for speech and page load
    }

    speak("That concludes your tour of Moren Frago. Feel free to explore more or ask me anything.");
  };

  const commands = [
    { keywords: ["open search"], action: () => { if (!showSearch) { speak("Opening search"); setShowSearch(true); navigate("/collection"); } } },
    { keywords: ["close search"], action: () => { if (showSearch) { speak("Closing search"); setShowSearch(false); } } },
    { keywords: ["collection", "products"], action: () => { speak("Opening collection page"); navigate("/collection"); } },
    { keywords: ["about", "about page"], action: () => { speak("Opening about page"); navigate("/about"); } },
    { keywords: ["home", "homepage"], action: () => { speak("Opening home page"); navigate("/"); } },
    { keywords: ["cart", "kaat", "caat"], action: () => { speak("Opening your cart"); navigate("/cart"); } },
    { keywords: ["order", "my orders", "my order"], action: () => { speak("Opening your orders page"); navigate("/order"); } },
    { keywords: ["log out", "logout", "sign out"], action: () => { speak("Logging you out."); logout(); navigate("/"); } },
    { keywords: ["log in", "login", "sign in"], action: () => { speak("Navigating to the login page."); navigate("/login"); } },
    { keywords: ["register", "sign up"], action: () => { speak("Navigating to the registration page."); navigate("/signup"); } },
    { keywords: ["continue with google", "sign in with google", "google login"], action: () => { speak("Opening Google sign-in."); signInWithGoogle(); } },
    { keywords: ["faq", "frequently asked questions"], action: () => { speak("Opening the FAQ page."); navigate("/faq"); } },
    { keywords: ["returns", "return policy"], action: () => { speak("Opening the returns page."); navigate("/returns"); } },
    { keywords: ["shipping", "shipping policy"], action: () => { speak("Opening the shipping page."); navigate("/shipping"); } },
    { keywords: ["privacy", "privacy policy"], action: () => { speak("Opening the privacy policy page."); navigate("/privacy-policy"); } },
    { keywords: ["help", "help center"], action: () => { speak("Opening the help center."); navigate("/help-center"); } },
    { keywords: ["delivery", "delivery information"], action: () => { speak("Opening the delivery page."); navigate("/delivery"); } },
    { keywords: ["terms", "terms and conditions", "terms of service"], action: () => { speak("Opening the terms and conditions page."); navigate("/terms"); } },
    { keywords: ["check out", "checkout"], action: () => { speak("Proceeding to checkout."); navigate("/checkout"); } },

    // Voice shopping
    { keywords: ["add to cart"], action: () => { speak("Item added to cart."); toast.success("Simulated: Item added to cart."); } },
    { keywords: ["place order", "order now"], action: () => { speak("Placing your order."); toast.success("Simulated: Order placed!"); navigate("/order"); } },
    { keywords: ["pay now", "make payment", "proceed to payment"], action: () => { speak("Redirecting to payment."); toast.success("Simulated: Payment successful."); navigate("/payment-success"); } },

    // Social media
    { keywords: ["instagram", "open instagram", "instagram page"], action: () => { speak("Opening Instagram."); window.open("https://www.instagram.com/morenfrago_india", "_blank"); } },
    { keywords: ["youtube", "open youtube", "youtube channel"], action: () => { speak("Opening YouTube."); window.open("https://www.youtube.com/@jamaluplifts", "_blank"); } },

    // Developer intro
    {
      keywords: ["who is the developer", "who made this", "who built this website", "who developed this", "who created this site", "who created this website", "who is jamal", "who is the creator"],
      action: () => {
        const message = `The entire Moren Frago platform is the creation of Md. Jamal Ashraf Khan,
a dedicated full-stack developer with a passion for building robust and user-centric applications.
Jamal single-handedly engineered the complete e-commerce solution — from the responsive frontend and dynamic user experience,
to the secure backend and this powerful admin panel.
His expertise in modern web technologies and commitment to quality are the foundation of Moren Frago's digital presence.`;
        speak(message);
        toast.info("This website was developed by Md. Jamal Ashraf Khan.");
      }
    },

    // Tour trigger
    {
      keywords: ["show me around", "give me a tour", "explore the website", "introduce moren frago", "take me through the website"],
      action: () => {
        speak("Sure. Let's take a full tour of Moren Frago.");
        startTour();
      }
    }
  ];

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript.toLowerCase().trim();
    console.log("Voice Input:", transcript);
    let commandExecuted = false;

    for (const command of commands) {
      if (command.keywords.some(keyword => transcript.includes(keyword))) {
        command.action();
        commandExecuted = true;
        break;
      }
    }

    if (!commandExecuted) {
      speak("Sorry, I didn't understand that. Please try again.");
      toast.error("Command not recognized.");
    }
  };

  recognition.onend = () => {
    setActiveAi(false);
  };

  const handleAiClick = () => {
    try {
      recognition.start();
      openingSound.play();
      setActiveAi(true);
    } catch (error) {
      console.error("Recognition start error:", error);
      setActiveAi(false);
    }
  };

  return (
    <div 
      className='fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]' 
      onClick={handleAiClick}
    >
      <img 
        src={ai} 
        alt="AI Assistant" 
        className={`w-[70px] cursor-pointer transition-all duration-300 hover:opacity-100 ${
          activeAi 
            ? 'opacity-100 translate-x-[10%] translate-y-[-10%] scale-125' 
            : 'opacity-60'
        }`} 
        style={{ filter: activeAi ? "drop-shadow(0px 0px 30px #00d2fc)" : "drop-shadow(0px 0px 20px black)" }}
      />
    </div>
  );
}

export default Ai;
