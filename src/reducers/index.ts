import { combineReducers } from "redux";
import { ReducerMappedState } from "../utils/actionCreator";
import actions from "../actions/Actions";
import createReducer from "../utils/createReducer";
import {
  addCommentUtil,
  addReplyUtil,
  deleteCommentUtil,
  editCommentUtil
} from "../utils/reducerUtils";

export const allComments = createReducer<actions.ADD_COMMENT>(
  [actions.ADD_COMMENT, actions.ADD_REPLY, actions.DELETE_COMMENT, actions.EDIT_COMMENT],
  [addCommentUtil, addReplyUtil, deleteCommentUtil, editCommentUtil]
);

export const reducers = {
  allComments,
};

export type CommonState = ReducerMappedState<typeof reducers>;
export default combineReducers<CommonState>(reducers);
