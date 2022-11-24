import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi, vitest } from "vitest";
import Modal from "./Modal.vue";



import { createPinia, setActivePinia } from "pinia";
import { createTestingPinia } from '@pinia/testing'
import { useUsersStore } from "../../stores/users";


describe('HomeView test', () => {

    vi.mock("@/router", () => {

        return {
            replace: vi.fn()
        };

    });

    vi.mock("../../stores/users", () => {

        return {
            replace: vi.fn()
        };

    });

    test('Modal rendered', () => {

        let wrapper = mount(Modal, {

            shallow: true,

            global: {
                plugins: [createTestingPinia({
                    createSpy: vitest.fn
                })],


            }

        })

        expect(wrapper).toBeTruthy();

        const store = useUsersStore();

    })
})