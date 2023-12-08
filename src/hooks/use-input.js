import { useReducer } from "react";

const initialInputValue = {
    value: '',
    isTouched: false,
}

const inputStateReducer = (state, action) => {
    if(action.type === 'INPUT'){
        return {
            value: action.value,
            isTouched: state.isTouched,
        }
    }

    if(action.type === 'BLUR'){
        return {
            isTouched: true,
            value: state.value,
        }
    }

    if(action.type === 'RESET'){
        return {
            value: '',
            isTouched: false,
        }
    }
    return inputStateReducer;
}


const useInput = (validateInput) => {
    const [inputState, dispatch] = useReducer(inputStateReducer, initialInputValue);

    const isValid = validateInput(inputState.value);
    const hasError = !isValid && inputState.isTouched;

    const inputChangeHandler = (event) => {
        dispatch({type: 'INPUT', value: event.target.value})
    }

    const inputBlurHandler = (event) => {
        dispatch({type: 'BLUR'})
    }

    const inputResetHandler = (event) => {
        dispatch({type: 'RESET'})
    }

  return {
    value: inputState.value,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    inputResetHandler
  };
};

export default useInput;
