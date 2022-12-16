import styled, { keyframes } from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useRef, useState } from "react";
import { TSearchItem } from "../../../types";
import { VscSearchStop } from "react-icons/vsc";

type Props = {
  items: TSearchItem;
  fetchingData: boolean;
  err: string;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickItem: (id: string) => void;
};

const SearchBar = (props: Props) => {
  const [active, setActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleMouseOver = () => {
    setActive(true);
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleOnBlur = () => {
    setTimeout(() => {
      setActive(false);
    }, 300);
  };

  return (
    <StyledContainer>
      <StyledInputOutline active={active}>
        <StyledSearchBar onMouseOver={handleMouseOver}>
          <StyledIconContainer>
            <FaSearch />
          </StyledIconContainer>
          <StyledInput
            type="input"
            ref={inputRef}
            onBlur={handleOnBlur}
            placeholder="Search for user..."
            onChange={props.onChange}
          />
          <StyledSearchResultContainer>
            {props.items.byId.length === 0 &&
            props.items.byName.length === 0 ? (
              <StyledInfo fetchingData={props.fetchingData}>
                {props.fetchingData ? (
                  "Searching..."
                ) : (
                  <>
                    <VscSearchStop />
                    Try another keyword
                  </>
                )}
              </StyledInfo>
            ) : (
              <>
                {props.items.byName.length > 0 && (
                  <>
                    <StyledTitle>Result by name</StyledTitle>
                    {props.items.byName.map((item) => (
                      <StyledItem
                        key={item.id}
                        onClick={() => props.onClickItem(item.id)}
                      >
                        <span>{item.display_name} </span>
                        <span>{item.id}</span>
                      </StyledItem>
                    ))}
                  </>
                )}
                {props.items.byId.length > 0 && (
                  <>
                    <StyledTitle>Result by id</StyledTitle>
                    {props.items.byId.map((item) => (
                      <StyledItem
                        key={item.id}
                        onClick={() => props.onClickItem(item.id)}
                      >
                        <span>{item.display_name} </span>
                        <span>{item.id}</span>
                      </StyledItem>
                    ))}
                  </>
                )}
              </>
            )}
          </StyledSearchResultContainer>
        </StyledSearchBar>
      </StyledInputOutline>
    </StyledContainer>
  );
};

export default SearchBar;

//Animations
const AnimatedRotate = keyframes`
from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

//Stylings
const StyledTitle = styled.div`
  background-color: #ccc;
  color: #333;
  padding: 5px 30px;
  font-size: 15px;
  font-weight: 900;

  :first-of-type {
    border-radius: 20px 20px 0 0;
  }
`;

const StyledItem = styled.div`
  padding: 10px 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  :hover {
    background-color: #aaa;

    span {
      :last-of-type {
        font-weight: 900;
        opacity: 0.5;
      }
    }
  }

  span {
    color: #333;
    font-size: 20px;
    font-weight: 900;

    :last-of-type {
      font-weight: 400;
      font-size: 14px;
      opacity: 0.2;
    }
  }
`;

const StyledSearchResultContainer = styled.div`
  position: absolute;
  left: 0;
  top: 100%;
  border-radius: 20px;
  background: #ececff;

  box-shadow: 5px 5px 20px rgb(109, 109, 217),
    -5 px -5px 20px rgb(147, 147, 255);
  width: 100%;
  height: 400px;
  flex-direction: column;
  overflow: scroll;
`;

const StyledIconContainer = styled.div`
  aspect-ratio: 1;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  /* background-color: transparent; */
`;

const StyledInput = styled.input`
  width: 100%;
  background-color: transparent;
  outline: none;
  border-bottom: 2px solid #fff;
  font-weight: 400;
  font-size: 14px;

  ::placeholder {
    font-weight: 600;
    font-size: 12px;
  }
`;

const StyledSearchBar = styled.div`
  border-radius: 100px;
  width: fit-content;
  height: fit-content;
  border-radius: 50px;
  border-radius: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  box-shadow: 5px 5px 20px rgb(109, 109, 217),
    -5 px -5px 20px rgb(147, 147, 255);

  svg {
    background-color: transparent;
  }
  /* opacity: 0.7;sd */

  :hover {
    opacity: 1;
  }
`;

const StyledInputOutline = styled.div<{ active: boolean }>`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: ${(props) => (props.active ? "100%" : "0%")};
  border-radius: 50px;
  border-left: ${(props) =>
    props.active ? "4px solid rgb(255, 255, 255, 0.4)" : "none"};
  border-right: ${(props) =>
    props.active ? "4px solid rgb(255, 255, 255, 0.4)" : "none"};
  border-top: ${(props) => (props.active ? "4px solid transparent" : "none")};
  border-bottom: ${(props) =>
    props.active ? "4px solid transparent" : "none"};
  border-radius: 100px;

  ${StyledInput} {
    width: ${(props) => (props.active ? "100%" : "0")};
    margin: ${(props) => (props.active ? "2px 10px" : "0px")};
    padding-bottom: ${(props) => (props.active ? "5px" : "0px")};
  }

  ${StyledSearchBar} {
    width: ${(props) => (props.active ? "100%" : "fit-contain")};
    padding: ${(props) => (props.active ? "0 10px" : "6px")};
    opacity: ${(props) => (props.active ? "1" : "0.7")};
    box-shadow: ${(props) =>
      props.active
        ? `
      20px 20px 60px #6d6dd9,
      -20px -20px 60px #9393ff
      `
        : "transparent"};
    background: ${(props) =>
      props.active
        ? "none"
        : `linear-gradient(
          145deg,
          rgba(230, 230, 230, 0.4),
          rgba(255, 255, 255, 0.4)
  );`};
  }

  ${StyledSearchResultContainer} {
    display: ${(props) => (props.active ? "flex" : "none")};
  }

  ::before {
    border-radius: 100px;

    content: "";
    position: absolute;
    border-top: 4px solid rgb(255, 255, 255, 0.4);
    border-bottom: 4px solid rgb(255, 255, 255, 0.4);
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    left: -4px;
    opacity: 1;
    animation: ${AnimatedRotate} 5s linear infinite;
    height: ${(props) => (props.active ? "0%" : "100%")};
    border-width: ${(props) => (props.active ? "0px" : "4px")};
    aspect-ratio: 1;
  }
`;

const StyledContainer = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  padding-bottom: 50px;
  width: 400px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 99;
`;

const StyledInfo = styled.div<{ fetchingData: boolean }>`
  font-size: 20px;
  font-weight: 700;
  /* text-align: center; */
  margin-bottom: 20px;
  color: #333;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 200px;
    margin-bottom: 40px;
  }

  path {
    color: #333;
    opacity: 0.2;
  }

  ::before {
    content: "";
    display: ${(props) => (props.fetchingData ? "flex" : "none")};
    margin-bottom: 40px;
    width: 50%;
    aspect-ratio: 1;
    border-top: 10px solid #222;
    border-bottom: 10px solid #222;
    border-left: 10px solid #aaa;
    border-right: 10px solid #aaa;
    opacity: 0.2;
    border-radius: 100%;
    animation: ${AnimatedRotate} 2s linear infinite;
  }
`;
