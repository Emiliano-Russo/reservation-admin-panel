import { Typography, Divider, Button } from "antd";

const { Title, Paragraph } = Typography;

export const Home = () => {
  return (
    <div style={{ padding: "5%", textAlign: "center" }}>
      <Title level={1}>Agenda Fácil</Title>
      <Paragraph>
        Bienvenido a <strong>Agenda Fácil</strong>, la solución definitiva para
        programar y gestionar tus citas y eventos con facilidad. Olvídate del
        estrés y deja que nosotros te ayudemos a organizar tu día a día.
      </Paragraph>
      <Divider />
      <Paragraph>
        Con nuestra herramienta intuitiva, puedes programar, reprogramar o
        cancelar citas en cuestión de segundos. Ya sea para negocios, salud o
        cualquier otro tipo de evento, Agenda Fácil está aquí para simplificar
        tu vida.
      </Paragraph>
      <Button type="primary" size="large">
        Descubre más
      </Button>
    </div>
  );
};
