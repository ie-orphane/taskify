const name = "Tasks";

const reducer = (state, action) => {
  switch (action.type) {
    case "completed":
      state[action.index].completed = action.value;
      return [...state];
    case "new":
      return [...state, action.value];
    default:
      throw new Error(`undefiened action type: ${action.type}`);
  }
};

const initializer = [
  {
    id: "0t0002",
    name: "Client Review & Feedback",
    description: "get client reviews and feedbacks",
    project: {
      id: "0p0001",
      name: "Crypto Wallet Redesign",
    },
    completed: true,
    start: "10:00 PM",
    end: "11:45 PM",
    date: "1 February",
    _date: {
      day: 2,
      month: 2,
      year: 2024,
    },
  },
  {
    id: "0t0001",
    name: "Review with Client",
    description: "get client reviews and feedbacks",
    project: {
      id: "0p0001",
      name: "Buxica Dribble Team",
    },
    completed: false,
    start: "10:00 PM",
    end: "11:45 PM",
    date: "29 January",
    _date: {
      day: 1,
      month: 1,
      year: 2024,
    },
  },
  {
    id: "0t0000",
    name: "Review with Client",
    description: "get client reviews and feedbacks",
    project: {
      id: "0p0001",
      name: "Buxica Dribble Team",
    },
    completed: false,
    start: "10:00 PM",
    end: "11:45 PM",
    date: "29 January",
    _date: {
      day: 29,
      month: 1,
      year: 2024,
    },
  },
];

export { name, reducer, initializer };
