/* eslint-disable no-unused-vars */
import React from 'react'

interface SelectedColorPaletteProps {
  palette: Record<string, string | [string, string]> | null
}

const SelectedColorPalette: React.FC<SelectedColorPaletteProps> = ({ palette }) => {
  if (!palette) {
    return <span>Select Color Palette</span>
  }

  return (
    <div className='flex items-center gap-x-2'>
      {Object.entries(palette).map(([key, color]) => (
        <div
          key={key}
          className='w-4 h-4 rounded-full border'
          style={{
            background: key === 'gradient' ? `radial-gradient(${color[0]}, ${color[1]})` : (color as string)
          }}
        />
      ))}
    </div>
  )
}

export default SelectedColorPalette
