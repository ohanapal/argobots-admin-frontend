export interface ColorPalette {
  primary_color: string
  secondary_color: string
  primary_font_color: string
  secondary_font_color: string
  primary_color_dark: string
  secondary_color_dark: string
  primary_font_color_dark: string
  secondary_font_color_dark: string
  gradient: [string, string]
}

export const colorPalettes: ColorPalette[] = [
  {
    primary_color: '#feffff',
    secondary_color: '#f7f8fa',
    primary_font_color: '#19213D',
    secondary_font_color: '#666F8D',
    primary_color_dark: '#141828',
    secondary_color_dark: '#23283d',
    primary_font_color_dark: '#EDF0F4',
    secondary_font_color_dark: '#ACB4C0',
    gradient: ['#0679FF', '#2A8CFF']
  },
  {
    primary_color: '#d0e1ff',
    secondary_color: '#a6c8ff',
    primary_font_color: '#003366',
    secondary_font_color: '#336699',
    primary_color_dark: '#002244',
    secondary_color_dark: '#001122',
    primary_font_color_dark: '#cce0ff',
    secondary_font_color_dark: '#99bbff',
    gradient: ['#0055ff', '#3399ff']
  },
  {
    primary_color: '#e6e0ff',
    secondary_color: '#d1c4e9',
    primary_font_color: '#4b0082',
    secondary_font_color: '#7b68ee',
    primary_color_dark: '#3c1361',
    secondary_color_dark: '#2e0854',
    primary_font_color_dark: '#dcd0ff',
    secondary_font_color_dark: '#b39ddb',
    gradient: ['#8a2be2', '#9370db']
  },
  {
    primary_color: '#ffe0e0',
    secondary_color: '#ffcccc',
    primary_font_color: '#8b0000',
    secondary_font_color: '#b22222',
    primary_color_dark: '#660000',
    secondary_color_dark: '#4d0000',
    primary_font_color_dark: '#ffcccc',
    secondary_font_color_dark: '#ff9999',
    gradient: ['#ff4500', '#ff6347']
  }
]
