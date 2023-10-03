import React from 'react';
import { Box } from "@mui/material";
import { usersAPI } from "../../services/rtk/UsersApi";

function HomePage() {

  const { data, isLoading } = usersAPI.useGetAllUsersQuery({});

  console.log('users  = ', data)

  return isLoading ? <>Loading...</> : (
    <Box>Home page</Box>
  )
}

export default HomePage;