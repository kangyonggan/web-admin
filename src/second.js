import Img2 from './assets/images/2.png';
import Style2 from './assets/style/style2.css';
import {add} from './math';

console.log('4 + 4 = ' + add(4, 4));
document.getElementById('app').classList.add('red');

const myImg = new Image();
myImg.src = Img2;
document.getElementById('app').appendChild(myImg);