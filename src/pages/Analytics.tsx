import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ChevronLeft, ChevronRight, Code, TrendingUp, AlertTriangle, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Language {
  name: string;
  icon: string;
  sessions: number;
  level: "Principiante" | "Intermedio" | "Avanzado";
  lastInteraction: string;
  progress: number;
  weakPoints: string[];
  recommendations: string[];
  color: string;
}

const Analytics = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const languageData = [
    {
      name: "Python",
      icon: "🐍",
      sessions: 45,
      level: "Intermedio" as const,
      lastInteraction: "Hace 2 horas",
      progress: 75,
      weakPoints: ["Manejo de excepciones", "Programación orientada a objetos", "Decoradores"],
      recommendations: [
        "Practica más con try-catch blocks",
        "Estudia herencia y polimorfismo",
        "Implementa decoradores en proyectos"
      ],
      color: "#3B82F6"
    },
    {
      name: "JavaScript",
      icon: "⚡",
      sessions: 38,
      level: "Avanzado" as const,
      lastInteraction: "Hace 1 día",
      progress: 90,
      weakPoints: ["Async/Await", "Closures avanzados"],
      recommendations: [
        "Profundiza en programación asíncrona",
        "Practica patrones de closure complejos"
      ],
      color: "#F59E0B"
    },
    {
      name: "Go",
      icon: "🐹",
      sessions: 22,
      level: "Principiante" as const,
      lastInteraction: "Hace 3 días",
      progress: 40,
      weakPoints: ["Goroutines", "Channels", "Interfaces"],
      recommendations: [
        "Estudia concurrencia básica",
        "Practica con ejemplos de channels",
        "Implementa interfaces simples"
      ],
      color: "#10B981"
    },
    {
      name: "React",
      icon: "⚛️",
      sessions: 31,
      level: "Intermedio" as const,
      lastInteraction: "Hace 1 hora",
      progress: 70,
      weakPoints: ["Custom Hooks", "Context API", "Performance optimization"],
      recommendations: [
        "Crea hooks personalizados",
        "Implementa Context para estado global",
        "Optimiza renders con useMemo"
      ],
      color: "#6366F1"
    },
    {
      name: "Java",
      icon: "☕",
      sessions: 15,
      level: "Principiante" as const,
      lastInteraction: "Hace 1 semana",
      progress: 30,
      weakPoints: ["Collections", "Generics", "Stream API"],
      recommendations: [
        "Estudia ArrayList y HashMap",
        "Practica con tipos genéricos",
        "Aprende operaciones de Stream"
      ],
      color: "#DC2626"
    }
  ];

  const pieData = languageData.map(lang => ({
    name: lang.name,
    value: lang.sessions,
    color: lang.color
  }));

  const barData = languageData.map(lang => ({
    name: lang.name,
    progress: lang.progress
  }));

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % languageData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + languageData.length) % languageData.length);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Principiante": return "bg-yellow-100 text-yellow-800";
      case "Intermedio": return "bg-blue-100 text-blue-800";
      case "Avanzado": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <div className="bg-card border-b border-border p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/chat")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Chat
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Indicadores de Progreso</h1>
              <p className="text-muted-foreground">Analiza tu evolución en el aprendizaje</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-success" />
            <span className="text-sm font-medium text-success">+12% esta semana</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sección principal - Carrusel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Carrusel de lenguajes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Lenguajes de Programación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={prevSlide}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <div className="flex space-x-2">
                      {languageData.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === currentSlide ? "bg-primary" : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={nextSlide}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Card 
                        className="cursor-pointer hover:shadow-medium transition-all transform hover:scale-105"
                        onClick={() => setSelectedLanguage(languageData[currentSlide])}
                      >
                        <CardContent className="p-6">
                          <div className="text-center space-y-4">
                            <div className="text-4xl">{languageData[currentSlide].icon}</div>
                            <h3 className="text-xl font-bold">{languageData[currentSlide].name}</h3>
                            <div className="space-y-2">
                              <Badge className={getLevelColor(languageData[currentSlide].level)}>
                                {languageData[currentSlide].level}
                              </Badge>
                              <p className="text-sm text-muted-foreground">
                                {languageData[currentSlide].sessions} sesiones completadas
                              </p>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div 
                                  className="bg-gradient-primary h-2 rounded-full"
                                  style={{ width: `${languageData[currentSlide].progress}%` }}
                                />
                              </div>
                              <p className="text-xs font-medium">{languageData[currentSlide].progress}% dominado</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>

                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <span className="text-2xl">{selectedLanguage?.icon}</span>
                          Análisis detallado: {selectedLanguage?.name}
                        </DialogTitle>
                      </DialogHeader>
                      {selectedLanguage && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <h4 className="font-medium flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-warning" />
                                Puntos débiles
                              </h4>
                              <ul className="space-y-1">
                                {selectedLanguage.weakPoints.map((point, index) => (
                                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <span className="w-1 h-1 bg-warning rounded-full mt-2 flex-shrink-0" />
                                    {point}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-medium flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-success" />
                                Recomendaciones
                              </h4>
                              <ul className="space-y-1">
                                {selectedLanguage.recommendations.map((rec, index) => (
                                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <span className="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0" />
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-gradient-learning/10 rounded-lg">
                            <h4 className="font-medium mb-2">Nivel estimado y sugerencias</h4>
                            <p className="text-sm text-muted-foreground">
                              Basado en tus {selectedLanguage.sessions} sesiones, tu nivel actual es{" "}
                              <Badge className={getLevelColor(selectedLanguage.level)}>
                                {selectedLanguage.level}
                              </Badge>
                              . Para avanzar al siguiente nivel, enfócate en los puntos débiles identificados
                              y practica los conceptos recomendados.
                            </p>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            {/* Tabla de progreso */}
            <Card>
              <CardHeader>
                <CardTitle>Resumen de Progreso</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lenguaje</TableHead>
                      <TableHead>Sesiones</TableHead>
                      <TableHead>Nivel</TableHead>
                      <TableHead>Última interacción</TableHead>
                      <TableHead>Progreso</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {languageData.map((lang) => (
                      <TableRow key={lang.name}>
                        <TableCell className="flex items-center gap-2">
                          <span className="text-lg">{lang.icon}</span>
                          <span className="font-medium">{lang.name}</span>
                        </TableCell>
                        <TableCell>{lang.sessions}</TableCell>
                        <TableCell>
                          <Badge className={getLevelColor(lang.level)}>
                            {lang.level}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{lang.lastInteraction}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div 
                                className="bg-gradient-primary h-2 rounded-full"
                                style={{ width: `${lang.progress}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{lang.progress}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar derecho - Gráficos */}
          <div className="space-y-6">
            {/* Gráfico de pastel */}
            <Card>
              <CardHeader>
                <CardTitle>Distribución de sesiones</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Gráfico de barras de progreso */}
            <Card>
              <CardHeader>
                <CardTitle>Nivel de dominio</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="progress" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Stats rápidas */}
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total sesiones</span>
                  <span className="font-bold">{languageData.reduce((acc, lang) => acc + lang.sessions, 0)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Lenguajes activos</span>
                  <span className="font-bold">{languageData.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Promedio progreso</span>
                  <span className="font-bold">
                    {Math.round(languageData.reduce((acc, lang) => acc + lang.progress, 0) / languageData.length)}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;