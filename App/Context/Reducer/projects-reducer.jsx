import { Classes } from "../../utils";

const projectsData = [
  {
    id: "0p1245",
    name: "Crypto Wallet Redesign",
    tasks: ["0t1257", "0t5212", "0t6354", "0t3621", "0t7850"],
    completed: 4,
    color: "#f59e0b",
    date: "Jan 27",
    _date: {
      day: 29,
      month: 2,
      year: 2024,
    },
  },
  {
    name: "Buxica Dribble Team",
    tasks: ["0t1257", "0t5212", "0t6354"],
    completed: 1,
    color: "#8b5cf6",
    date: "Jan 19",
    _date: {
      day: 16,
      month: 1,
      year: 2024,
    },
  },
];

const name = "Projects";

const reducer = (state, action) => {
  switch (action.type) {
    case "new":
      return [action.value, ...state];
    default:
      throw new Error(`${name} reducer : undefiened action type: ${action.type}`);
  }
};

const initializer = projectsData.map((data) => new Classes.Project(data));

export { name, reducer, initializer };
