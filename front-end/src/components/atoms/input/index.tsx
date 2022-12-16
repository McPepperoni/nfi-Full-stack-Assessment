import styled from "styled-components";

type Props = {
  value: string;
  active: boolean;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;

  onBlur: () => void;

  inputRef: React.RefObject<HTMLInputElement>;
};

const Input = (props: Props) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      props.setActive(true);

      props.setValue(e.target.value);

      return;
    }
    props.setActive(false);
  };

  return (
    <StyledContainer title="Display Name" active={props.active}>
      <StyledInput
        onChange={handleOnChange}
        onBlur={props.onBlur}
        ref={props.inputRef}
      />
    </StyledContainer>
  );
};

export default Input;

const StyledContainer = styled.div<{ title: string; active: boolean }>`
  width: 100%;
  position: relative;

  ::before {
    position: absolute;
    content: "${(props) => props.title}";
    font-size: 15px;
    color: #333;
    bottom: 5px;
    opacity: 0.5;
    transition: 150ms;

    ${(props) =>
      props.active
        ? `
        bottom: 100%;
        font-size: 10px;
        font-weight: 900;
    `
        : ""}
  }
`;

const StyledInput = styled.input`
  outline: none;
  padding: 5px 0;
  border-bottom: 2px solid #333;
  color: #333;
  width: 100%;
  font-size: 15px;
`;
