import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: [
    {
      id: "1",
      role: "admin",
      tempRole: "",
      login: "user001",
      fullName: "sergey",
      email: "testtestsvcbv@ya.ru",
      location: "Russia",
      occupation: "enterpreneur",
      rating: {
        ratio: 1.5,
        disputesWin: 5,
        disputesLose: 2,
      },
    },
    {
      id: "2",
      role: "user",
      tempRole: "",
      login: "Marusya1982",
      fullName: "Masha",
      email: "mashzxvnwgwe@ya.ru",
      location: "Kazakhstan",
      occupation: "baker",
      rating: {
        ratio: 0,
        disputesWin: 0,
        disputesLose: 0,
      },
    },
  ],
  reducer: {},
});

export const {} = usersSlice.actions;

export default usersSlice.reducer;
