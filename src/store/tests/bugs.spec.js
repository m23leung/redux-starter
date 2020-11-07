import { addBug, bugAdded, getUnresolvedBugs } from '../bugs';
import { apiCallBegan } from '../api';
import configureStore from '../configureStore';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

// Unit testing grouping
// Arrange
// Act 
// Assert

describe('bugsSlice', () => {
    
    let fakeAxios;
    let store;

    beforeEach(() => {
        fakeAxios = new MockAdapter(axios);
        store = configureStore();
    })

    const bugsSlice = () => store.getState().entities.bugs;

    const createState = () => ({
        entities: {
            bugs: {
                list: []
            }
        }
    })


    it("should add the bug to the store if it's saved to the server", async () => {
        
        // Arrange
        const bug = { description: 'a' };
        const savedBug = { ...bug , id: 1 };
        fakeAxios.onPost('/bugs').reply(200, savedBug);

        // Act
        await store.dispatch(addBug(bug));

        // Assert
        //expect(store.getState().entities.bugs.list).toHaveLength(1);
        expect(bugsSlice().list).toContainEqual(savedBug);

    })
    
    it("should not add the bug to the store if it's not saved to the server", async () => {
        
        // Arrange
        const bug = { description: 'a' };

        fakeAxios.onPost('/bugs').reply(500);

        // Act
        store.dispatch(addBug(bug));

        // Assert
        //expect(store.getState().entities.bugs.list).toHaveLength(1);
        expect(bugsSlice().list).toHaveLength(0);

    })

/*
    describe('action creators', () => {
        it('addBug', () => {
            const bug = {description: 'a'};
            const result = addBug(bug)
            const expected = {
                type: apiCallBegan.type,
                payload: {
                    url: '/bugs',
                    method: 'post',
                    data: bug,
                    onSuccess: bugAdded.type
                }
            }
            expect(result).toEqual(expected);
        })
    })
    */
})

describe("selectors", () => {
    it("getUnresolvedBugs", () => {
        // AAA
        const state = createState();
        state.entities.bugs.list = [
            { id: 1, resolved: true },
            { id: 2 },
            { id: 3},
        ]

        const result = getUnresolvedBugs(state)

        expect(result).toHaveLength(2);
    })
})