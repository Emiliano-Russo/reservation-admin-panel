import { Typography } from "antd";
import { Header } from "../components/Header";

const { Title, Paragraph } = Typography;

export const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <div style={{ padding: "0px 5%", textAlign: "left" }}>
        <Title level={2}>Política de Privacidad de Agenda Fácil</Title>
        <Paragraph>
          <strong>Fecha de última actualización:</strong> 11/10/2023
        </Paragraph>

        <Title level={3}>1. Información que recopilamos</Title>
        <Paragraph>
          Al registrarse en Agenda Fácil, solicitamos a los usuarios que
          proporcionen su nombre, documento de identidad, dirección de correo
          electrónico, una foto o avatar a elección y contraseña. También
          recopilamos información sobre el país o zona del usuario para mostrar
          negocios relevantes en su región.
          <br />
          Además, para los usuarios que registran un negocio, recopilamos
          información relacionada con el negocio, como horarios, ubicación y
          tipo de negocio.
        </Paragraph>

        <Title level={3}>2. Cómo utilizamos la información</Title>
        <Paragraph>
          Utilizamos la información proporcionada para permitir a los usuarios
          hacer y gestionar reservas, y para que los negocios puedan identificar
          a los clientes que han hecho reservas. También utilizamos la ubicación
          del usuario para mostrar negocios relevantes en su área.
        </Paragraph>

        <Title level={3}>3. Protección de datos</Title>
        <Paragraph>
          La seguridad de tus datos es importante para nosotros. La contraseña
          del usuario se almacena de forma encriptada y tomamos medidas de
          seguridad para proteger contra el acceso no autorizado, alteración,
          divulgación o destrucción de tu información personal.
        </Paragraph>

        <Title level={3}>4. Derechos del usuario</Title>
        <Paragraph>
          Los usuarios tienen el derecho de acceder, corregir o eliminar su
          información personal en cualquier momento. Para hacerlo, pueden
          ponerse en contacto con nosotros a través de [tu dirección de correo
          electrónico o método de contacto preferido].
        </Paragraph>

        <Title level={3}>5. Cambios en esta política</Title>
        <Paragraph>
          Podemos actualizar nuestra política de privacidad de vez en cuando.
          Cualquier cambio en esta política se publicará en esta página y, si
          los cambios son significativos, proporcionaremos una notificación más
          prominente.
        </Paragraph>

        <Title level={3}>6. Contacto</Title>
        <Paragraph>
          Si tienes preguntas sobre esta política de privacidad, contáctanos a
          través de <strong>equipo@agendafacil.org</strong>
        </Paragraph>
      </div>
    </>
  );
};
