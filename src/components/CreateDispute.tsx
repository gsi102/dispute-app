import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchField from "./SearchField";
import { searchUsersThunk } from "../store/reducers/usersSliceThunk";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

const CreateDispute: React.FC = () => {
  const dispatch = useAppDispatch();
  const fetchedUsers = useAppSelector((state) => state.users.fetchedUsers);
  const currentUser = useAppSelector((state) => state.users.userData.login);
  const navigate = useNavigate();

  const searchCallback = (searchByLogin: string) => {
    dispatch(searchUsersThunk({ searchByLogin }));
  };

  const createDispute = (
    senderParticipant: string,
    invitedParticipant: string
  ) => {
    navigate("/new-dispute-options", {
      state: {
        senderParticipant,
        invitedParticipant,
      },
    });
  };

  return (
    <div>
      <h1>Choose your opponent:</h1>
      <SearchField searchCallback={searchCallback} />
      <div>
        {fetchedUsers.map((user: any) => {
          return (
            <div key={user.id}>
              {user.login}{" "}
              <span
                onClick={() => {
                  createDispute(currentUser, user.login);
                }}
              >
                Create
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreateDispute;
