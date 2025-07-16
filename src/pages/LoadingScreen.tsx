import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Brain, Code } from "lucide-react";

const LoadingScreen = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Inicializando sistemas de aprendizaje...");

  const loadingSteps = [
    "Inicializando sistemas de aprendizaje...",
    "Configurando modelos de IA...",
    "Preparando análisis personalizados...",
    "Optimizando experiencia educativa...",
    "Finalizando configuración..."
  ];

  useEffect(() => {
    const duration = 30000; // 30 segundos
    const interval = 100; // actualizar cada 100ms
    const totalSteps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = (currentStep / totalSteps) * 100;
      setProgress(newProgress);

      // Cambiar texto según el progreso
      const textIndex = Math.floor((newProgress / 100) * (loadingSteps.length - 1));
      setLoadingText(loadingSteps[textIndex]);

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        navigate("/chat");
      }
    }, interval);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-surface flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Logo/Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center shadow-strong animate-pulse">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center animate-bounce">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-warning rounded-full flex items-center justify-center animate-bounce delay-150">
            <Code className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Título */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            EduChat AI
          </h1>
          <p className="text-lg text-muted-foreground">
            Tu asistente personal de programación
          </p>
        </div>

        {/* Barra de progreso */}
        <div className="space-y-4">
          <Progress value={progress} className="w-full h-2" />
          <p className="text-sm text-muted-foreground animate-pulse">
            {loadingText}
          </p>
          <p className="text-xs text-muted-foreground">
            {Math.round(progress)}% completado
          </p>
        </div>

        {/* Características */}
        <div className="grid grid-cols-3 gap-4 pt-8">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto bg-progress-python/10 rounded-lg flex items-center justify-center">
              <span className="text-progress-python font-bold text-lg">Py</span>
            </div>
            <p className="text-xs text-muted-foreground">Python</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto bg-progress-javascript/10 rounded-lg flex items-center justify-center">
              <span className="text-progress-javascript font-bold text-lg">JS</span>
            </div>
            <p className="text-xs text-muted-foreground">JavaScript</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto bg-progress-go/10 rounded-lg flex items-center justify-center">
              <span className="text-progress-go font-bold text-lg">Go</span>
            </div>
            <p className="text-xs text-muted-foreground">Go</p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8">
          <p className="text-xs text-muted-foreground">
            Tiempo restante: {Math.ceil((100 - progress) * 30 / 100)} segundos
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;