import React from 'react'

export const Image = ({ src, children, width = '600px' }) => (
  <div style={{ fontSize: '8px' }}>
    <img src={src} style={{ width }} />

    {children}
  </div>
)
