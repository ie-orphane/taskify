import * as TASK from "./task-action";
import * as COLLECTION from "./collection-action";

const initializer = {
  task: TASK.initializer,
  collection: COLLECTION.initializer,
};

const reducer = (state, { target, type, payload }) => {
  return {
    task: target == "Task" ? TASK.reducer(state.task, { type, payload }) : state.task,
    collection:
      target == "Collection"
        ? COLLECTION.reducer(state.collection, { type, payload })
        : state.collection,
  };
};

export { reducer, initializer };
