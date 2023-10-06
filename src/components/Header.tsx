import image from "../assets/agenda-facil-transparente.png";

export const Header = () => {
  return (
    <div
      style={{
        background: "#ffa500",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img
        style={{ width: "200px", padding: "20px" }}
        src={image}
        alt="Description"
      />
    </div>
  );
};
