import Vue from 'vue';
import Router from 'vue-router';
import { Components } from './components.js';
import { root } from '@/common/root.js';

Vue.use(Router);

const routes = root.concat(Components);

export default new Router({
    routes,
    scrollBehavior () {
        return { x: 0, y: 0 }
    }
})
