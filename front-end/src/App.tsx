import { useState, useRef } from "react";
import styled from "styled-components";
import "./App.css";
import DynamicText from "./components/atoms/dynamic-text";
import Notification from "./components/molecures/notification";
import Tooltip from "./components/molecures/tooltip";
import Register from "./components/oganism/register";
import SearchBar from "./components/oganism/search-bar";
import { TSearchItem, TNotification, TBalance } from "./types";
import { formatBalance } from "./utils";

function App() {
  //states for notifications
  const [createUserNotification, setCreateUserNotification] = useState(false);
  const [errNotification, setErrNotification] = useState(false);
  const [fetchingDataSearch, setFetchingDataSearch] = useState(false);
  const [fetchingDataDisplay, setFetchingDataDisplay] = useState(false);
  const [fetchingDataDeposit, setFetchingDataDeposit] = useState(false);
  const [fetchingDataWithdraw, setFetchingDataWithdraw] = useState(false);

  const [searchResult, setSearchResult] = useState<TSearchItem>({
    byName: [],
    byId: [],
  });
  const [balanceDisplay, setBalanceDisplay] = useState<TBalance>({
    id: "",
    user_id: "",
    display_name: "",
    balance: 0,
  });

  const [amount, setAmount] = useState(0);

  const depositButtonRef = useRef(null);
  const withdrawButtonRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [err, setErr] = useState("");
  //metamask variables

  //functions control notification state control
  //functions to control search
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFetchingDataSearch(true);

    fetch(`/search?query=${e.target.value}`)
      .then(async (res) => {
        setSearchResult((await res.json()).data);
        setFetchingDataSearch(false);
      })
      .catch((e) => {
        setErr(e);
      });
  };

  const handleOnClickItem = (id: string) => {
    setFetchingDataDisplay(true);

    fetch(`/getFromUserId?user_id=${id}&table=balance&columns=`)
      .then(async (res) => {
        setBalanceDisplay((await res.json()).data);
        setFetchingDataDisplay(false);
      })
      .catch((e) => {
        setErr(e);
        setErrNotification(true);
      });
  };

  //handle input
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/(\D)/g, "");

    setAmount(parseFloat(value) / 100);

    e.target.value =
      value === "" ? "$ 0" : `$ ${formatBalance(parseFloat(value) / 100)}`;
  };

  const handleButtonOnClick = async (id: string, operation: string) => {
    operation === "deposit"
      ? setFetchingDataDeposit(true)
      : setFetchingDataWithdraw(true);

    fetch(`/updateBalance?user_id=${id}&operation=${operation}`, {
      method: "PATCH",
      body: JSON.stringify({ amount }),
      headers: { "Content-type": "application/json" },
    })
      .then(async (res) => {
        setBalanceDisplay((await res.json()).data);
        operation === "deposit"
          ? setFetchingDataDeposit(false)
          : setFetchingDataWithdraw(false);
      })
      .catch((e) => {
        setErr(e);
        setErrNotification(true);
      });
    setAmount(0);

    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
  };

  //Object no manage notifications
  const Notifications: TNotification[] = [
    {
      show: createUserNotification,
      message: `Successfully created user`,
      setNotificationState: setCreateUserNotification,
    },
    {
      show: errNotification,
      message: `Successfully created user`,
      setNotificationState: setErrNotification,
    },
  ];

  const buttonConditions = {
    deposit: amount === 0,
    withdraw:
      balanceDisplay.balance === 0 ||
      amount === 0 ||
      amount > balanceDisplay.balance,
  };

  return (
    <>
      <StyledContainer>
        {Notifications.map((n) => (
          <Notification {...n} />
        ))}
        <StyledPanel>
          <SearchBar
            items={searchResult}
            fetchingData={fetchingDataSearch}
            err={err}
            onChange={handleOnChange}
            onClickItem={handleOnClickItem}
          />
          <Register
            setErr={setErr}
            setSetErrNotificationState={setErrNotification}
            setSetNotificationState={setCreateUserNotification}
            setBalanceDisplay={setBalanceDisplay}
          />
          {balanceDisplay.id === "" || fetchingDataDisplay ? (
            <StyledMessage>
              {fetchingDataDisplay
                ? "Fetching use info..."
                : "Please select a user"}
            </StyledMessage>
          ) : (
            <>
              <StyledName>{balanceDisplay.display_name}</StyledName>
              <StyledId>{balanceDisplay.user_id}</StyledId>
              <StyledGroup>
                <StyledBalance>
                  <DynamicText
                    text={`$ ${formatBalance(balanceDisplay.balance)}`}
                    fontSize={40}
                  />
                </StyledBalance>
                <StyledFunctionGroup>
                  <StyledButtonWrapper>
                    <StyledButton
                      ref={depositButtonRef}
                      onClick={() =>
                        handleButtonOnClick(balanceDisplay.user_id, "deposit")
                      }
                      disabled={fetchingDataDeposit || buttonConditions.deposit}
                    >
                      <Tooltip
                        text="To deposit your money"
                        parent={depositButtonRef}
                      />
                      {fetchingDataDeposit ? "Depositing..." : "Deposit (+)"}
                    </StyledButton>
                    <StyledButton
                      ref={withdrawButtonRef}
                      disabled={
                        fetchingDataWithdraw || buttonConditions.withdraw
                      }
                      onClick={() =>
                        handleButtonOnClick(balanceDisplay.user_id, "withdraw")
                      }
                    >
                      {fetchingDataWithdraw ? "Withdrawing..." : "Withdraw (-)"}
                      <Tooltip
                        text={
                          !buttonConditions.withdraw
                            ? "To withdraw your money"
                            : "Your balance is in sufficient to withdraw"
                        }
                        parent={withdrawButtonRef}
                      />
                    </StyledButton>
                  </StyledButtonWrapper>
                  <StyleAmountInput
                    type="text"
                    placeholder="Please input amount"
                    ref={inputRef}
                    onChange={handleInput}
                  />
                </StyledFunctionGroup>
              </StyledGroup>
            </>
          )}
        </StyledPanel>
      </StyledContainer>
    </>
  );
}

export default App;

const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPanel = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 50px;
  border-radius: 50px;
  background: linear-gradient(145deg, #7373e6, #8989ff);
  box-shadow: 20px 20px 60px #6d6dd9, -20px -20px 60px #9393ff;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  padding: 40px 60px;
  position: relative;

  @media (max-width: 450px) {
    width: 300px;
    height: 400px;
    padding: 30px 30px;
  }
`;

const StyledName = styled.p`
  width: 100%;
  font-size: 30px;
  font-weight: 900;
`;

const StyledMessage = styled.p`
  width: 100%;
  font-size: 25px;
  font-weight: 900;

  @media (max-width: 450px) {
    font-size: 16px;
  }
`;

const StyledId = styled.p`
  width: 100%;
  font-size: 11px;
  color: #333;
  opacity: 0.5;
`;

const StyledGroup = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const StyledFunctionGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledBalance = styled.div`
  width: 100%;
  font-size: 70px;
  font-weight: 900;
  margin-top: 20px;

  text {
    width: 100%;
  }
`;

const StyledButtonWrapper = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 15px;
  min-height: 80px;
`;

const StyledButton = styled.button`
  position: relative;
  cursor: pointer;
  width: 45%;
  height: 50%;
  border-radius: 10px;
  opacity: 1;

  border: 2px solid #fff;
  border-color: transparent transparent #fff;

  :hover {
    :not(:disabled) {
      opacity: 1;
      font-weight: 900;
      background: #9393ff;
      box-shadow: 20px 20px 60px #6d6dd9, -20px -20px 60px #9393ff;
      border-color: #fff transparent transparent;
    }
  }

  :disabled {
    background-color: #6d6dd9;
    opacity: 0.5;
  }
`;

const StyleAmountInput = styled.input`
  background-color: transparent;
  padding: 5px 0;
  border-radius: 5px;
  width: 100%;
  outline: none;
  border: 2px solid #fff;
  border-color: transparent transparent #fff transparent;
  height: 30px;
  font-size: 15px;
`;
