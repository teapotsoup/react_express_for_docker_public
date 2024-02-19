import styled from '@emotion/styled';

function Logo() {
  return (
    <LogoWrap>
      <LogoText>JOJI</LogoText>
      <LogoPoint>Report</LogoPoint>
    </LogoWrap>
  );
}

const LogoWrap = styled.div`
  width: 275px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: bold;

  & * {
    font-family: 'GmarketSans' !important;
  }
`;

const LogoText = styled.div`
  height: 23px;
  font-size: 23px;
  font-family: 'GmarketSans' !important;
`;

const LogoPoint = styled.span`
  height: 19px;
  padding: 7px 12px;
  background-color: #8174e1;
  border-radius: 5px;
  font-size: 20px;
  font-family: 'GmarketSans' !important;
`;

export default Logo;
