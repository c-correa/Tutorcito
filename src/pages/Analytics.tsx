import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// Table components will be implemented inline
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ChevronLeft, ChevronRight, Code, TrendingUp, AlertTriangle, CheckCircle, ArrowLeft, Target, BookOpen, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
interface Technology {
  name: string;
  icon: string;
  sessions: number;
  level: "Principiante" | "Intermedio" | "Avanzado";
  lastInteraction: string;
  progress: number;
  weakPoints: string[];
  recommendations: string[];
  improvementPlan: string[];
  color: string;
  description: string;
}

const Analytics = () => {
  const navigate = useNavigate();
  const [selectedTechnology, setSelectedTechnology] = useState<Technology | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const technologyData: Technology[] = [
    {
      name: "HTML",
      icon: "🏗️",
      sessions: 28,
      level: "Intermedio",
      lastInteraction: "Hace 1 hora",
      progress: 80,
      description: "Estructura y semántica web",
      weakPoints: [
        "Formularios complejos",
        "Atributos de accesibilidad (ARIA)",
        "Elementos semánticos avanzados",
        "Validación HTML5"
      ],
      recommendations: [
        "Practica con formularios de validación",
        "Estudia roles ARIA y accesibilidad",
        "Implementa elementos semánticos como <section>, <article>",
        "Aprende atributos de validación HTML5"
      ],
      improvementPlan: [
        "Semana 1: Dominar formularios y validaciones",
        "Semana 2: Implementar elementos semánticos",
        "Semana 3: Mejorar accesibilidad con ARIA",
        "Semana 4: Proyecto integrador HTML avanzado"
      ],
      color: "#E34F26"
    },
    {
      name: "CSS",
      icon: "🎨",
      sessions: 35,
      level: "Avanzado",
      lastInteraction: "Hace 30 minutos",
      progress: 90,
      description: "Estilos y diseño responsive",
      weakPoints: [
        "Grid Layout avanzado",
        "Animaciones CSS complejas",
        "Custom Properties (variables)",
        "Metodología BEM"
      ],
      recommendations: [
        "Profundiza en CSS Grid para layouts complejos",
        "Practica animaciones con keyframes",
        "Implementa CSS Custom Properties",
        "Aplica metodología BEM en proyectos"
      ],
      improvementPlan: [
        "Semana 1: Dominar CSS Grid y Flexbox avanzado",
        "Semana 2: Crear animaciones fluidas",
        "Semana 3: Implementar variables CSS",
        "Semana 4: Proyecto con metodología BEM"
      ],
      color: "#1572B6"
    },
    {
      name: "JavaScript",
      icon: "⚡",
      sessions: 42,
      level: "Intermedio",
      lastInteraction: "Hace 2 horas",
      progress: 75,
      description: "Interactividad y lógica del frontend",
      weakPoints: [
        "Programación asíncrona",
        "Manipulación del DOM optimizada",
        "Closures y scope",
        "Manejo de eventos avanzado",
        "Módulos ES6"
      ],
      recommendations: [
        "Practica Promise, async/await",
        "Optimiza selección y manipulación del DOM",
        "Estudia closures y lexical scope",
        "Implementa event delegation",
        "Usa import/export en proyectos"
      ],
      improvementPlan: [
        "Semana 1: Dominar programación asíncrona",
        "Semana 2: Optimizar manipulación del DOM",
        "Semana 3: Profundizar en closures y scope",
        "Semana 4: Proyecto con módulos ES6"
      ],
      color: "#F7DF1E"
    },
    {
      name: "JSON-Server",
      icon: "🗄️",
      sessions: 18,
      level: "Principiante",
      lastInteraction: "Hace 1 día",
      progress: 45,
      description: "API REST simulada para desarrollo",
      weakPoints: [
        "Configuración de rutas personalizadas",
        "Middleware personalizado",
        "Relaciones entre recursos",
        "Paginación y filtros",
        "Autenticación básica"
      ],
      recommendations: [
        "Configura rutas personalizadas en db.json",
        "Crea middleware para logging",
        "Implementa relaciones entre entidades",
        "Practica paginación con _page y _limit",
        "Simula autenticación con tokens"
      ],
      improvementPlan: [
        "Semana 1: Configurar rutas y estructura básica",
        "Semana 2: Implementar middleware personalizado",
        "Semana 3: Crear relaciones entre recursos",
        "Semana 4: Añadir paginación y filtros"
      ],
      color: "#68217A"
    }
  ];

  const pieData = technologyData.map(tech => ({
    name: tech.name,
    value: tech.sessions,
    color: tech.color
  }));

  const barData = technologyData.map(tech => ({
    name: tech.name,
    progress: tech.progress
  }));

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % technologyData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + technologyData.length) % technologyData.length);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Principiante": return "bg-yellow-100 text-yellow-800";
      case "Intermedio": return "bg-blue-100 text-blue-800";
      case "Avanzado": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const totalSessions = technologyData.reduce((acc, tech) => acc + tech.sessions, 0);
  const averageProgress = Math.round(technologyData.reduce((acc, tech) => acc + tech.progress, 0) / technologyData.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Chat
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Análisis de Progreso - Web Development</h1>
                <p className="text-gray-600">Domina las tecnologías fundamentales del desarrollo web</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">+15% esta semana</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sección principal - Carrusel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Carrusel de tecnologías */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Tecnologías Web Development
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevSlide}
                      className="hover:bg-blue-50"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <div className="flex space-x-2">
                      {technologyData.map((_, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-blue-600" : "bg-gray-300"
                            }`}
                        />
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextSlide}
                      className="hover:bg-blue-50"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Card
                        className="cursor-pointer hover:shadow-xl transition-all transform hover:scale-105 border-2 hover:border-blue-300"
                        onClick={() => setSelectedTechnology(technologyData[currentSlide])}
                      >
                        <CardContent className="p-8">
                          <div className="text-center space-y-4">
                            <div className="text-5xl mb-2">{technologyData[currentSlide].icon}</div>
                            <h3 className="text-2xl font-bold text-gray-900">{technologyData[currentSlide].name}</h3>
                            <p className="text-gray-600">{technologyData[currentSlide].description}</p>
                            <div className="space-y-3">
                              <Badge className={getLevelColor(technologyData[currentSlide].level)}>
                                {technologyData[currentSlide].level}
                              </Badge>
                              <p className="text-sm text-gray-500">
                                {technologyData[currentSlide].sessions} sesiones completadas
                              </p>
                              <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                                  style={{ width: `${technologyData[currentSlide].progress}%` }}
                                />
                              </div>
                              <p className="text-sm font-medium text-gray-700">{technologyData[currentSlide].progress}% dominado</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>

                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl">
                          <span className="text-3xl">{selectedTechnology?.icon}</span>
                          Análisis detallado: {selectedTechnology?.name}
                        </DialogTitle>
                      </DialogHeader>
                      {selectedTechnology && (
                        <div className="space-y-6">
                          {/* Información general */}
                          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600">{selectedTechnology.sessions}</div>
                              <div className="text-sm text-gray-600">Sesiones</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600">{selectedTechnology.progress}%</div>
                              <div className="text-sm text-gray-600">Progreso</div>
                            </div>
                            <div className="text-center">
                              <Badge className={getLevelColor(selectedTechnology.level)}>
                                {selectedTechnology.level}
                              </Badge>
                              <div className="text-sm text-gray-600 mt-1">Nivel actual</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Puntos débiles */}
                            <div className="space-y-3">
                              <h4 className="font-semibold flex items-center gap-2 text-orange-600">
                                <AlertTriangle className="w-5 h-5" />
                                Puntos débiles
                              </h4>
                              <div className="space-y-2">
                                {selectedTechnology.weakPoints.map((point, index) => (
                                  <div key={index} className="flex items-start gap-2 p-2 bg-orange-50 rounded">
                                    <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">{point}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Recomendaciones */}
                            <div className="space-y-3">
                              <h4 className="font-semibold flex items-center gap-2 text-green-600">
                                <CheckCircle className="w-5 h-5" />
                                Recomendaciones
                              </h4>
                              <div className="space-y-2">
                                {selectedTechnology.recommendations.map((rec, index) => (
                                  <div key={index} className="flex items-start gap-2 p-2 bg-green-50 rounded">
                                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">{rec}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Plan de mejoramiento */}
                            <div className="space-y-3">
                              <h4 className="font-semibold flex items-center gap-2 text-blue-600">
                                <Target className="w-5 h-5" />
                                Plan de mejoramiento
                              </h4>
                              <div className="space-y-2">
                                {selectedTechnology.improvementPlan.map((plan, index) => (
                                  <div key={index} className="flex items-start gap-2 p-2 bg-blue-50 rounded">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">{plan}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Sugerencias adicionales */}
                          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <Lightbulb className="w-5 h-5 text-yellow-500" />
                              Sugerencias para acelerar tu aprendizaje
                            </h4>
                            <p className="text-sm text-gray-700">
                              Con {selectedTechnology.sessions} sesiones completadas y un {selectedTechnology.progress}% de progreso,
                              te recomendamos enfocarte en los puntos débiles identificados. Dedica 30 minutos diarios a practicar
                              los conceptos del plan de mejoramiento para avanzar al siguiente nivel en 4 semanas.
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
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Resumen de Progreso por Tecnología
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Tecnología</th>
                        <th className="text-left p-3 font-medium">Sesiones</th>
                        <th className="text-left p-3 font-medium">Nivel</th>
                        <th className="text-left p-3 font-medium">Última práctica</th>
                        <th className="text-left p-3 font-medium">Progreso</th>
                      </tr>
                    </thead>
                    <tbody>
                      {technologyData.map((tech) => (
                        <tr key={tech.name} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{tech.icon}</span>
                              <div>
                                <div className="font-medium">{tech.name}</div>
                                <div className="text-sm text-gray-500">{tech.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 font-medium">{tech.sessions}</td>
                          <td className="p-3">
                            <Badge className={getLevelColor(tech.level)}>
                              {tech.level}
                            </Badge>
                          </td>
                          <td className="p-3 text-gray-600">{tech.lastInteraction}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                                  style={{ width: `${tech.progress}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{tech.progress}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar derecho - Gráficos y estadísticas */}
          <div className="space-y-6">
            {/* Gráfico de distribución de sesiones */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Distribución de Sesiones</CardTitle>
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
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Nivel de Dominio</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="progress" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Estadísticas generales */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Estadísticas Generales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm text-gray-600">Total de sesiones</span>
                  <span className="text-xl font-bold text-blue-600">{totalSessions}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-sm text-gray-600">Tecnologías dominadas</span>
                  <span className="text-xl font-bold text-green-600">{technologyData.length}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm text-gray-600">Progreso promedio</span>
                  <span className="text-xl font-bold text-purple-600">{averageProgress}%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-sm text-gray-600">Próximo hito</span>
                  <span className="text-sm font-medium text-orange-600">JavaScript Avanzado</span>
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