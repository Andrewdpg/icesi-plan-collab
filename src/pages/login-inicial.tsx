import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Mail, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/logo_hotizontal_dc.png";

export default function LoginInicial() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validar correo institucional
    if (!email.endsWith("@icesi.edu.co")) {
      setError("Usa tu correo institucional (@icesi.edu.co)");
      setIsLoading(false);
      return;
    }

    if (!email) {
      setError("Ingresa tu correo institucional");
      setIsLoading(false);
      return;
    }

    // Simular verificación de correo
    setTimeout(() => {
      setIsLoading(false);
      
      // Simular que el correo existe
      if (email) {
        toast({
          title: "Correo verificado",
          description: "Redirigiendo a recuperación de contraseña...",
        });
        
        // Redirigir a recuperar contraseña
        navigate("/recuperar-contrasena", { 
          state: { email: email } 
        });
      } else {
        setError("Correo no encontrado en el sistema");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elegant rounded-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <img src={logo} alt="Universidad Icesi" className="h-16 w-auto" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Sistema de Planeación</CardTitle>
            <CardDescription className="text-base mt-2">
              Oficina de Posgrados - Universidad Icesi
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Correo institucional</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="usuario@icesi.edu.co"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 pl-10 rounded-lg"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Verificando...
                </>
              ) : (
                <>
                  Continuar
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>

            <div className="text-center space-y-2 pt-4">
              <div className="text-xs text-muted-foreground">
                ¿Ya tienes una cuenta? <a href="/login" className="text-primary hover:underline">Iniciar sesión</a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
