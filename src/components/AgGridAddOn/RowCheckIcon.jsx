import styled from '@emotion/styled';
import { AiOutlineCheck } from 'react-icons/ai';

function RowCheckIcon(value) {
  return (
    <>
      {value && (
        <Center>
          <AiOutlineCheck />
        </Center>
      )}
    </>
  );
}

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  svg {
    fill: rgb(49, 129, 235);
    width: 20px;
    height: 20px;
  }
`;

export default RowCheckIcon;
