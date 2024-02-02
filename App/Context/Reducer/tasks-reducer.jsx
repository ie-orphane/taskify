const name = "Tasks";

const reducer = (state, {type, value}) => {
  switch (type) {
    case "completed":
      const current = state.find(item => item.id == value)
      current.completed = !current.completed;
      return [...state];
    case "new":
      return [value, ...state];
    default:
      throw new Error(`${name} reducer : undefiened action type: ${type}`);
  }
};

const initializer = [
  {
    id: 0,
    name: "Client Review & Feedback",
    description: "get client reviews and feedbacks",
    collection: "Crypto Wallet Redesign",
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
    id: 1,
    name: "Review with Client",
    description: "get client reviews and feedbacks",
    collection: "Buxica Dribble Team",
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
    id: 2,
    name: "Review with Client",
    description: "get client reviews and feedbacks",
    collection: "Buxica Dribble Team",
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
