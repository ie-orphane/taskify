class Project {
  constructor(data) {
    this.name = data.name;
    this.color = data.color;
    this.date = data.date;

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

export { Project };
