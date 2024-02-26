import { AiOutlinePauseCircle } from 'react-icons/ai';
import React from 'react';
import styled from '@emotion/styled';
import { MdBlockFlipped } from 'react-icons/md';
import { FiAlertCircle } from 'react-icons/fi';
import { BsCheckCircle } from 'react-icons/bs';
import { Loading } from './Loading';
import { StatusObj } from '../Constant/StatusObj';

function StatusRenderer({ data }) {
  return (
    <RendererCover>
      {data.status === 'y' && ( // 성공
        <BsCheckCircle
          size="15"
          color="skyblue"
          style={{
            marginRight: '5px',
          }}
        />
      )}
      {data.status === 'n' && ( // 실패
        <FiAlertCircle
          size="15"
          color="red"
          style={{
            marginRight: '5px',
          }}
        />
      )}
      {data.status === 'r' && ( // 진행중
        <Loading
          size="15"
          color="Orange"
          style={{
            marginRight: '5px',
          }}
        />
      )}
      {data.status === 'c' && ( // 취소
        <MdBlockFlipped
          size="15"
          color="black"
          style={{
            marginRight: '5px',
          }}
        />
      )}
      {data.status === 'w' && ( // 대기
        <AiOutlinePauseCircle
          size="15"
          color="grey"
          style={{
            marginRight: '5px',
          }}
        />
      )}
      {StatusObj[data.status]}
    </RendererCover>
  );
}

export default React.memo(StatusRenderer);

const RendererCover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
