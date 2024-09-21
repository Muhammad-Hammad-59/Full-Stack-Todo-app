const { todo } = require("./model");

const getalltodo = async (req, res) => {
  try {
    const alltodos = await todo.find();

    if (!alltodos.length) {
      res.status(404).json({ message: "No todo found" });
    }
    res.status(202).json(alltodos);
  } catch (error) {
    console.log("error message", error.message);
    return res.status(500).json({ error: error.message });
  }
};

const addtodo = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { data } = req.body;
    console.log("Request Data:", data);
    if (!data) {
      return res.status(400).json({ error: "Data field is required" });
    }

    const newtodo = new todo({ data });

    await newtodo.save();

    return res.status(201).json(newtodo);
  } catch (error) {
    console.log("error message", error.message);
    return res.status(500).json({ error: error.message });
  }
};

const updatetodo = async (req, res) => {
  try {
    const { data,done } = req.body;
    const id = req.params.id;
    console.log("done value: ", done, "id:", id,"data:",data);

    const updatetodo = await todo.findByIdAndUpdate(
      id,
      {data:data, done:done},
       
      { new: true }
    );

    // todo.update({ data }, { where: { id } });

    return res.status(200).json(updatetodo);
  } catch (error) {
    console.log("error in patch request");
    return res.status(500).json({ error: error.message });
  }
};

const deletetodo = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await todo.findById(id);
    console.log("user value:", user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await todo.findByIdAndDelete(id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addtodo, updatetodo, deletetodo, getalltodo };
