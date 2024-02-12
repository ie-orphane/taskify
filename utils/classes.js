import { months } from "./datetime";

class Collection {
  constructor({ id, name, description, color, tasks, completedTasks, createdAt }) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.description = description;
    this.tasks = tasks;
    this.completedTasks = completedTasks;

    this.date = createdAt.toDate().toDateString().split(" ").slice(1, -1).join(" ");
    this._date = createdAt.toDate();

    console.log(this.name, this);
  }

  getProgressBar() {
    const percentage = (this.completedTasks / this.tasks.length) * 100 || 0;

    const full = parseInt(percentage / 20); // w-[100%] : full
    const rest = parseInt(percentage % 20); // w-[~%] : rest
    const none = 5 - Math.min(parseInt(percentage % 20), 1) - parseInt(percentage / 20); // w-0 : none

    return [
      ...Array.from({ length: full }, () => {
        return { width: "100%" };
      }),
      ...(rest != 0 ? [{ width: `${rest}%` }] : []),
      ...Array.from({ length: none }, () => {
        return { width: 0 };
      }),
    ];
  }
}

class Task {
  constructor({ id, collectionId, name, note, completed, date, start, end }) {
    this.id = id;
    this.collectionId = collectionId;
    this.name = name;
    this.note = note;
    this.completed = completed;

    this.date = `${date.toDate().getDate()} ${months[date.toDate().getMonth()]}`;
    this._date = date.toDate();

    this.start = start.toDate().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    this._start = start.toDate();

    this.end = end.toDate().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    this._end = end.toDate();
  }
}

export { Collection, Task };
