import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import HomeView from "./HomeView.vue";



import { createPinia, setActivePinia } from "pinia";
import { createTestingPinia } from '@pinia/testing'
import { useUsersStore } from "../../stores/users";


describe('HomeView test', () => {

    vi.mock("@/router", () => {

        return {
            replace: vi.fn()
        };

    });

    test('HomeView rendered', () => {

        let wrapper = mount(HomeView, {

            shallow: true,

            global: {
                plugins: [createTestingPinia()],


            }

        })

        expect(wrapper).toBeTruthy();

        const store = useUsersStore();

    })
})