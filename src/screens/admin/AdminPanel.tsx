import { Button, Input, Pagination, message, Select } from "antd";
import { useEffect, useState } from "react";
import { UserService } from "../../services/user.service";
import { UserCard } from "../../components/User";
import { IUser } from "../../interfaces/user/user.interface";
import { PaginatedResponse } from "../../interfaces/pagination.dto";
import { useNavigate } from "react-router-dom";
import { countries } from "../../utils/countries";

const { Option } = Select;

const userService = new UserService(process.env.REACT_APP_BACKEND_URL!);

interface UserCount {
  country: string;
  department: string;
  userCount: number;
}

export const AdminPanel = () => {
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<PaginatedResponse<IUser> | undefined>(undefined);
  const [limit, setLimit] = useState("10");
  const [page, setPage] = useState("1");
  const [country, setCountry] = useState("Uruguay");
  const [searchTerm, setSearchTerm] = useState("");
  const [usersCount, setUsersCount] = useState<UserCount[]>([]);

  useEffect(() => {
    // Verificar si el token ya está en localStorage al cargar el componente
    const token = localStorage.getItem("token");
    console.log("token: ", token);
    if (token) {
      // Si el token existe, asumir que la contraseña ya fue ingresada correctamente
      setPassword("saborcito");
    }
  }, []);

  const handlePasswordSubmit = (pass: string) => {
    setPassword(pass);
    if (pass === "saborcito") {
      // Aquí guardas el token en localStorage
      console.log("setting saborcito: ");
      localStorage.setItem("token", "saborcito");
    } else {
      // Manejo de contraseña incorrecta
      console.error("incorrecto");
    }
  };

  if (password !== "saborcito") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Token</h1>
        <Input.Password
          style={{ width: "50%" }}
          placeholder="Password"
          onChange={(e) => handlePasswordSubmit(e.target.value)}
        />
      </div>
    );
  }

  const getUsers = async () => {
    userService
      .getUsers({ country: country, limit: limit, page: page, searchTerm: searchTerm })
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
        message.success("usuarios traidos con exito");
      })
      .catch((err) => {
        console.log("error: ", err);
        message.error("error al traer usuarios");
      });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ textAlign: "center" }}>Admin Panel</h1>
      {/* Sección para mostrar el conteo de usuarios */}
      <div style={{ marginBottom: "20px" }}>
        {usersCount.length === 0 ? (
          <Button
            onClick={() => {
              userService.getAmoutUsers().then((res) => {
                console.log("res: ", res.data);
                setUsersCount(res.data);
              });
            }}
          >
            Mostrar Estadisticas
          </Button>
        ) : (
          <>
            <h2>Conteo de Usuarios por País y Departamento</h2>
            <div>
              {usersCount.map((count) => (
                <div key={`${count.country}-${count.department}`}>
                  <p>
                    País: {count.country}, Departamento: {count.department}, Usuarios: {count.userCount}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div
        style={{
          border: "1px solid green",
          padding: "20px",
          borderRadius: 10,
          width: "80%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Usuarios</h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            width: "80%",
            marginBottom: "20px",
          }}
        >
          <div>
            <p>Country</p>
            <Select
              style={{ marginTop: "5px" }}
              placeholder="Selecciona un país"
              value={country}
              onChange={(val) => {
                setCountry(val as string);
              }}
            >
              {countries.map((country) => (
                <Option key={country} value={country}>
                  {country}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <p>Search Name</p>
            <Input
              style={{ width: 100 }}
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <p>Limit</p>
            <Input
              style={{ width: 100 }}
              placeholder="Limit"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            />
          </div>
          <div>
            <p>Page</p>
            <Input style={{ width: 100 }} placeholder="Page" value={page} onChange={(e) => setPage(e.target.value)} />
          </div>
        </div>
        <Button type="primary" style={{ marginTop: "10px" }} onClick={() => getUsers()}>
          Buscar
        </Button>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
          {users == undefined
            ? null
            : users.items.map((user) => {
                return <UserCard user={user} />;
              })}
        </div>
      </div>
    </div>
  );
};
