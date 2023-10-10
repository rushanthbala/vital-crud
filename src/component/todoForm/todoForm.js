import { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  styled,
  Grid,
} from "@mui/material";
import { getUsers, deleteUser } from "../../Service/api";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";

const StyledTable = styled(Table)`
  width: 90%;
  margin: 50px 0 0 50px;
`;

const THead = styled(TableRow)`
  & > th {
    font-size: 20px;
    background: #1976d2;
    color: #ffffff;
  }
`;

const TRow = styled(TableRow)`
  & > td {
    font-size: 18px;
  }
`;

const TodoForm = () => {
  const [users, setUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState([]);
  const [SearchingText, setSearchingText] = useState("");
  const [Loading, setLoading] = useState(true);
  const [DisableDeleteBtn, setDisableDeleteBtn] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, []);

  const deleteUserData = async (id) => {
    try {
      setDisableDeleteBtn(true);
      await deleteUser(id).then(setDisableDeleteBtn(false));
      getAllUsers();
    } catch (error) {}
  };

  const getAllUsers = async () => {
    let response = await getUsers("api/todo")
      .then((res) => {
        setLoading(false);
        setSearchUsers(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        setLoading(true);
      });
    console.log(response);
  };
  const onsearch = (e) => {
    setSearchingText(e.target.value);
    console.log(e.target.value, users[0]);
    let filterData = users.filter(
      (item) =>
        String(item.name.toUpperCase()).startsWith(
          e.target.value.toUpperCase()
        ) || String(item.name).startsWith(e.target.value)
    );

    if (filterData.length > 0) {
      setSearchUsers(filterData);
    }
  };
  return (
    <div>
      <br />
      <br />
      <Grid container>
        <Grid item xs={6}></Grid>
        <Grid item xs={5}>
          <input
            type="text"
            class="form-control"
            placeHolder="Type here..."
            onChange={onsearch}
            value={SearchingText}
            style={{
              width: "100%",
              backgroundColor: "#fff",
              color: "#000 !important",
              padding: "14px 20px",
              margin: "8px 0",
              borderRadius: "4px",
              cursor: "pointer",
              border: "1px soild red",
            }}
          />
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
      <div style={{ overflowX: "auto" }}>
        {!Loading ? (
          <StyledTable>
            <TableHead>
              <THead>
                <TableCell>No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell></TableCell>
              </THead>
            </TableHead>

            <TableBody>
              {searchUsers &&
                searchUsers.map((user, i) => (
                  <TRow key={user._id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.description}</TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        variant="contained"
                        style={{ marginRight: 10 }}
                        component={Link}
                        to={`/todo/edit/${user._id}`}
                      >
                        EDIT
                      </Button>
                      <Button
                        sx={{ backgroundColor: "#B33A3A" }}
                        color="secondary"
                        variant="contained"
                        onClick={() => deleteUserData("api/todo/" + user._id)}
                        disabled={DisableDeleteBtn}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TRow>
                ))}
            </TableBody>
          </StyledTable>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default TodoForm;
