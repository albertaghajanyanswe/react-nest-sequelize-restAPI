import React from 'react';
import { Box } from "@mui/material";
import { usersAPI } from "../../services/rtk/UsersApi";

function SettingsPage() {

  const { data, isLoading } = usersAPI.useGetAllUsersQuery({});

  console.log('users  = ', data)

  return isLoading ? <>Loading...</> : (
    <Box>Settings page</Box>
  )
}

export default SettingsPage;