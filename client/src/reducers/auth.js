
const initialState = {
    isAuthenticated: null,
} 

export default function (state = initialState, action) {
    const {type, payload} = action
    
    switch (type) {

        default:
            return {...state}      
    }
}
