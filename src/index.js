import Img2 from './assets/images/2.png';
import Style2 from './assets/style/style2.css';
import {square} from './math';

console.log('3 * 3 = ' + square(3));
document.getElementById('app').classList.add('blue');

const myImg = new Image();
myImg.src = Img2;
document.getElementById('app').appendChild(myImg);