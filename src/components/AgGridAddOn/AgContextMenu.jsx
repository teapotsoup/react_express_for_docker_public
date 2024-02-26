import  { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { MdClose, MdExpand, MdOutlineBarChart, MdOutlineShowChart } from 'react-icons/md';
import {useContextMenuStore} from "./state/useAgChart.js";

function AgContextMenu({
  handlePortalChartOpen,
  changeOption,
  chartOption,
  setChartOption,
  handleChartShow,
  iconType,
}) {
  const { contextProps, setContextClose } = useContextMenuStore();
  const contextRef = useRef();
  const [coordinate, setCoordinate] = useState({ x: 0, y: 0 });

  const handleClose = useCallback(
    e => {
      if (!contextRef.current.contains(e.target)) {
        setContextClose();
      }
    },
    [setContextClose],
  );

  const getCoordinate = () => {
    const { offsetX, offsetY, clientX, clientY } = contextProps.nativeEvent;
    const tempCoordinate = { x: offsetX, y: offsetY };
    const { clientWidth, clientHeight } = contextRef.current;

    if (contextProps.view.innerWidth < clientX + clientWidth) {
      tempCoordinate.x -= clientWidth;
    }

    if (contextProps.view.innerHeight < clientY + clientHeight) {
      tempCoordinate.y -= clientHeight;
    }

    setCoordinate(tempCoordinate);
  };

  useLayoutEffect(() => getCoordinate(), []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClose);
    window.addEventListener('resize', setContextClose);
    return () => {
      document.removeEventListener('mousedown', handleClose);
      window.removeEventListener('resize', setContextClose);
    };
  }, [handleClose]);

  return (
    <ContextMenuWrap ref={contextRef} coordinate={coordinate}>
      <ul>
        <li onClick={handlePortalChartOpen} role="presentation">
          <span>
            <MdExpand />
          </span>
          <span>차트 확대</span>
        </li>
        <li
          onClick={() => {
            changeOption(chartOption, setChartOption);
          }}
          role="presentation"
        >
          <span>{iconType === 'line' ? <MdOutlineShowChart /> : <MdOutlineBarChart />}</span>
          <span>차트 변경</span>
        </li>
        <li onClick={handleChartShow} role="presentation">
          <span>
            <MdClose />
          </span>
          <span>차트 닫기</span>
        </li>
      </ul>
    </ContextMenuWrap>
  );
}

const ContextMenuWrap = styled.div`
  width: 200px;
  padding: 6px 0;
  background-color: #f8f8f8;
  position: absolute;
  top: ${({ coordinate }) => `${coordinate.y}px`};
  left: ${({ coordinate }) => `${coordinate.x}px`};
  font-size: 14px;
  font-family: 'agGridAlpine', serif;
  box-shadow: 0 1px 4px 1px rgba(186, 191, 199, 0.4);
  border: 1px solid #babfc7;
  border-radius: 3px;

  & ul li {
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    cursor: pointer;

    & span {
      padding-left: 12px;
    }

    & span:nth-of-type(1) {
      width: 16px;
      height: 16px;
      font-size: 16px;
    }

    &:hover {
      background-color: rgba(33, 150, 243, 0.1);
    }
  }
`;

export default AgContextMenu;
