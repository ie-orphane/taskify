class Collection {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.color = data.color;

    // date time
    const datetime = data.datetime.toDate();
    this.date = datetime.toDateString().split(" ").slice(1, -1).join(" ");
    this._date = {
      day: datetime.getDate(),
      month: datetime.getMonth(),
      year: datetime.getFullYear(),
    };

    // progress bar
    const percentage = (data.completed / data.tasks.length) * 100 || 0;
    if (percentage > 100) throw new Error("percentage is greater then 100%");

    const full = parseInt(percentage / 20); // w-[100%] : full
    const rest = parseInt(percentage % 20); // w-[~%] : rest
    const none = 5 - Math.min(parseInt(percentage % 20), 1) - parseInt(percentage / 20); // w-0 : none

    this.bar = [
      ...Array.from({ length: full }, () => {
        return { width: "100%" };
      }),
      ...(rest != 0 ? [{ width: `${rest}%` }] : []),
      ...Array.from({ length: none }, () => {
        return { width: 0 };
      }),
    ];
    this.per = parseInt(percentage);
  }
}

class Task {
  constructor(data) {
    console.log(data);
  }
}

export { Collection, Task };
