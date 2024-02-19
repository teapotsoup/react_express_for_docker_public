import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import axios from "axios";

function Specsheet() {
  const [serverMessage, setServerMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3001/app/specSheetData`).then(({data}) => {
      setServerMessage(data.message);
    })
  }, []);
  return (
    <ProjectCurrentWrap>
      {serverMessage}
    </ProjectCurrentWrap>
  );
}

export default React.memo(Specsheet);

const ProjectCurrentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

