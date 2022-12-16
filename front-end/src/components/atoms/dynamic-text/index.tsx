import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

type Props = {
  style?: React.CSSProperties;
  text: string;
  fontSize: number;
};

const DynamicText = (props: Props) => {
  const [fontSize, setFontSize] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef && containerRef.current) {
      const fontSize = Math.min(
        Math.floor(
          (containerRef.current.getBoundingClientRect().width /
            props.text.length) *
            1.8
        ),
        props.fontSize
      );
      setFontSize(fontSize);
    }
  }, [props.text, props.fontSize]);

  return (
    <StyledContainer ref={containerRef}>
      <StyledText style={props.style} fontSize={fontSize}>
        {props.text}
      </StyledText>
    </StyledContainer>
  );
};

export default DynamicText;

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledText = styled.p<{ fontSize: number }>`
  font-size: ${(props) => props.fontSize}px;
`;
