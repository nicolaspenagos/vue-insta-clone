import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LoginModule from './LoginModule.vue';



import { createPinia, setActivePinia } from "pinia";
import { createTestingPinia } from '@pinia/testing'
import { useUsersStore } from "../../stores/users";


describe('LoginPhoto test', () => {


    vi.mock("../../stores/users", () => {

        return {
            replace: vi.fn()
        };

    });


    vi.mock("../../stores/authentication", () => {

        return {
            replace: vi.fn()
        };

    });







    test('LoginModule rendered', () => {

        let wrapper = mount(LoginModule, {

            shallow: true,

            global: {
                plugins: [createTestingPinia()],


            }

        })

        expect(wrapper).toBeTruthy();

        const store = useUsersStore();

    })
})