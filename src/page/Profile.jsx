import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import axios from "axios";

function Profile() {
  const [serverMessage, setServerMessage] = useState('');
  const imageUrl = 'http://localhost:3001/images/redPanda.jpg';
  useEffect(() => {
    axios.get(`http://localhost:3001/app/profileData`).then(({data}) => {
      setServerMessage(data.message);
    })
  }, []);
  return (
      <ProjectCurrentWrap>
        {serverMessage}
        <img src={imageUrl} alt="예제 이미지" width={130} height={130}/>
      </ProjectCurrentWrap>
  );
}

export default React.memo(Profile);

const ProjectCurrentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

