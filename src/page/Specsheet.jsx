import React, {useEffect,useRef, useState} from 'react';
import styled from '@emotion/styled';
import axios from "axios";
import AgChartInButton from "../components/PageTemplate/AgChartInButton.jsx";


function createInitTaskListWithObjects(count) {
  const dataArray = [];
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      const dataObject = {
        pno: i + 1,
        id: i + 1,
        cycle: j + 1,
        exe_dt: '2017-01-11',
        requester: '서정우',
        req_id_cnt: j + 1,
        restore_id_cnt: j + 2,
        restore_transact_cnt: j + 3,
      };
      dataArray.push(dataObject);
    }
  }
  return dataArray;
}

const initProjectTaskList = createInitTaskListWithObjects(30);


function Specsheet() {
    const chartRef = useRef(null);

  const [serverMessage, setServerMessage] = useState('');
  const [projectTaskList, setProjectTaskList] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/app/specSheetData`).then(({data}) => {
      setServerMessage(data.message);
      setProjectTaskList(initProjectTaskList)
    })
  }, []);
  return (
    <ProjectCurrentWrap>
      {serverMessage}
      <AgChartInButton options={options} data={projectTaskList} ref={chartRef} />
    </ProjectCurrentWrap>
  );
}
const defaultTooltip = {
  renderer: ({ title, xValue, yValue, datum }) => ({
    title: `${xValue}회차 ${title}`,
    content: `[${datum.exe_dt}] : ${yValue}개`,
  }),
};

const options = {
  height: 350,
  series: [
    {
      xKey: 'cycle',
      yKey: 'req_id_cnt',
      xName: '회차별',
      yName: '요청 ID 수',
      tooltip: defaultTooltip,
      type: 'line',
    },
    {
      xKey: 'cycle',
      yKey: 'restore_id_cnt',
      yName: '복원 ID 수',
      tooltip: defaultTooltip,
      type: 'line',
    },
    {
      xKey: 'cycle',
      yKey: 'restore_transact_cnt',
      yName: '복원 거래 수',
      tooltip: defaultTooltip,
      type: 'line',
    },
  ],
  axes: [
    {
      type: 'category',
      position: 'bottom',
      title: {
        text: '회차별',
      },
    },
    {
      type: 'number',
      position: 'left',
      title: {
        text: '건수',
      },
      tick: {
        interval: 10,
      },
    },
  ],
};

export default React.memo(Specsheet);

const ProjectCurrentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

