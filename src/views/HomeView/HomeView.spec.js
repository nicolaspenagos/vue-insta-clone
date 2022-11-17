import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import HomeView from './HomeView.vue';

describe('Home View', () => {

    it('Renders the page', () => {

        const wrapper = mount(HomeView);

        expect(wrapper).toBeTruthy();

    });

});