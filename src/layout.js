import React from "react";
import styled from "styled-components";

const Footer = styled.main`
  font-size: 14px;
  color: #fb8c00;
  text-align: right;
  position: fixed;
  right: 2rem;
  bottom: 0;
`;

export default ({ children }) => (
  <>
    <div>{children}</div>
    <Footer>
      <span>@sythasfaroth</span>
    </Footer>
  </>
);
