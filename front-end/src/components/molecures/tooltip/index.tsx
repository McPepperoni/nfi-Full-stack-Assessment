import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";

type Props = {
  text: string;
  parent: React.RefObject<HTMLButtonElement>;
};

const Tooltip = (props: Props) => {
  const [show, setShow] = useState(false);

  //adjust font size according to container width
  useEffect(() => {
    if (props.parent && props.parent.current) {
      props.parent.current.onmouseover = () => {
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 5100);
      };

      props.parent.current.onmouseleave = () => {
        setShow(false);
      };
    }
  }, [props]);

  return <StyledContainer show={show}>{props.text}</StyledContainer>;
};

export default Tooltip;

const AnimatedFade = keyframes`
    0% {
        opacity: 0;
    }

    5% {
        opacity: 1;
    }
    50% {
        opacity: 1;
    }
    90% {
        opacity: 0;
    }
    100% {
        opacity: 0;
    }
`;

const StyledContainer = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? "block" : "none")};
  background-color: #333;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 10px;
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translate(-50%, 0);
  white-space: nowrap;
  font-weight: normal !important;
  animation: ${AnimatedFade} infinite 5s linear;
`;
