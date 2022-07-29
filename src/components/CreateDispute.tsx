import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchField from "./SearchField";
import { searchUsersThunk } from "../store/reducers/usersSliceThunk";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

import styles from "../styles/App.module.css";

const CreateDispute: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fetchedUsers = useAppSelector((state) => state.users.fetchedUsers);
  const currentUser = useAppSelector((state) => state.users.userData.login);
  const isLoading = useAppSelector(
    (state) => state.users.isLoading.searchOpponentForDispute
  );
  const searchCallback = (searchByLogin: string) => {
    dispatch(
      searchUsersThunk({ target: "searchOpponentForDispute", searchByLogin })
    );
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
      {!isLoading && fetchedUsers !== [] ? (
        <div>
          {fetchedUsers.map((user: any) => {
            return (
              <div key={user.id}>
                {user.login}
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
      ) : (
        <div className={styles.preloader}></div>
      )}
    </div>
  );
};

export default CreateDispute;
