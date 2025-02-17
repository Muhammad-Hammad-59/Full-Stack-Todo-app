import {
  Box,
  Typography,
  Divider,
  Checkbox,
  Dialog,
  DialogTitle,
  Fab,
  DialogContent,
  TextField,
} from "@mui/material";
import React from "react";
import { grey } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect, useContext } from "react";
import { TodoContext } from "./Context";
import DoneIcon from "@mui/icons-material/Done";

const uri=process.env.REACT_APP_API_URL;

const Todolist = () => {
 console.log(`backend uri link:${uri}`)

  const [open, setOpen] = useState(false);
  const [updatevalue, setUpdatevalue] = useState({
    value: "",
    itemindex: "",
  });

  const handleClose = async () => {
    setOpen(false);
    const index = updatevalue.itemindex;
    const id = todosstate.alltodos[index]._id;
    try {
      const response = await fetch(`${uri}/api/todo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: updatevalue.value }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("post request is success:", data);

      todosstate.setAlltodos((prevAlltodos) => {
        const updatedTodos = [...prevAlltodos];
        updatedTodos[index] = {
          ...updatedTodos[index],
          data: updatevalue.value,
        };

        return updatedTodos;
      });
      setUpdatevalue({ value: "", itemindex: "" });
    } catch (error) {
      console.error("Error submitting todo:", error);
    }
  };

  const handleClickOpen = (index) => {
    setOpen(true);
    setUpdatevalue({
      value: todosstate.alltodos[index].data,
      itemindex: index,
    });
  };

  //   const [alltodos, setAlltodos] = useState([]);
  const todosstate = useContext(TodoContext);
  useEffect(() => {
    const gettodos = async () => {
      try {
        const response = await fetch(`${uri}/api/todo`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Response data before json():", response);
        const data = await response.json();

        console.log("Response data after json():", data);
        todosstate.setAlltodos(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    gettodos();
  }, []);

  const handleChange = async (index) => {
    const id = todosstate.alltodos[index]._id;
    const done = todosstate.alltodos[index].done;
    todosstate.alltodos[index].done = done ? false : true;

    try {
      const response = await fetch(`${uri}/api/todo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ done: todosstate.alltodos[index].done }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("post request is success:", data);

      todosstate.setAlltodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? data : todo))
      );
    } catch (error) {
      console.error("Error submitting todo:", error);
    }
  };

  async function handleDeleteclick(index) {
    console.log("hi delete", index);
    const id = todosstate.alltodos[index]._id;
    console.log("hi delete", id);

    const newlist = [...todosstate.alltodos];
    newlist.splice(index, 1);
    todosstate.setAlltodos(newlist);
    try {
      const response = await fetch(`${uri}/api/todo/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
    } catch (error) {
      console.error("Error submitting todo:", error);
    }
  }

  function handleupdate(e) {
     
    setUpdatevalue((prevState) => ({
      ...prevState,
      value: e.target.value,
    }));
  }

  return (
    <Box
      sx={{
        width: "100%",
        mt: 4,
        boxShadow: 3,
        p: 4,
        backgroundColor: grey[50],
        gap: 1,
      }}
    >
      <Box>
        <Typography
          variant="body1"
          sx={{
            color: grey[600],
            fontSize: "1rem",
            fontWeight: "400",
            letterSpacing: "0.05em",
          }}
        >
          TODO LIST
        </Typography>

        <Divider
          sx={{
            height: "15px",
          }}
        />
      </Box>
      {todosstate.alltodos.map((item, index) => (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Checkbox
              checked={item.done}
              onClick={() => handleChange(index)}
              inputProps={{ "aria-label": "controlled" }}
            />
            <Typography
              variant="body1"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "400px", // Adjust the width as per your requirement
              }}
            >
              {item.data}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <EditIcon
              sx={{
                color: "#a5d6a7",
              }}
              onClick={() => handleClickOpen(index)}
            />
            <DeleteIcon
              sx={{
                color: "#ef5350",
              }}
              onClick={() => handleDeleteclick(index)}
            />
          </Box>
        </Box>
      ))}

      <Dialog open={open} onClose={() => handleClose}>
        <DialogTitle>Edit Todo</DialogTitle>

        <DialogContent>
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
              label="Update Todo Details"
              variant="standard"
              multiline
              maxRows={3}
              sx={{ width: "650px" }}
              value={updatevalue.value}
              onChange={handleupdate}
            />
           
            <Fab
              color="primary"
              aria-label="add"
              style={{
                width: 50,
                height: 50,
                minWidth: 50,
                borderRadius: "50%",
              }}
              onClick={handleClose}
            >
              <DoneIcon />
            </Fab>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Todolist;
