/**
 * Sets up an Intersection Observer on the specified element. When the element intersects,
 * the callback is triggered.
 *
 * @function onIntersect
 * @param  {HTMLElement} elementToWatch - The element to observe. If not provided, the shown image will not be displayed.
 * @param  {function} callback - Callback function to execute when the element is intersecting.
 * @param  {Boolean} [once=true] - If true, the callback will only run once.
 * @param  {Object} [options={ threshold: 1 }] - Intersection Observer API options.
 * @return {IntersectionObserver} - The created Intersection Observer instance.
 */
export const onIntersect = (
    elementToWatch,
    callback,
    outCallback = () => {},
    once = true,
    options = { threshold: 1 }
  ) => {
    console.log("called onIntersect");
    // Initiate the observer
    const observer = new IntersectionObserver(([entry]) => {
        console.log("called observer");
        console.log("threshold", options.threshold);
      // If the element to watch is intersecting within the threshold
      if (entry && entry.isIntersecting) {
        // Run the callback
        callback(entry.target);
  
        // If the callback should only run once, unobserve the element
        if (once) {
          observer.unobserve(entry.target);
        }
      }
  
      // If the element is not intersecting, run the (optional) unintersecting callback
      else {
        outCallback(entry.target);
      }
    }, options);
  
    // Observe the element
    observer.observe(elementToWatch);
  
    // Returns the observer so it can be further used in the component
    return observer;
  };

  /*
export function toggleImageVisibility(entry) {
    console.log("called toggleImageVisibility");
    console.log("entry", entry);
  document.querySelectorAll("[data-img]").forEach(img => {
    img.classList.remove("show")
  })
  const img = document.querySelector(entry.target.dataset.imgToShow)
  img?.classList.add("show")
}
*/