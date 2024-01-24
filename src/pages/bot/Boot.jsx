



import React, { useState } from 'react';
import nlp from 'compromise';

function Chatbot() {
  const [userInput, setUserInput] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);






  const dynamicResponses = {
    'a': 'Appetite: A is for appetite. Maintaining a healthy appetite is essential for overall well-being. Ensure you have a balanced diet!',
    'b': 'Books: B is for books. Reading is a great way to gain knowledge and relax. Have you read any interesting books lately?',
    'c': 'Coding: C is for coding. If you're into technology, coding can be a fascinating and rewarding skill to develop. Have you tried coding before?'",
    'hy': 'Hello!',
    'thanks': 'You\'re welcome!',
    'bye': 'Goodbye!',
    'morning': 'Good morning! How can I help you today?',
    'howareyou': 'I\'m doing well, thank you. How about you?',
    'plans': 'Any exciting plans for the day?',
    'breakfast': 'What did you have for breakfast?',
    'exercise': 'Did you get a chance to exercise today?',
    'work': 'How is work going? Anything interesting happening?',
    'lunch': "What's on the menu for lunch?",
    'afternoon': "Good afternoon! How's your day going so far?",
    'meeting': 'Do you have any meetings scheduled today?',
    'productive': 'Have you been feeling productive lately?',
    'downtime': 'Do you have any plans for some downtime later?',
    'evening': 'Good evening! How was the rest of your day?',
    'dinner': "What's for dinner tonight?",
    'relax': 'How do you like to relax in the evening?',
    'family': 'Did you spend some quality time with your family today?',
    'night': 'Good night! Any specific bedtime routine you follow?',
    'weekend': 'Looking forward to the weekend? Any special plans?',
    // Add more questions and answers as needed...
  };



  // Fallback response for cases where no specific response is generated

  // Function to generate a dynamic response based on user input
  const fallbackResponse = "I'm not sure how to respond to that. Could you please rephrase your question?";

  const generateDynamicResponse = (userInput) => {
    // Check for exact matches in dynamicResponses first
    const matchedResponse = dynamicResponses[userInput.toLowerCase()];
    if (matchedResponse) {
      return matchedResponse;
    }

    // If no exact match, try extracting verbs
    const doc = nlp(userInput);
    const verbs = doc.match('#Verb').out('array');

    if (verbs.length > 0) {
      return `It seems like you mentioned ${verbs.join(', ')}. Tell me more!`;
    }

    // If no specific pattern is matched, return the fallback response
    return fallbackResponse;
  };
  

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const response = generateDynamicResponse(userInput);

    setConversationHistory([
      ...conversationHistory,
      { user: userInput, bot: response },
    ]);

    setUserInput('');
  };
console.log("conversationHistory",conversationHistory)
  return (
    <div>
      <h1>Chatbot</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
      <div>
        {conversationHistory.map((message, index) => (
          <div key={index}>
            <p>You:{message.user}</p>
            <p>Bot: {message.bot}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chatbot;
