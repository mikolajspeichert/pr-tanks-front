import { injectGlobal } from 'styled-components'

const invasion2000 = require('/src/resources/fonts/invasion2000.TTF')

injectGlobal`
   @font-face {
    font-family: 'Invasion2000';
    src: url(${invasion2000});
  }
  
  html, body, #root {
  background-color: black;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
`
