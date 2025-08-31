import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  Mail,
  ArrowLeft,
  Send,
  Key
} from "lucide-react";
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

type Step = 'email' | 'code' | 'password';

export default function RecuperarContrasena() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState<Step>('email');
  const [email, setEmail] = useState(location.state?.email || "");
  const [verificationCode, setVerificationCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    // Validar políticas de contraseña
    const policy = {
      minLength: newPassword.length >= 8,
      hasUppercase: /[A-Z]/.test(newPassword),
      hasLowercase: /[a-z]/.test(newPassword),
      hasNumber: /\d/.test(newPassword),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
      notReused: newPassword !== "Temp123!"
    };
    setPasswordPolicy(policy);
  }, [newPassword]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const isPasswordValid = Object.values(passwordPolicy).every(Boolean);
  const passwordsMatch = newPassword === confirmPassword && newPassword !== "";

  const handleSendCode = async () => {
    if (!email.endsWith("@icesi.edu.co")) {
      toast({
        title: "Correo inválido",
        description: "Usa tu correo institucional (@icesi.edu.co)",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simular envío de código
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep('code');
      setCountdown(60);
      toast({
        title: "Código enviado",
        description: "Revisa tu correo electrónico para el código de verificación",
      });
    }, 2000);
  };

  const handleVerifyCode = async () => {
    if (verificationCode.length !== 6) {
      toast({
        title: "Código inválido",
        description: "El código debe tener 6 dígitos",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simular verificación
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep('password');
      toast({
        title: "Código verificado",
        description: "Ahora puedes crear tu nueva contraseña",
      });
    }, 1500);
  };

  const handleCreatePassword = async () => {
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
        description: "Tu contraseña ha sido cambiada exitosamente. Redirigiendo al login...",
      });
      setIsLoading(false);
      navigate("/login");
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

  const renderStep = () => {
    switch (currentStep) {
      case 'email':
        return (
          <div className="space-y-4">
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

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Se enviará un código de verificación a tu correo institucional.
              </AlertDescription>
            </Alert>

            <Button
              onClick={handleSendCode}
              className="w-full h-12 text-base font-medium rounded-lg"
              disabled={isLoading || !email}
            >
              {isLoading ? (
                <>
                  <Send className="h-4 w-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Código
                </>
              )}
            </Button>
          </div>
        );

      case 'code':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Código de verificación</Label>
              <Input
                id="code"
                type="text"
                placeholder="123456"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                required
                className="h-12 text-center text-lg font-mono rounded-lg"
              />
            </div>

            <div className="text-center text-sm text-muted-foreground">
              {countdown > 0 ? (
                <p>Reenviar código en {countdown}s</p>
              ) : (
                <Button
                  variant="link"
                  onClick={handleSendCode}
                  className="p-0 h-auto"
                >
                  Reenviar código
                </Button>
              )}
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Ingresa el código de 6 dígitos enviado a {email}
              </AlertDescription>
            </Alert>

            <Button
              onClick={handleVerifyCode}
              className="w-full h-12 text-base font-medium rounded-lg"
              disabled={isLoading || verificationCode.length !== 6}
            >
              {isLoading ? (
                <>
                  <Key className="h-4 w-4 mr-2 animate-spin" />
                  Verificando...
                </>
              ) : (
                <>
                  <Key className="h-4 w-4 mr-2" />
                  Verificar Código
                </>
              )}
            </Button>
          </div>
        );

      case 'password':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nueva Contraseña</Label>
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
              <div className="grid grid-cols-1 gap-2 text-sm">
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

            <Button
              onClick={handleCreatePassword}
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
                  Crear Contraseña
                </>
              )}
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elegant rounded-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <img src={logo} alt="Universidad Icesi" className="h-16 w-auto" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">
              {currentStep === 'email' && 'Recuperar Contraseña'}
              {currentStep === 'code' && 'Verificar Código'}
              {currentStep === 'password' && 'Crear Nueva Contraseña'}
            </CardTitle>
            <CardDescription className="text-base mt-2">
              {currentStep === 'email' && 'Ingresa tu correo institucional'}
              {currentStep === 'code' && 'Verifica tu identidad'}
              {currentStep === 'password' && 'Crea una contraseña segura'}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Button
            variant="ghost"
            onClick={() => {
              if (currentStep === 'email') {
                navigate('/');
              } else if (currentStep === 'code') {
                setCurrentStep('email');
              } else {
                setCurrentStep('code');
              }
            }}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>

          {renderStep()}
        </CardContent>
      </Card>
    </div>
  );
}
