document.body.onmousemove = (e) => {
  for (const date of document.getElementsByClassName("box")) {
    const rect = date.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;

    date.style.setProperty("--mouse-x", `${x}px`);
    date.style.setProperty("--mouse-y", `${y}px`);
  }
};
