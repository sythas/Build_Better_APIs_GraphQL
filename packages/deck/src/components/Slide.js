import React from 'react'
import styled from 'styled-components'

const Slide = styled.main`
  width: 100vw;
  height: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`

const Header = styled.h2`
  margin-bottom: 0;
`

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
`

const Footer = styled.footer`
  font-size: 14px;
  width: 100%;
  display: flex;
  border-top: 1px solid #363636;
  padding: 2rem;
`

const Spring = styled.span`
  flex: 1;
`

export default ({ children, header, footer = true }) => (
  <Slide>
    {header && <Header>{header}</Header>}
    <Content>{children}</Content>
    {footer && (
      <Footer>
        <span>CWITC 2019</span>
        <Spring />
        <span>@sythasfaroth</span>
      </Footer>
    )}
  </Slide>
)
