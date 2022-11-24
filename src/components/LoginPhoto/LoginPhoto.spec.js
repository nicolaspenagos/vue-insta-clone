import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LoginPhoto from "./LoginPhoto.vue";



import { createPinia, setActivePinia } from "pinia";
import { createTestingPinia } from '@pinia/testing'
import { useUsersStore } from "../../stores/users";


describe('LoginPhoto test', () => {

    vi.mock("@/router", () => {

        return {
            replace: vi.fn()
        };

    });







    test('HomeView rendered', () => {

        let wrapper = mount(LoginPhoto, {

            shallow: true,

            global: {
                plugins: [createTestingPinia()],


            }

        })

        expect(wrapper).toBeTruthy();

        const store = useUsersStore();

    })
})