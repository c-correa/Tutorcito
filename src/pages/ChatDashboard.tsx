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
  chats: [
   {
     content: string,
      sender: string,
      timestamp: Date,
   }
  ]
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: Date;
  preview: string;
  message_id : string
}

const ChatDashboard = () => {
  const navigate = useNavigate();
  const [currentMessage, setCurrentMessage] = useState("");
    const [seletecMessage, setSeletecMessage] = useState<string>("");

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      chats:[
        {
          content: "¡Hola! Soy tu asistente de programación. ¿En qué puedo ayudarte hoy?",
        sender: "ai",
        timestamp: new Date()
        },
        {
          content: "¡Hola! Soy tu asistente de programación. ¿En qué puedo ayudarte hoy?",
        sender: "ai",
        timestamp: new Date()
        },
        {
          content: "¡Hola! Soy tu asistente de programación. ¿En qué puedo ayudarte hoy?",
        sender: "ai",
        timestamp: new Date()
        },
      ]
    },
      
  ]);

  const [chatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "Aprendiendo Python",
      lastMessage: new Date(),
      preview: "¿Cómo funcionan las listas en Python?",
      message_id: "1"
    },
    {
      id: "2", 
      title: "React Hooks",
      lastMessage: new Date(Date.now() - 3600000),
      preview: "useState vs useEffect",
      message_id: "1"
    },
    {
      id: "3",
      title: "Algoritmos de ordenamiento",
      lastMessage: new Date(Date.now() - 7200000),
      preview: "Bubble sort vs Quick sort",
      message_id: "2"
    }
  ]);

  // const sendMessage = () => {
  //   if (!currentMessage.trim()) return;

  //   const newUserMessage: ChatMessage = {
  //     id: Date.now().toString(),
  //     content: currentMessage,
  //     sender: "user",
  //     timestamp: new Date()
  //   };

  //   setMessages(prev => [...prev, newUserMessage]);
  //   setCurrentMessage("");

  //   // Simular respuesta de IA
  //   setTimeout(() => {
  //     const aiResponse: ChatMessage = {
  //       id: (Date.now() + 1).toString(),
  //       content: "Excelente pregunta. Te ayudo a entender ese concepto paso a paso...",
  //       sender: "ai",
  //       timestamp: new Date()
  //     };
  //     setMessages(prev => [...prev, aiResponse]);
  //   }, 1000);
  // };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const pickChat = (id_chat: string) => {
    
    setSeletecMessage(id_chat)
  }

  console.log(seletecMessage );
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar izquierdo */}
      <div className="w-80 bg-card border-r border-border flex flex-col">
        {/* Header del sidebar */}
        <div className="p-4 border-b border-border">
          <Button 
            className="w-full justify-start gap-2 bg-gradient-primary hover:opacity-90"
            onClick={() => {/* Nueva conversación */}}
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
            {chatSessions.map((session) => {              
              return (
              <Card 
                key={session.id}
                className="cursor-pointer hover:bg-accent/50 transition-colors"
              >
                <CardContent onClick={()=>pickChat(session.id) } className="p-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
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
            )
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Área principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8   ">
              <img src="../../public/img/zorro1.png"/>
            </div>
            <h1 className="text-lg font-semibold">Tutorcito Riwi</h1>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-gradient-primary text-white">
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
             <div>
              {
                messages[0].id == seletecMessage && messages[seletecMessage].chats.map((item)=> 
                  {
                  console.log(item);
                  return (
                     <div
                key={item.id}
                className={`flex gap-3 ${
                  item.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {item.sender === "ai" && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-primary text-white">
                     <img src="/img/zorro1.png"/>
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    item.sender === "user"
                      ? "bg-gradient-primary text-white"
                      : "bg-card border border-border"
                  }`}
                >
                  <p className="text-sm">{item.content}</p>
                  <p
                    className={`text-xs mt-2 ${
                      item.sender === "user"
                        ? "text-white/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {formatTime(item.timestamp)}
                  </p>
                </div>

                {messages[seletecMessage].sender === "user" && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-accent">
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
                  )
                }
                )  
               
              }
             </div>
             
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
              // onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button 
              // onClick={sendMessage}
              className="bg-gradient-primary hover:opacity-90"
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