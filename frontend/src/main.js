import hello from './hello';
import {world} from './world';
import json from './you_can_import';
import './you_can_import.css'
alert('from main.js');
document.getElementById('main').innerHTML = `${hello} ${world}`;
alert(JSON.stringify(json));
