import { useLocation } from "react-router-dom";
import { MailService } from "../services/mail.service";
import { useEffect } from "react";
import { message } from "antd";

const mailServie = new MailService(process.env.REACT_APP_BACKEND_URL!);

export const ConfirmEmail = () => {
  // Usar el hook useLocation para obtener el objeto location
  const location = useLocation();

  // Usar URLSearchParams para obtener el token de la cadena de consulta
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  console.log("Token: ", token);

  const sendToken = async () => {
    console.log("sending token...");
    if (token != null)
      mailServie
        .confirmEmail(token)
        .then((val) => {
          message.success("Mail confimado!");
        })
        .catch((err) => {
          message.error("Error al confirmar");
        });
  };

  useEffect(() => {
    sendToken();
  }, []);

  return (
    <>
      <h1>Confirm Email</h1>
      {token}
    </>
  );
};
