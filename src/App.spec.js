import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import App from './App.vue';

describe('Main page', () => {

    it('Renders the page', () => {

        const wrapper = mount(App);

        expect(wrapper).toBeTruthy();

    });

});