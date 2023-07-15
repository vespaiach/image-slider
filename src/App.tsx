import './App.css';
import { useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import ImagePath1 from './assets/images/p1.jpg';
import ImagePath2 from './assets/images/p2.jpg';
import ImagePath3 from './assets/images/p3.jpg';
import ImagePath4 from './assets/images/p4.jpg';

const PAGE_GAP = 30;
const GRID_GAP = 10;
const LEFT = -1;
const RIGHT = 1;

const scrollButtonCSS = css`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0;
  outline: none;
  cursor: pointer;

  background: white;
  border: none;
  border-radius: 0px;
  opacity: 0.7;
  color: #8a0a23;

  width: 28px;
  height: 28px;

  position: absolute;
  top: calc(50% - 14px); // center vertically

  &.hidden {
    display: none;
  }
`;
const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  position: relative;
`;
const LeftScrollButton = styled.button`
  ${scrollButtonCSS}
  left: 8px;

  transform: rotate(180deg);
`;
const RightScrollButton = styled.button`
  ${scrollButtonCSS}
  right: 8px;
`;
const ImageContainer = styled.div`
  display: grid; // hold images horizontally
  grid-auto-flow: column;
  gap: ${GRID_GAP}px; 

  overflow: hidden; // hide browser's scroll bar

  // Add padding to the grid container to show gap when scrolling to edges
  &:before,
  &:after {
    content: '';
    display: block;
    width: ${PAGE_GAP - GRID_GAP}px; // assume page gap is larger than grid gap
  }
`;
const Image = styled.img`
  width: calc(100vw - ${PAGE_GAP * 2}px); // image's width = viewport's width - left page's gap - right page's gap
  height: 230px;
  object-fit: cover;
`;
const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

function App() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const leftButtondRef = useRef<HTMLButtonElement>(null);
  const rightButtondRef = useRef<HTMLButtonElement>(null);

  const handleScrolling = (direction: number) => () => {
    const containerWidth = wrapperRef.current?.clientWidth || 0;
    const imageWidth = containerWidth - PAGE_GAP * 2 + GRID_GAP;
    if (imageContainerRef.current) {
      imageContainerRef.current.scrollTo({ top: 0, left: imageContainerRef.current.scrollLeft + direction * imageWidth, behavior: 'smooth' });
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (imageContainerRef.current) {
        const scrollLeft = imageContainerRef.current.scrollLeft;
        const maxScrollLeft = imageContainerRef.current.scrollWidth - imageContainerRef.current.clientWidth;
        if (scrollLeft === 0) {
          leftButtondRef.current?.classList.add('hidden');
        } else {
          leftButtondRef.current?.classList.remove('hidden');
        }
        if (scrollLeft === maxScrollLeft) {
          rightButtondRef.current?.classList.add('hidden');
        } else {
          rightButtondRef.current?.classList.remove('hidden');
        }
      }
    }
    if (imageContainerRef.current) {
      handleScroll();
      imageContainerRef.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (imageContainerRef.current) {
        imageContainerRef.current.removeEventListener('scroll', handleScroll);
      }
    }
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      <ImageContainer ref={imageContainerRef}>
        <Image src={ImagePath1} />
        <Image src={ImagePath2} />
        <Image src={ImagePath3} />
        <Image src={ImagePath4} />
      </ImageContainer>
      <LeftScrollButton ref={leftButtondRef} onClick={handleScrolling(LEFT)}>
        <ArrowIcon />
      </LeftScrollButton>
      <RightScrollButton ref={rightButtondRef} onClick={handleScrolling(RIGHT)}>
        <ArrowIcon />
      </RightScrollButton>
    </Wrapper>
  );
}

export default App;
