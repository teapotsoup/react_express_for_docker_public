import  { useEffect, forwardRef, useState } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import { WhiteButton } from 'seed-ui';
import styled from '@emotion/styled';

import { MdExpand, MdOutlineShowChart, MdOutlineBarChart } from 'react-icons/md';
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';
import AgChartZoom from "../AgGridAddOn/AgChartZoom.jsx";
import {useContextMenuStore} from "../AgGridAddOn/state/useAgChart.js";
import AgContextMenu from "../AgGridAddOn/AgContextMenu.jsx";

/**
 * @param chart
 * - option : 차트 옵션, 기본 AG 차트의 옵션 셋팅과 동일함.
 * - config : 차트 옵션 외 설정할 부분 셋팅.
 * @param data
 * - 상태값 작성 시 차트 데이트 업데이트
 * @returns {JSX.Element}
 * @constructor
 */

const defaultChartOption = {
  theme: {
    palette: {
      fills: ['#7cecb3', '#7cb5ec', '#ecb37c', '#ec7cb5', '#7c7dec'],
      strokes: ['#7cecb3', '#7cb5ec', '#ecb37c', '#ec7cb5', '#7c7dec'],
    },
  },
  padding: {
    top: 30,
  },
  legend: {
    position: 'top',
    spacing: 5,
    maxWidth: 700,
    item: {
      paddingY: 20,
    },
  },
};

const AgChartInButton = forwardRef(({ options, data }, ref) => {
  const [chartOption, setChartOption] = useState({ ...defaultChartOption, ...options });
  const [iconType, setIconType] = useState('line');
  const { setContextMenu, addOnButtonShow } = useContextMenuStore();
  const [contextShow, setContextShow] = useState(false);
  const [chartShow, setChartShow] = useState(true);
  const [portalChartOpen, setPortalChartOpen] = useState(false);

  useEffect(() => {
    setChartOption(prevState => ({ ...prevState, data, series: options.series }));
  }, [data, options]);

  const handlePortalChartOpen = () => setPortalChartOpen(true);
  const handleChartShow = () => setChartShow(prevState => !prevState);
  const handleContextMenu = e => setContextMenu(e, setContextShow);

  const changeOption = (co, sco) => {
    const series = co.series.map(s => ({
      ...s,
      type: s.type === 'line' ? 'bar' : 'line',
    }));
    sco(prevState => ({ ...prevState, series }));
    setIconType(prevIconType => (prevIconType === 'line' ? 'bar' : 'line'));
  };

  return (
    <>
      <ChartInnerButton onContextMenu={handleContextMenu}>
        {chartShow && <AgChartsReact ref={ref} options={chartOption} />}
        {addOnButtonShow && (
          <ButtonWrap>
            <WhiteButton onClick={handlePortalChartOpen}>
              <MdExpand size={17} />
            </WhiteButton>
            <WhiteButton
              onClick={() => {
                changeOption(chartOption, setChartOption);
              }}
            >
              {iconType === 'line' ? (
                <MdOutlineShowChart size={17} />
              ) : (
                <MdOutlineBarChart size={17} />
              )}
            </WhiteButton>
            <WhiteButton onClick={handleChartShow}>
              {chartShow ? <FaToggleOff size={17} /> : <FaToggleOn size={17} />}
            </WhiteButton>
          </ButtonWrap>
        )}
        {contextShow && (
          <AgContextMenu
            handlePortalChartOpen={handlePortalChartOpen}
            changeOption={changeOption}
            chartOption={chartOption}
            setChartOption={setChartOption}
            handleChartShow={handleChartShow}
            iconType={iconType}
          />
        )}
      </ChartInnerButton>
      {portalChartOpen && (
        <AgChartZoom chartOption={chartOption} handleClose={() => setPortalChartOpen(false)} />
      )}
    </>
  );
});
AgChartInButton.displayName = 'AgChartInButton';

const ChartInnerButton = styled.div`
  width: 100%;
  min-height: 28px;
  position: relative;
`;

const ButtonWrap = styled.div`
  position: absolute;
  top: 10px;
  right: 0;
  display: flex;
  gap: 6px;
`;

export default AgChartInButton;
