// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { useAuth } from '../../contexts/AuthContext';
// import { TextInput, Button, ScrollArea, Text, Group, Avatar } from '@mantine/core';

// const Chat = ({ propertyId, otherUserId }) => {
//   const { user } = useAuth();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const scrollAreaRef = useRef(null);

//   // Fetch chat history
// //   useEffect(() => {
// //     axios
// //       .get(`http://localhost/renteasy/public/api/getMessages.php`, {
// //         params: { propertyId, userId: user.id, otherUserId },
// //       })
// //       .then((response) => {
// //         if (response.data.status === 'success') {
// //           setMessages(response.data.data);
// //         } else {
// //           console.error('Error fetching messages:', response.data.message);
// //           setMessages((prev) => [
// //             ...prev,
// //             {
// //               sender_id: null,
// //               message: 'Failed to load chat history. Please try again.',
// //               timestamp: new Date().toISOString(),
// //             },
// //           ]);
// //         }
// //       })
// //       .catch((error) => {
// //         console.error('Error fetching messages:', error);
// //         setMessages((prev) => [
// //           ...prev,
// //           {
// //             sender_id: null,
// //             message: 'Failed to load chat history. Please try again.',
// //             timestamp: new Date().toISOString(),
// //           },
// //         ]);
// //       });
// //   }, [propertyId, user.id, otherUserId]);

//   // Scroll to bottom
//   useEffect(() => {
//     if (scrollAreaRef.current) {
//       scrollAreaRef.current.scrollTo({
//         y: scrollAreaRef.current.scrollHeight,
//         animated: true,
//       });
//     }
//   }, [messages]);

//   // Send message
//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (!newMessage.trim()) {
//       console.warn('Cannot send empty message');
//       return;
//     }
  
//     const messageData = {
//       propertyId: Number(propertyId),
//       senderId: Number(user.id),
//       receiverId: Number(otherUserId),
//       message: newMessage.trim(),
//     };
  
//     axios
//       .post(`http://localhost/renteasy/public/api/sendMessage.php`, messageData, {
//         headers: { 'Content-Type': 'application/json' },
//         timeout: 5000,
//       })
//       .then((response) => {
//         if (response.data.status === 'success') {
//           setMessages((prev) => [
//             ...prev,
//             {
//               sender_id: user.id,
//               message: newMessage,
//               timestamp: new Date().toISOString(),
//             },
//           ]);
//           setNewMessage('');
//         } else {
//           console.error('Error sending message:', response.data.message);
//           setMessages((prev) => [
//             ...prev,
//             {
//               sender_id: null,
//               message: 'Failed to send message. Please try again.',
//               timestamp: new Date().toISOString(),
//             },
//           ]);
//         }
//       })
//       .catch((error) => {
//         console.error('Error sending message:', error);
//         setMessages((prev) => [
//           ...prev,
//           {
//             sender_id: null,
//             message: 'Failed to send message. Please try again.',
//             timestamp: new Date().toISOString(),
//           },
//         ]);
//       });
//   };
//   return (
//     <div className="flex flex-col h-[400px] bg-white rounded-xl shadow-md">
//       <div className="p-4 border-b border-gray-200">
//         <Text size="lg" weight={700} className="text-gray-800">
//           Chat with {otherUserId === user.id ? 'Landlord' : 'Tenant'}
//         </Text>
//       </div>
//       <ScrollArea className="flex-1 p-4" viewportRef={scrollAreaRef} style={{ height: '100%' }}>
//         {messages.length > 0 ? (
//           messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex mb-3 ${
//                 msg.sender_id === user.id ? 'justify-end' : 'justify-start'
//               }`}
//             >
//               <div
//                 className={`flex ${
//                   msg.sender_id === user.id ? 'flex-row-reverse' : 'flex-row'
//                 } items-end max-w-[70%]`}
//               >
//                 <Avatar
//                   size="sm"
//                   radius="xl"
//                   className="mx-2"
//                   src={`https://ui-avatars.com/api/?name=${
//                     msg.sender_name || 'User'
//                   }&background=random`}
//                 >
//                   {msg.sender_name ? msg.sender_name[0] : 'U'}
//                 </Avatar>
//                 <div>
//                   <div
//                     className={`p-3 rounded-2xl ${
//                       msg.sender_id === user.id
//                         ? 'bg-blue-600 text-white'
//                         : 'bg-gray-200 text-gray-800'
//                     }`}
//                   >
//                     <Text size="sm">{msg.message}</Text>
//                   </div>
//                   <Text
//                     size="xs"
//                     color="dimmed"
//                     className={`mt-1 ${
//                       msg.sender_id === user.id ? 'text-right' : 'text-left'
//                     }`}
//                   >
//                     {new Date(msg.timestamp).toLocaleTimeString([], {
//                       hour: '2-digit',
//                       minute: '2-digit',
//                     })}
//                   </Text>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <Text size="sm" color="dimmed" className="text-center mt-4">
//             No messages yet. Start the conversation!
//           </Text>
//         )}
//       </ScrollArea>
//       <form
//         onSubmit={sendMessage}
//         className="p-4 border-t border-gray-200 bg-white flex items-center gap-2"
//       >
//         <TextInput
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-1"
//           styles={{
//             input: {
//               borderRadius: '9999px',
//               border: '1px solid #e5e7eb',
//               padding: '8px 16px',
//               '&:focus': {
//                 borderColor: '#3b82f6',
//                 boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.3)',
//               },
//             },
//           }}
//         />
//         <Button
//           type="submit"
//           color="blue"
//           className="rounded-full p-2 bg-blue-600 hover:bg-blue-700"
//           disabled={!newMessage.trim()}
//         >
//           <svg
//             className="w-5 h-5"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//             ></path>
//           </svg>
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default Chat;