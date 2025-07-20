import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Send,
  Plus,
  MessageSquare,
  User,
  BarChart3,
  LogOut,
  Bot,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: Date;
  preview: string;
  messages: ChatMessage[];
}


import { sendMessageToAI } from "@/integrations/supabase/chat";

// ...



const ChatDashboard = () => {
  const navigate = useNavigate();
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedChatId, setSelectedChatId] = useState<string>("1");

  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "Aprendiendo Python",
      lastMessage: new Date(),
      preview: "¿Cómo funcionan las listas en Python?",
      messages: [
        {
          id: "1-1",
          content: "¡Hola! Soy tu asistente de programación. ¿En qué puedo ayudarte hoy?",
          sender: "ai",
          timestamp: new Date(Date.now() - 10000)
        },
        {
          id: "1-2",
          content: "¿Cómo funcionan las listas en Python?",
          sender: "user",
          timestamp: new Date(Date.now() - 5000)
        },
        {
          id: "1-3",
          content: "Las listas en Python son estructuras de datos ordenadas y mutables. Puedes crear una lista usando corchetes: mi_lista = [1, 2, 3, 'hola']",
          sender: "ai",
          timestamp: new Date()
        }
      ]
    },
    {
      id: "2",
      title: "React Hooks",
      lastMessage: new Date(Date.now() - 3600000),
      preview: "useState vs useEffect",
      messages: [
        {
          id: "2-1",
          content: "Hola, tengo dudas sobre los hooks de React",
          sender: "user",
          timestamp: new Date(Date.now() - 7200000)
        },
        {
          id: "2-2",
          content: "¡Perfecto! Te explico los hooks más importantes. ¿Qué específicamente quieres saber?",
          sender: "ai",
          timestamp: new Date(Date.now() - 7000000)
        },
        {
          id: "2-3",
          content: "¿Cuál es la diferencia entre useState y useEffect?",
          sender: "user",
          timestamp: new Date(Date.now() - 3600000)
        }
      ]
    },
    {
      id: "3",
      title: "Algoritmos de ordenamiento",
      lastMessage: new Date(Date.now() - 7200000),
      preview: "Bubble sort vs Quick sort",
      messages: [
        {
          id: "3-1",
          content: "Necesito entender los algoritmos de ordenamiento",
          sender: "user",
          timestamp: new Date(Date.now() - 7200000)
        },
        {
          id: "3-2",
          content: "Te ayudo con eso. Los algoritmos de ordenamiento son fundamentales. ¿Quieres empezar con bubble sort o quick sort?",
          sender: "ai",
          timestamp: new Date(Date.now() - 7000000)
        }
      ]
    }
  ]);

  const sendMessage = async () => {
    if (!currentMessage.trim()) return;

    const newUserMessage: ChatMessage = {
      id: `${selectedChatId}-${Date.now()}`,
      content: currentMessage,
      sender: "user",
      timestamp: new Date()
    };

    // Actualizar el chat seleccionado con el nuevo mensaje
    setChatSessions(prev => prev.map(session => {
      if (session.id === selectedChatId) {
        return {
          ...session,
          messages: [...session.messages, newUserMessage],
          lastMessage: new Date(),
          preview: currentMessage
        };
      }
      return session;
    }));

    setCurrentMessage("");

// Llamada real a la IA
  const selectedChat = chatSessions.find(chat => chat.id === selectedChatId);
  const messages = selectedChat ? selectedChat.messages.concat(newUserMessage) : [newUserMessage];

  try {
    const aiResponseText = await sendMessageToAI(currentMessage);
    const aiResponse: ChatMessage = {
      id: `${selectedChatId}-${Date.now() + 1}`,
      content: aiResponseText,
      sender: "ai",
      timestamp: new Date()
    };

    setChatSessions(prev => prev.map(session => {
      if (session.id === selectedChatId) {
        return {
          ...session,
          messages: [...session.messages, aiResponse],
          lastMessage: new Date()
        };
      }
      return session;
    }));
  } catch (error) {
    // Manejo de error
    console.error("Error al obtener respuesta de la IA:", error);
  }
};

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const selectChat = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  const createNewChat = () => {
    const newChatId = (chatSessions.length + 1).toString();
    const newChat: ChatSession = {
      id: newChatId,
      title: "Nueva conversación",
      lastMessage: new Date(),
      preview: "Conversación iniciada",
      messages: [
        {
          id: `${newChatId}-1`,
          content: "¡Hola! Soy tu asistente de programación. ¿En qué puedo ayudarte hoy?",
          sender: "ai",
          timestamp: new Date()
        }
      ]
    };

    setChatSessions(prev => [newChat, ...prev]);
    setSelectedChatId(newChatId);
  };

  // Obtener el chat seleccionado
  const selectedChat = chatSessions.find(chat => chat.id === selectedChatId);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar izquierdo */}
      <div className="w-80 bg-card border-r border-border flex flex-col">
        {/* Header del sidebar */}
        <div className="p-4 border-b border-border">
          <Button
            className="w-full justify-start gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
            onClick={createNewChat}
          >
            <Plus className="w-4 h-4" />
            Nueva conversación
          </Button>
        </div>

        {/* Lista de chats */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Conversaciones recientes
            </h3>
            {chatSessions.map((session) => (
              <Card
                key={session.id}
                className={`cursor-pointer hover:bg-accent/50 transition-colors ${selectedChatId === session.id ? 'ring-2 ring-blue-500 bg-accent/30' : ''
                  }`}
                onClick={() => selectChat(session.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">
                        {session.title}
                      </h4>
                      <p className="text-xs text-muted-foreground truncate mt-1">
                        {session.preview}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {formatTime(session.lastMessage)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Área principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Tutorcito Riwi</h1>
              {selectedChat && (
                <p className="text-sm text-muted-foreground">{selectedChat.title}</p>
              )}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigate("/analytics")}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Indicadores
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem>
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Área de mensajes */}
        <ScrollArea className="flex-1 p-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {selectedChat ? (
              selectedChat.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  {message.sender === "ai" && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${message.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      : "bg-card border border-border"
                      }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-2 ${message.sender === "user"
                        ? "text-white/70"
                        : "text-muted-foreground"
                        }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>

                  {message.sender === "user" && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-accent">
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>Selecciona una conversación para comenzar</p>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input de mensaje */}
        <div className="p-6 bg-card border-t border-border">
          <div className="max-w-3xl mx-auto flex gap-3">
            <Input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Pregúntame sobre programación..."
              className="flex-1"
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button
              onClick={sendMessage}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
              disabled={!currentMessage.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDashboard;