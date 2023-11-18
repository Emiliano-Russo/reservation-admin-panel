import { Avatar, Button, message } from "antd";
import { IUser } from "../interfaces/user/user.interface";
import { useNavigate } from "react-router-dom";
import { ReservationService } from "../services/reservation.service";

interface Props {
  user: IUser;
}

const reservationService = new ReservationService(process.env.REACT_APP_BACKEND_URL!);

export const UserCard = (props: Props) => {
  const deleteUser = async () => {
    reservationService
      .deleteUser(props.user.id)
      .then((res) => {
        message.success("Usuario Borrado");
      })
      .catch(() => {
        message.error("Error al borrar usuario");
      });
  };

  const nav = useNavigate();

  return (
    <div style={{ border: "1px solid black", padding: 20, width: 300, margin: 10, borderRadius: 20 }}>
      <Avatar src={props.user.profileImage} />
      <h4>{props.user.name}</h4>
      <p>
        {props.user.country}/{props.user.department}
      </p>
      <p>{props.user.email}</p>
      <p>fcmToken: {props.user.fcmToken != "" ? "yes" : "no"} </p>
      <p>Loyalty Points: {props.user.loyaltyPoints}</p>
      {props.user.emailVerified ? (
        <p style={{ color: "green" }}>email verified</p>
      ) : (
        <p style={{ color: "red" }}>email not verified</p>
      )}
      <Button
        onClick={() => {
          nav("/admin-panel/reservations", { state: { user: props.user } });
        }}
      >
        Ver Reservas
      </Button>
      <Button
        onClick={() => {
          nav("/admin-panel/business", { state: { user: props.user } });
        }}
      >
        Ver Negocios
      </Button>
      <hr></hr>
      <Button danger onClick={deleteUser}>
        Borrar Usuario
      </Button>
    </div>
  );
};
