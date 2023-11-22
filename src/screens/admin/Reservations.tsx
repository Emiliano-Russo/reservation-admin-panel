import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ReservationService } from "../../services/reservation.service";
import { Button, Input, message } from "antd";
import { IReservation } from "../../interfaces/reservation/reservation.interface";
import { PaginatedResponse } from "../../interfaces/pagination.dto";

const reservationService = new ReservationService(process.env.REACT_APP_BACKEND_URL!);

export const Reservations = () => {
  const [reservations, setReservations] = useState<PaginatedResponse<IReservation> | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const user = location.state?.user;
  console.log("user! ", user);

  const findReservations = async () => {
    setLoading(true);
    reservationService
      .getReservationsByUserId(user.id, { limit: limit, page: page }, search)
      .then((res) => {
        console.log("RES RESERVATION: ", res);
        setReservations(res);
        message.success("Reservas Traidas");
      })
      .catch((err) => {
        message.error("Error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteReservation = (id: string) => {
    console.log("Delete reservation");
    reservationService
      .removeReservation(id)
      .then(() => {
        message.success("Reserva Eliminada");
        setReservations((prev: any) => {
          const clonedPrev = { ...prev };
          clonedPrev.items = clonedPrev.items?.filter((res) => res.id != id);
          return clonedPrev;
        });
      })
      .catch(() => {
        message.error("error");
      });
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <h1>
        Reservas de <strong>{user.name}</strong>
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "space-around",
          width: "80%",
          marginBottom: "20px",
        }}
      >
        <div>
          <p>Page</p>
          <Input value={page} onChange={(e) => setPage(parseInt(e.target.value))} />
        </div>
        <div>
          <p>Limit</p>
          <Input value={limit} onChange={(e) => setLimit(parseInt(e.target.value))} />
        </div>
        <div>
          <p>Nombre del Negocio</p>
          <Input value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <Button loading={loading} type="primary" onClick={findReservations}>
        Buscar
      </Button>
      <main>
        {reservations == undefined ? (
          <h3>...</h3>
        ) : (
          reservations.items.map((reserv) => {
            return (
              <div style={{ border: "1px solid black", padding: "10px", margin: "10px", borderRadius: "20px" }}>
                <p>ID: {reserv.id}</p>
                <p style={{ color: "gray" }}>Negocio: {reserv.business.name} </p>
                <p style={{ color: "gray" }}>Estado: {reserv.status} </p>
                <p style={{ color: "gray" }}>Comentario: {reserv.comment} </p>
                <p style={{ color: "gray" }}>Es Negociable: {reserv.negotiable ? "SI" : "NO"} </p>
                <p style={{ color: "gray" }}>Fecha Reservacion: {new Date(reserv.reservationDate).toDateString()}</p>
                <p style={{ color: "gray" }}>Creada el: {new Date(reserv.createdAt).toDateString()}</p>
                <Button danger onClick={() => deleteReservation(reserv.id)}>
                  Eliminar
                </Button>
              </div>
            );
          })
        )}
      </main>
    </div>
  );
};
