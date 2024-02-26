import React, { useEffect, useRef, useState} from 'react';
import styled from '@emotion/styled';
import axios from "axios";
import Table from "../components/PageTemplate/Table.jsx";

function Profile() {
  const gridRef = useRef();
  const [profileData,setProfileData]= useState({})

  const imageUrl = 'http://localhost:3001/images/redPanda.jpg';

  useEffect(() => {
    axios.get(`http://localhost:3001/app/profileData`).then(({data}) => {
      setProfileData(data)
      gridRef.current.api.setGridOption('rowData', data.stacks);
    })
  }, []);

  return (
      <ProjectCurrentWrap>
        {profileData && profileData.message}
        <img src={imageUrl} alt="예제 이미지" width={130} height={130}/>
        <Table
            id="ProjectCurrentTable"
            columnDefs={columnDefs}
            rowSelection="single"
            ref={gridRef}
            height="500px"
        />
      </ProjectCurrentWrap>
  );
}

const columnDefs = [
  {
    field: 'index',
    headerName: '',
    valueGetter: 'node.rowIndex + 1',
    width: 50,
    cellStyle: { textAlign: 'center' },
  },
  {
    field: 'name',
    headerName: '이름',
    flex: 1,
  },
  {
    field: 'age',
    headerName: '나이',
    flex: 1,
  },
  {
    field: 'hobby',
    headerName: '취미',
    flex: 1,
  },
  {
    field: 'where',
    headerName: '지역',
    flex: 1,
  },
];

export default React.memo(Profile);

const ProjectCurrentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

