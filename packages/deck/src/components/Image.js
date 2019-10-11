import React from 'react'
import styled from 'styled-components'

const Annotation = styled.div`
  font-size: 10px;
  text-align: right;
`

export default ({ src, alt, children, width = '600px' }) => (
  <>
    <img src={src} style={{ width }} alt={alt} />
    <Annotation>{children}</Annotation>
  </>
)
