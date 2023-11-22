import { Avatar, Button, message } from "antd";
import { IUser } from "../../interfaces/user/user.interface";
import { useNavigate } from "react-router-dom";
import { ReservationService } from "../../services/reservation.service";
import { useState } from "react";

interface Props {
  user: IUser;
}

const reservationService = new ReservationService(process.env.REACT_APP_BACKEND_URL!);

export const UserCard = (props: Props) => {
  const [loading, setLoading] = useState(false);

  const deleteUser = async () => {
    setLoading(true);
    reservationService
      .deleteUser(props.user.id)
      .then((res) => {
        message.success("Usuario Borrado");
      })
      .catch(() => {
        message.error("Error al borrar usuario");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const nav = useNavigate();

  return (
    <div
      style={{
        padding: 20,
        width: 300,
        margin: 10,
        borderRadius: 20,
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        background: " linear-gradient(to right, #00b4db, #0083b0)",
        color: "white",
      }}
    >
      <Avatar src={props.user.profileImage} />
      <h4>{props.user.name}</h4>
      <p>
        {props.user.country}/{props.user.department}
      </p>
      <p>{props.user.email}</p>
      <p>fcmToken: {props.user.fcmToken != "" ? "yes" : "no"} </p>
      <p>Loyalty Points: {props.user.loyaltyPoints}</p>
      {props.user.emailVerified ? (
        <p style={{ color: "lime" }}>email verified</p>
      ) : (
        <p style={{ color: "red" }}>email not verified</p>
      )}
      <Button
        type="primary"
        loading={loading}
        onClick={() => {
          nav("/admin-panel/reservations", { state: { user: props.user } });
        }}
        style={{ marginRight: "10px" }}
      >
        Ver Reservas
      </Button>
      <Button
        type="primary"
        loading={loading}
        onClick={() => {
          nav("/admin-panel/business", { state: { user: props.user } });
        }}
      >
        Ver Negocios
      </Button>
      <hr></hr>
      <Button type="primary" loading={loading} danger onClick={deleteUser}>
        Borrar Usuario
      </Button>
    </div>
  );
};
