import hello from './hello';
import {world} from './world';
import json from './you_can_import';
alert('foo.js');
document.getElementById('main').innerHTML = `${hello} ${world}`;
alert(JSON.stringify(json));
