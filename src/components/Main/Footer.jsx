import styled from '@emotion/styled';

function Footer() {
  return (
    <FooterWrapper>
      Copyright(c)R2ware, All rights reserved. <span>SQLCanvasReport Alpha Version</span>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  border-top: 1px solid #bdbdbd;
  height: 40px;
  font-size: 11px;
  display: flex;
  padding-left: 30px;
  align-items: center;

  & > span {
    font-weight: bold;
    margin-left: 9px;
  }
`;

export default Footer;
