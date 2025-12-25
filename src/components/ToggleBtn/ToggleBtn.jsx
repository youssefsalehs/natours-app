import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function ToggleBtn({ active, handleClick, isPending }) {
  return (
    <div>
      <FormControlLabel
        sx={{ display: "block" }}
        control={
          <Switch
            checked={active.active}
            onChange={handleClick}
            disabled={isPending}
            name="active"
            color="primary"
          />
        }
      />
    </div>
  );
}
