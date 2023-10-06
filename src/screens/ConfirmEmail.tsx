import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MailService } from "../services/mail.service";
import { message, Spin, Result, Button } from "antd";
import { Header } from "../components/Header";

const mailService = new MailService(process.env.REACT_APP_BACKEND_URL!);

type Phase = "loading" | "error" | "success";

export const ConfirmEmail = () => {
  const [transaction, setTransaction] = useState<Phase>("loading");

  const location = useLocation();
  const nav = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const sendToken = async () => {
    if (token != null) {
      try {
        await mailService.confirmEmail(token);
        message.success("Mail Confirmado!");
        setTransaction("success");
      } catch (err) {
        message.error("Error al confirmar");
        setTransaction("error");
      }
    } else {
      setTransaction("error");
    }
  };

  useEffect(() => {
    sendToken();
  }, []);

  if (transaction === "loading") {
    return (
      <>
        <Header />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Cargando</h1>
          <Spin size="large" />
        </div>
      </>
    );
  }

  if (transaction === "error") {
    return (
      <>
        <Header />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Result
            status="error"
            title="¡Algo salió mal!"
            subTitle="El enlace que utilizaste es demasiado antiguo. Por favor, intenta reenviar el correo desde la aplicación para obtener un enlace más reciente."
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Result
          status="success"
          title="¡Correo confirmado con éxito!"
          subTitle="Gracias por confirmar tu dirección de correo electrónico. Ahora puedes continuar utilizando nuestra plataforma."
          extra={[
            <Button type="primary" key="console" onClick={() => nav("/")}>
              Ir al inicio
            </Button>,
            // Add any other buttons or actions you might want here
          ]}
        />
      </div>
    </>
  );
};
