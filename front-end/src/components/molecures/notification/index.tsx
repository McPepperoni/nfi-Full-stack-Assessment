import styled from "styled-components";
import { TNotification } from "../../../types";
import { useEffect } from "react";

type Props = TNotification;

const Notification = (props: Props) => {
  useEffect(() => {
    if (props.show) {
      setTimeout(() => {
        props.setNotificationState(false);
      }, 7000);
    }
  }, [props.show, props]);

  return (
    <StyledNotification show={props.show}>
      {props.message}
      <StyledEscapeButton onClick={() => props.setNotificationState(false)}>
        ╳
      </StyledEscapeButton>
    </StyledNotification>
  );
};

export default Notification;

const StyledNotification = styled.div<{ show: boolean }>`
  width: 600px;
  position: absolute;
  background-color: #333;
  left: 50%;
  transform: translate(-50%, ${(props) => (props.show ? "0" : "-100%")});
  border-radius: 0 0 10px 10px;
  /* display: none; */
  padding: 10px 30px;
  top: 0;
  text-align: center;
`;

const StyledEscapeButton = styled.button`
  font-size: 15px;
  position: absolute;
  right: 0;
  margin-right: 20px;
`;
