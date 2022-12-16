import styled from "styled-components";
import { AiOutlineUserAdd, AiOutlineArrowRight } from "react-icons/ai";
import React, { useRef, useState } from "react";
import Input from "../../atoms/input";
import { TBalance } from "../../../types";
import Tooltip from "../../molecures/tooltip";

type Props = {
  setBalanceDisplay: React.Dispatch<React.SetStateAction<TBalance>>;

  setErr: React.Dispatch<React.SetStateAction<string>>;
  setSetNotificationState: React.Dispatch<React.SetStateAction<boolean>>;
  setSetErrNotificationState: React.Dispatch<React.SetStateAction<boolean>>;
};

const Register = (props: Props) => {
  const [openForm, setOpenForm] = useState(false);
  const [active, setActive] = useState(false);

  const [value, setValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  const handleFormAction = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
    setOpenForm(!openForm);
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    fetch(`/createUser`, {
      method: "POST",
      body: JSON.stringify({ display_name: value }),
      headers: { "Content-type": "application/json" },
    })
      .then(async (res) => {
        props.setBalanceDisplay((await res.json()).data);
        props.setSetNotificationState(true);
      })
      .catch((e) => {
        props.setErr(e);
        props.setSetErrNotificationState(true);
      });

    setOpenForm(false);

    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }

    e.preventDefault();
  };

  const handleOnBlur = () => {
    setTimeout(() => {
      setOpenForm(false);
    }, 200);
  };

  return (
    <>
      <StyledForm show={openForm} onSubmit={handleOnSubmit}>
        <StyledGroup>
          <StyledTitle>Register </StyledTitle>
          <Input
            value={value}
            active={active}
            setValue={setValue}
            setActive={setActive}
            inputRef={inputRef}
            onBlur={handleOnBlur}
          />
        </StyledGroup>
        <StyledGroup>
          <StyledSubmitButton type="submit" disabled={!active} ref={submitRef}>
            <Tooltip text="Submit" parent={submitRef} />
            <AiOutlineArrowRight />
          </StyledSubmitButton>
        </StyledGroup>
      </StyledForm>
      <StyledButton onClick={handleFormAction} show={openForm}>
        <AiOutlineUserAdd />
      </StyledButton>
    </>
  );
};

export default Register;

const StyledButton = styled.button<{ show: boolean }>`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 100% 20px 100% 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  background-color: ${(props) => (props.show ? "white" : "#333")};
  z-index: 9;

  path {
    color: ${(props) => (props.show ? "#333" : "white")};
  }

  :hover {
    background-color: white;
    path {
      color: #333;
    }
  }
`;

const StyledGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledForm = styled.form<{ show: boolean }>`
  position: absolute;
  top: 30px;
  background-color: white;
  color: #333;
  width: calc(100%- 10px);
  padding: 10px 50px 30px 50px;
  width: 380px;
  padding: ${(props) => (props.show ? "10px 50px 30px 50px" : "0px 50px")};
  height: ${(props) => (props.show ? "340px" : "0px")};
  border-radius: 20px 0 20px 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 9;
`;

const StyledTitle = styled.p`
  width: 100%;
  font-size: 30px;
  font-weight: 900;
  color: #333;
  margin-bottom: 40px;
`;

const StyledSubmitButton = styled.button`
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  padding: 10px;
  width: fit-content;
  aspect-ratio: 1;
  margin: auto;
  position: relative;

  :disabled {
    opacity: 0.5;
    background-color: #333;
    path {
      color: white;
    }
  }

  :hover {
    background-color: #333;
    path {
      color: white;
    }
  }

  path {
    color: #333;
  }
`;
