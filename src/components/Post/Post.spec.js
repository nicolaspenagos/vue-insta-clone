import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Post from './Post.vue';



import { createPinia, setActivePinia } from "pinia";
import { createTestingPinia } from '@pinia/testing'
import { useUsersStore } from "../../stores/users";


describe('Post test', () => {

    vi.mock("@/router", () => {

        return {
            replace: vi.fn()
        };

    });







    test('HomeView rendered', () => {

        let wrapper = mount(Post, {

            shallow: true,
            props: {
                post: {
                    "country": "Dark",
                    "date": "11.11.2011",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
                    "image": "https://firebasestorage.googleapis.com/v0/b/instagram-clone-7776a.appspot.com/o/images%2F4e9LnY7jakPxDHigZIqJh2JF4BY2%2Ff6ea41c2-3597-4016-837f-7aea79cbdee6?alt=media&token=3f154f07-8463-4c62-b88f-f07e2008af52",
                    "place": "Blue",
                    "postId": "f6ea41c2-3597-4016-837f-7aea79cbdee6"
                }
            },
            global: {
                plugins: [createTestingPinia()],


            }

        })

        expect(wrapper).toBeTruthy();
        const store = useUsersStore();

    })
})