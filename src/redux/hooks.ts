import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState } from './reducers';
import { bindActionCreators } from 'redux';
// import { AppDispatch } from './store'
import * as UserActionCreators from './actionCreators/user'

// export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAction = () => {
    const dispatch = useDispatch();
    return bindActionCreators(UserActionCreators, dispatch)
};
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
