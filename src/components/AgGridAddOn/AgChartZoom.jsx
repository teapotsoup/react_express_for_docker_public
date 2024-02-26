import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { AgChartsReact } from 'ag-charts-react';

function AgChartZoom({ chartOption, handleClose }) {
  return (
    <>
      {createPortal(
        <PortalWrap>
          <AgChartZoomWrap>
            <div className="chart-view-wrap">
              <AgChartsReact
                options={{
                  ...chartOption,
                  height: 500,
                  navigator: {
                    enabled: true,
                    height: 10,
                    margin: 8,
                  },
                }}
              />
            </div>
          </AgChartZoomWrap>
          <BackDrop onClick={handleClose} />
        </PortalWrap>,
        document.body,
      )}
    </>
  );
}

const PortalWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
`;

const BackDrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.9;
`;

const riseUp = keyframes`
  0% { top : 50px; }
  100% { top : 0; }
`;

const AgChartZoomWrap = styled.div`
  width: 100%;
  background-color: white;
  position: relative;
  z-index: 1;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${riseUp} 0.3s;

  .chart-view-wrap {
    width: 100%;
    height: 510px;
    padding: 0 10px 10px;
    box-sizing: border-box;
  }
`;

export default AgChartZoom;
