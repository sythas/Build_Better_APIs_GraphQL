import React from 'react'
import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-auto-flow: column;
  grid-auto-columns: auto;
`

export default ({ children }) => <Grid>{children}</Grid>
