export const slideListHandler = (
  event: string,
  transform: number,
  limit: number,
  category: string,
  setTransform,
  setDisplayForward,
  setDisplayBack
) => {
  let count = transform;
  if (event === "forward") {
    const element = document.getElementById(`movies-container_${category}`)!;
    const lastChild = element.lastElementChild!;
    const lastChildPosition = lastChild.getBoundingClientRect().right;
    count -= limit;
    setTransform(count);
    if (lastChildPosition < innerWidth + limit) {
      setDisplayForward("none");
    } else {
      setDisplayBack("flex");
    }
  } else {
    count += limit;
    setTransform(count);
    if (count === 0 || count > limit) {
      setDisplayBack("none");
    } else {
      setDisplayForward("flex");
    }
  }
};
