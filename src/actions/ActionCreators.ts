import actions from "./Actions";
import { GetActionTypes, createAction } from "../utils/actionCreator";
const ActionCreators = {
  addComment: (arg) => createAction(actions.ADD_COMMENT, {}, arg),
  addReply: (arg) => createAction(actions.ADD_REPLY, {}, arg),
  deleteComment: (arg) => createAction(actions.DELETE_COMMENT, {}, arg),
  editComment: (arg) => createAction(actions.EDIT_COMMENT, {}, arg),
};

export default ActionCreators;

export type ActionObjectTypes<
  K extends keyof typeof ActionCreators
> = GetActionTypes<Pick<typeof ActionCreators, K>>;

export type AllObjectTypes = GetActionTypes<typeof ActionCreators>;
