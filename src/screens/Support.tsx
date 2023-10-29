import React from "react";
import { Header } from "../components/Header";
import { Button, Collapse, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

const { Panel } = Collapse;

export const Support = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Header />
      <h1>Soporte</h1>
      <p style={{ width: "50%", textAlign: "center" }}>
        Bienvenido a la página de soporte de nuestra aplicación de reservas.
        Aquí encontrarás respuestas a las preguntas más comunes sobre cómo
        reservar en restaurantes, barberías, canchas de fútbol, peluquerías y
        más. Si tienes alguna otra consulta, no dudes en contactarnos.
      </p>

      <h2>Preguntas Frecuentes (FAQs)</h2>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="¿Cómo hago una reserva?" key="1">
          <p>
            Para hacer una reserva, selecciona la categoría deseada (por
            ejemplo, "Restaurantes"), luego elige un establecimiento y
            selecciona la fecha y hora que prefieras. Finalmente, confirma tu
            reserva.
          </p>
        </Panel>
        <Panel header="¿Cómo me notificarán sobre mi reserva?" key="2">
          <p>
            Recibirás una notificación en la aplicación cuando tu reserva sea
            confirmada por el establecimiento. Asegúrate de tener activadas las
            notificaciones para nuestra aplicación.
          </p>
        </Panel>
        <Panel header="¿Cómo puedo cancelar una reserva?" key="3">
          <p>
            Ve a la sección "Mis Reservas", selecciona la reserva que deseas
            cancelar y haz clic en el botón "Cancelar". Ten en cuenta las
            políticas de cancelación del establecimiento.
          </p>
        </Panel>
        <Panel
          header="¿Qué son los puntos de fidelidad y cómo los obtengo?"
          key="4"
        >
          <p>
            Los puntos de fidelidad se otorgan por cada reserva que realices y
            se confirme. Puedes canjear estos puntos por descuentos y otras
            recompensas en establecimientos asociados.
          </p>
        </Panel>
      </Collapse>
      <div
        style={{
          width: "50%",
          marginTop: "2em",
          textAlign: "center",
          marginBottom: "100px",
        }}
      >
        <h2>Contacto por Correo</h2>
        <p>
          Si tienes alguna pregunta o inquietud, no dudes en enviarnos un correo
          a:
        </p>
        <a
          href="mailto:equipo@agendafacil.org"
          style={{ fontSize: "1.2em", fontWeight: "bold" }}
        >
          equipo@agendafacil.org
        </a>
      </div>
    </div>
  );
};
