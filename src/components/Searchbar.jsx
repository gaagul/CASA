import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import { Search } from "@mui/icons-material";

const Searchbar = ({ handleSearch }) => {
  const [values, setValues] = useState({
    type: "",
    location: "",
  });

  return (
    <Box className="flex items-start">
      <TextField
        helperText="rent or buy"
        id="outlined-basic"
        label="Property Type"
        sx={{ mx: 1 }}
        variant="outlined"
        onChange={e => setValues({ ...values, type: e.target.value })}
      />
      <TextField
        helperText="zip code"
        id="outlined-basic"
        label="Search location"
        sx={{ mx: 1 }}
        variant="outlined"
        onChange={e => setValues({ ...values, location: e.target.value })}
      />
      <Button
        className="!h-14 !bg-indigo-500"
        size="large"
        startIcon={<Search />}
        sx={{ mx: 1 }}
        variant="contained"
        onClick={() => handleSearch(values)}
      >
        Search
      </Button>
    </Box>
  );
};
export default Searchbar;
