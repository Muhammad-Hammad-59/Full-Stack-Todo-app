import { Box, Typography, TextField, Fab, Divider } from "@mui/material";
import React from "react";
import { grey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";

import { useState, useContext } from "react";
import { TodoContext } from "./Context";

 
const Additem = () => {
  const todostate = useContext(TodoContext);

  const [error, setError] = useState(false);

  const handlenewtodo = (e) => {
    todostate.setInputvalue(e.target.value);
  };
  const uri=process.env.REACT_APP_API_URL;
  const sendpostreq = async () => {
    try {
      const value = todostate.inputvalue;
      console.log(value);
      if (!value) {
        setError(true);
        return;
      }
      const response = await fetch(`${uri}/api/todo`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },

        body: JSON.stringify({ data: value }),
      });

      const result = await response.json();
      console.log("POST response:", result);
      todostate.setAlltodos((prevTodos) => [...prevTodos, result]);
      todostate.setInputvalue("");
    } catch (error) {
      console.error("Error submitting todo:", error);
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        mt: 8,
        boxShadow: 3,
        p: 4,
        backgroundColor: grey[50],
        gap: 1,
      }}
      position="sticky"
    >
      <Typography
        variant="body1"
        sx={{
          color: grey[600],
          fontSize: "1rem",
          fontWeight: "400",
          letterSpacing: "0.05em",
        }}
      >
        ADD ITEM
      </Typography>

      <Divider
        sx={{
          height: "15px",
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          mt: 2,
        }}
      >
        <TextField
          id="standard-multiline-flexible"
          label="What do you want to do"
          variant="standard"
          multiline
          maxRows={3}
          sx={{ width: "650px" }}
          value={todostate.inputvalue}
          onChange={handlenewtodo}
          onClick={() => setError(false)}
          error={error}
          helperText={error ? "This field is required." : ""}
        />
        <Fab color="primary" aria-label="add" onClick={sendpostreq}>
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  );
};

export default Additem;
