import { useEffect, useReducer } from "react"

const ACTIONS = {
    LOADING: "LOADING",
    FAILURE: "FAILURE",
    SUCCESS: "SUCCESS"
}


function fetchReducer(state, action){
    const { type, payload} = action

    switch(type){
        case ACTIONS.LOADING:
            return {...state, loading: true, error: null, data: null}
        case ACTIONS.FAILURE:
            return {...state, loading: false, error: payload, data: null}
        case ACTIONS.SUCCESS: 
            return {...state, loading: false, error: null, data: payload}
        default:
            return state    
    }
} 

const initialValues = {
    loading: false,
    error: null,
    data: null
}


export default function usePosts(fetchFunction, param){
    const [state, dispatch] = useReducer(fetchReducer, initialValues)
    useEffect(() => {
        dispatch({type: ACTIONS.LOADING})
        const getData = async() => {
            try {
                const apiData = await fetchFunction(param)
                dispatch({type: ACTIONS.SUCCESS, payload: apiData})
            } catch(err) {
                dispatch({type: ACTIONS.FAILURE, payload: err})
            }
        }
        getData()
    }, [fetchFunction, param])

    return { 
        loading: state.loading,
        data: state.data,
        error: state.error
    }
}