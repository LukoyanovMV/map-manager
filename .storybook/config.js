import { configure } from '@storybook/react';
import {setAddon} from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';

setAddon(JSXAddon);

const req = require.context('../src', true, /\.stories\.js$/);

function loadStories() {
    req.keys().forEach((filename) => req(filename))
}

// function loadStories() {
//     require('../stories');
//     require('../src/components/auth-form/index.stories');
// }

configure(loadStories, module);
