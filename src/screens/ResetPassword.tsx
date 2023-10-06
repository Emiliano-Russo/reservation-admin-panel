import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserService } from "../services/user.service";
import { message, Spin, Result, Button, Input, Form, Typography } from "antd";
import { Header } from "../components/Header";

const userService = new UserService(process.env.REACT_APP_BACKEND_URL!);

type Phase = "loading" | "error" | "success" | "form";

const { Title, Paragraph } = Typography;

export const ResetPassword = () => {
  const [transaction, setTransaction] = useState<Phase>("form");
  const [newPassword, setNewPassword] = useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const verifyToken = async () => {
    if (token != null) {
      try {
        const result = await userService.verifyResetToken(token);
        setTransaction("form");
      } catch (err) {
        message.error("Token inválido o expirado");
        setTransaction("error");
      }
    } else {
      setTransaction("error");
    }
  };

  const handleSubmit = async () => {
    try {
      await userService.resetPassword(token!, newPassword);
      message.success("Contraseña actualizada con éxito!");
      setTransaction("success");
    } catch (err) {
      message.error("Error al actualizar la contraseña");
      setTransaction("error");
    }
  };

  useEffect(() => {
    //verifyToken();
  }, []);

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2%",
        }}
      >
        {transaction === "loading" && (
          <>
            <h1>Cargando</h1>
            <Spin size="large" />
          </>
        )}

        {transaction === "error" && (
          <Result
            status="error"
            title="¡Algo salió mal!"
            subTitle="El enlace que utilizaste es inválido o ha expirado. Por favor, intenta solicitar un nuevo enlace para restablecer tu contraseña."
          />
        )}

        {transaction === "form" && (
          <>
            <Title level={2}>Restablecer Contraseña</Title>
            <Paragraph>
              Por favor, introduce tu nueva contraseña para completar el proceso
              de restablecimiento.
            </Paragraph>
            <Form
              onFinish={handleSubmit}
              style={{
                width: "100%",
                maxWidth: "400px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Form.Item
                label="Nueva Contraseña"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa tu nueva contraseña!",
                  },
                ]}
              >
                <Input.Password
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{ maxWidth: "200px" }}
                >
                  Restablecer Contraseña
                </Button>
              </Form.Item>
            </Form>
          </>
        )}

        {transaction === "success" && (
          <Result
            status="success"
            title="¡Contraseña restablecida con éxito!"
            subTitle="Tu contraseña ha sido actualizada. Ahora puedes iniciar sesión con tu nueva contraseña."
          />
        )}
      </div>
    </>
  );
};
