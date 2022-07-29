import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getAllDisputesThunk } from "../store/reducers/disputesSliceThunk";

import styles from "../styles/App.module.css";

const LeftSide: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let fetchedDisputes = useAppSelector(
    (state: any) => state.disputes.fetchedDisputes
  );
  // Load list of disputes
  useEffect(() => {
    dispatch(getAllDisputesThunk({}));
  }, []);

  const redirect = (id: string) => {
    navigate(`/debates-page/${id}`);
  };

  return (
    <div className={styles.leftside}>
      {/* <div onClick={redirect1}>Dispute1</div>
      <div onClick={redirect2}>Dispute2</div> */}
      <div>
        {fetchedDisputes.map((el: any) => {
          return (
            <div
              onClick={() => {
                redirect(el.id);
              }}
              key={el.id}
            >
              {el.invitedParticipant} VS {el.senderParticipant}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeftSide;
