import React from 'react';
import { Box } from "@mui/material";
import { usersAPI } from "../../services/rtk/UsersApi";

function UsersPage() {

  const { data, isLoading } = usersAPI.useGetAllUsersQuery({});

  console.log('users  = ', data)

  return isLoading ? <>Loading...</> : (
    <Box>Users page</Box>
  )
}

export default UsersPage;