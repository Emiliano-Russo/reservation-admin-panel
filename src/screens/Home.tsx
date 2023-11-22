import { Typography, Divider, Button } from "antd";
import { Header } from "../components/Header";
import { AndroidFilled, AppleFilled } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export const Home = () => {
  return (
    <>
      <Header />
      <div style={{ padding: "5%", textAlign: "center" }}>
        <Paragraph>
          Bienvenido a <strong>Agenda Fácil</strong>, la solución definitiva para programar y gestionar tus citas y
          eventos con facilidad. Olvídate del estrés y deja que nosotros te ayudemos a organizar tu día a día.
        </Paragraph>
        <Divider />
        <Paragraph>
          Con nuestra herramienta intuitiva, puedes programar, reprogramar o cancelar citas en cuestión de segundos. Ya
          sea para negocios, salud o cualquier otro tipo de evento, Agenda Fácil está aquí para simplificar tu vida.
        </Paragraph>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            style={{
              width: "240px",
              marginTop: "20px",
              textAlign: "start",
              background: "#007AFF",
              color: "white",
            }}
            icon={<AppleFilled />}
            onClick={() =>
              (window.location.href = process.env.REACT_APP_IOS_DOWNLOAD_LINK
                ? process.env.REACT_APP_IOS_DOWNLOAD_LINK
                : "http://www.apple.com")
            }
          >
            ¡Empieza ahora en iOS!
          </Button>
          <Button
            style={{
              width: "240px",
              marginTop: "10px",
              textAlign: "start",
              background: "#3DDC84",
              color: "white",
            }}
            icon={<AndroidFilled />}
            onClick={() =>
              (window.location.href = process.env.REACT_APP_ANDROID_DOWNLOAD_LINK
                ? process.env.REACT_APP_ANDROID_DOWNLOAD_LINK
                : "http://www.android.com")
            }
          >
            ¡Empieza ahora en Android!
          </Button>
        </div>
      </div>
    </>
  );
};
