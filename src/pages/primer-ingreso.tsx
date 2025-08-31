import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Shield,
  Lock,
  User,
  Mail
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/logo_hotizontal_dc.png";

interface PasswordPolicy {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
  notReused: boolean;
}

export default function PrimerIngreso() {
  const navigate = useNavigate();
  const [isFirstLogin, setIsFirstLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordPolicy, setPasswordPolicy] = useState<PasswordPolicy>({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false,
    notReused: true
  });
  const [isLoading, setIsLoading] = useState(false);

  // Simular datos del usuario
  const userData = {
    nombre: "María González",
    correo: "mgonzalez@icesi.edu.co",
    rol: "Director",
    programa: "MBA",
    ultimoAcceso: "Nunca"
  };

  useEffect(() => {
    // Validar políticas de contraseña
    const policy = {
      minLength: newPassword.length >= 8,
      hasUppercase: /[A-Z]/.test(newPassword),
      hasLowercase: /[a-z]/.test(newPassword),
      hasNumber: /\d/.test(newPassword),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
      notReused: newPassword !== currentPassword && newPassword !== "Temp123!"
    };
    setPasswordPolicy(policy);
  }, [newPassword, currentPassword]);

  const isPasswordValid = Object.values(passwordPolicy).every(Boolean);
  const passwordsMatch = newPassword === confirmPassword && newPassword !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isPasswordValid) {
      toast({
        title: "Contraseña no cumple políticas",
        description: "Revisa que cumpla todos los requisitos de seguridad",
        variant: "destructive"
      });
      return;
    }

    if (!passwordsMatch) {
      toast({
        title: "Contraseñas no coinciden",
        description: "Asegúrate de que ambas contraseñas sean iguales",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simular cambio de contraseña
    setTimeout(() => {
      toast({
        title: "Contraseña actualizada",
        description: "Tu contraseña ha sido cambiada exitosamente. Se invalidarán todas las sesiones activas.",
      });
      setIsLoading(false);
      navigate("/dashboard");
    }, 2000);
  };

  const getPolicyIcon = (valid: boolean) => {
    return valid ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-red-500" />
    );
  };

  const getPolicyColor = (valid: boolean) => {
    return valid ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 flex items-center justify-center p-4">
             <Card className="w-full max-w-2xl shadow-elegant rounded-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <img src={logo} alt="Universidad Icesi" className="h-16 w-auto" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">
              {isFirstLogin ? "Primer Ingreso" : "Cambiar Contraseña"}
            </CardTitle>
            <CardDescription className="text-base mt-2">
              {isFirstLogin 
                ? "Bienvenido al Sistema de Planeación Académica" 
                : "Actualiza tu contraseña de acceso"
              }
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {/* Información del usuario */}
          <div className="bg-muted/30 p-4 rounded-lg mb-6">
            <div className="flex items-center gap-3 mb-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{userData.nombre}</p>
                <p className="text-sm text-muted-foreground">{userData.rol} - {userData.programa}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{userData.correo}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isFirstLogin && (
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Contraseña Actual</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="h-12 pr-10 rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="newPassword">
                {isFirstLogin ? "Nueva Contraseña" : "Nueva Contraseña"}
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="h-12 pr-10 rounded-lg"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="h-12 pr-10 rounded-lg"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Políticas de contraseña */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Políticas de Seguridad</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className={`flex items-center gap-2 ${getPolicyColor(passwordPolicy.minLength)}`}>
                  {getPolicyIcon(passwordPolicy.minLength)}
                  <span>Mínimo 8 caracteres</span>
                </div>
                <div className={`flex items-center gap-2 ${getPolicyColor(passwordPolicy.hasUppercase)}`}>
                  {getPolicyIcon(passwordPolicy.hasUppercase)}
                  <span>Al menos una mayúscula</span>
                </div>
                <div className={`flex items-center gap-2 ${getPolicyColor(passwordPolicy.hasLowercase)}`}>
                  {getPolicyIcon(passwordPolicy.hasLowercase)}
                  <span>Al menos una minúscula</span>
                </div>
                <div className={`flex items-center gap-2 ${getPolicyColor(passwordPolicy.hasNumber)}`}>
                  {getPolicyIcon(passwordPolicy.hasNumber)}
                  <span>Al menos un número</span>
                </div>
                <div className={`flex items-center gap-2 ${getPolicyColor(passwordPolicy.hasSpecial)}`}>
                  {getPolicyIcon(passwordPolicy.hasSpecial)}
                  <span>Al menos un carácter especial</span>
                </div>
                <div className={`flex items-center gap-2 ${getPolicyColor(passwordPolicy.notReused)}`}>
                  {getPolicyIcon(passwordPolicy.notReused)}
                  <span>No reutilizar últimas 3 contraseñas</span>
                </div>
              </div>
            </div>

            {/* Indicador de fortaleza */}
            {newPassword && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Fortaleza de la contraseña</span>
                  <span className={getPolicyColor(isPasswordValid)}>
                    {isPasswordValid ? "Fuerte" : "Débil"}
                  </span>
                </div>
                <Progress 
                  value={Object.values(passwordPolicy).filter(Boolean).length * 16.67} 
                  className="h-2"
                />
              </div>
            )}

            {/* Coincidencia de contraseñas */}
            {confirmPassword && (
              <div className={`flex items-center gap-2 text-sm ${getPolicyColor(passwordsMatch)}`}>
                {getPolicyIcon(passwordsMatch)}
                <span>
                  {passwordsMatch ? "Las contraseñas coinciden" : "Las contraseñas no coinciden"}
                </span>
              </div>
            )}

            {/* Advertencia */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Al cambiar tu contraseña, se invalidarán todas las sesiones activas en otros dispositivos.
                Recibirás una notificación por correo electrónico.
              </AlertDescription>
            </Alert>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium rounded-lg"
              disabled={!isPasswordValid || !passwordsMatch || isLoading}
            >
              {isLoading ? (
                <>
                  <Lock className="h-4 w-4 mr-2 animate-spin" />
                  Actualizando...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  {isFirstLogin ? "Completar Configuración" : "Cambiar Contraseña"}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
