import { Avatar, Button, Input, message } from "antd";
import { useLocation } from "react-router-dom";
import { BusinessService } from "../../services/business.service";
import { useState } from "react";
import { IBusiness } from "../../interfaces/business/business.interface";

const businessService = new BusinessService(process.env.REACT_APP_BACKEND_URL!);

export const Business = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [business, setBusiness] = useState<IBusiness[] | undefined>();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const user = location.state?.user;
  console.log("user! ", user);

  const findBusiness = async () => {
    if (user) {
      setLoading(true);
      businessService
        .getBusinessesByOwnerId(user.id, { limit: limit, page: page })
        .then((res) => {
          console.log("res: ", res);
          message.success("Negocios Traidos");
          setBusiness(res.items);
        })
        .catch(() => {
          message.error("error");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const deleteBusiness = async (idBusiness: string) => {
    if (user) {
      setLoading(true);
      businessService
        .removeBusiness(idBusiness)
        .then((res) => {
          message.success("Negocio Eliminado");
          setBusiness(business?.filter((bsns) => bsns.id !== idBusiness));
        })
        .catch((err) => {
          message.error("Error");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>Negocios de {user.name}</h1>
      <Avatar size={"large"} src={user.profileImage} />
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
      </div>
      <Button loading={loading} type="primary" onClick={findBusiness}>
        Buscar
      </Button>
      <div style={{ width: "80%", padding: "20px", margin: "10px" }}>
        {business?.map((bsns) => {
          return (
            <div
              style={{
                background: "whitesmoke",
                padding: "20px",
                margin: "20px",
                borderRadius: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                backgroundColor: "orange",
                color: "white",
              }}
            >
              <Avatar style={{ width: "100px", height: "100px", alignSelf: "center" }} src={bsns.logoURL} />
              <br></br>
              <img
                src={bsns.banner}
                style={{ width: "200px", height: "300px", alignSelf: "center", borderRadius: "10px" }}
              ></img>
              <h3>{bsns.name}</h3>
              <p>Pais: {bsns.country}</p>
              <p>Zona: {bsns.department}</p>
              <p>Direccion: {bsns.address}</p>
              <p>Descripcion: {bsns.description}</p>
              <p>Rating: {bsns.averageRating}</p>
              <p>Status: {bsns.status}</p>
              <p>TypeID: {bsns.typeId}</p>
              <hr></hr>
              <Button loading={loading} type="primary" danger onClick={() => deleteBusiness(bsns.id)}>
                Borrar
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
