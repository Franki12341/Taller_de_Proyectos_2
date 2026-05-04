function toMinutes(value) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function overlaps(a, b) {
  return a.day === b.day && toMinutes(a.start) < toMinutes(b.end) && toMinutes(b.start) < toMinutes(a.end);
}

function contains(container, slot) {
  return (
    container.day === slot.day &&
    toMinutes(container.start) <= toMinutes(slot.start) &&
    toMinutes(container.end) >= toMinutes(slot.end)
  );
}

module.exports = {
  contains,
  overlaps,
  toMinutes
};
