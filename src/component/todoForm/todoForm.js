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
  Box,
} from "@mui/material";
import { getUsers, deleteUser } from "../../Service/api";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";

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
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    console.log(user._id);
    getAllUsers(user._id);
  }, [user]);

  const deleteUserData = async (id) => {
    try {
      setDisableDeleteBtn(true);
      await deleteUser(id).then(setDisableDeleteBtn(false));
      getAllUsers(user._id);
    } catch (error) {}
  };

  const getAllUsers = async (id) => {
    let response = await getUsers("api/todo/byuser/" + id)
      .then((res) => {
        setLoading(false);
        setSearchUsers(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        setLoading(false);
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

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  return (
    <div>
      <br />
      <br />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
          justifyContent="space-between"
        >
          <Grid item xs={2} sm={4} md={4} alignItems="flex-end" Í>
            <input
              type="text"
              class="form-control"
              placeHolder="Type here..."
              onChange={onsearch}
              value={SearchingText}
              style={{
                width: "100%",
                backgroundColor: "#fff",
                color: "#1976d2 !important",
                padding: "14px 10px",
                borderRadius: "4px",
                cursor: "pointer",
                border: "1px solid #1976d2",
                height: "36px",
              }}
            />
            {/* <Item>dlfjklsfksfashfjkwh=2</Item> */}
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Link
              to="/todo/add"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button
                component="label"
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  width: "100%",
                }}
              >
                Adds
                <VisuallyHiddenInput type="file" />
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>

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
                        style={{
                          marginRight: 10,
                          width: "100px",
                          margin: "2px",
                        }}
                        component={Link}
                        to={`/todo/edit/${user._id}`}
                      >
                        EDIT
                      </Button>
                      <Button
                        style={{
                          backgroundColor: "#B33A3A",
                          width: "100px",
                          margin: "2px",
                        }}
                        variant="contained"
                        onClick={() => deleteUserData("api/todo/" + user._id)}
                        disabled={DisableDeleteBtn}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TRow>
                ))}
              {users.length === 0 && (
                  <THead>
                    <TableCell align="center"  colSpan={12}>No Data</TableCell>
                  </THead>
              )}
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
