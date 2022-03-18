import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";

const LocationPin = (props: any) => {
  const { color } = props;
  return (
    <div
      className="pin"
      style={{
        color: color,
        padding: "15px 10px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "100%",
        transform: "translate(-50%, -80%)",
      }}
    >
      <Icon icon={locationIcon} className="pin-icon" />
    </div>
  );
};

export default LocationPin;
