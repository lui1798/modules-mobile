/**
 * 单引导
 * @param {*} title
 * @param {*} desc
 * @param {*} element
 */
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
const guide = {
  singleGuide(title, desc, element) {
    const driver = new Driver({
      opacity: 0.5,
      stageBackground: "#ffffff",
    });
    driver.highlight({
      element: element,
      popover: {
        title: title,
        description: desc,
        offset: 20,
        // position: "left"
      },
    });
  },
  nextGuide(stepObjArrayP, element) {
    const driver = new Driver({
      opacity: 0.5,
      stageBackground: "#ffffff",
    });
    let stepObj = "";
    let stepObjArray = [];
    stepObjArrayP.forEach(soa => {
      stepObj = {
        element: element,
        popover: {
          title: "",
          description: "",
          position: "top",
        },
      };
      stepObj.element = soa.element;
      stepObj.title = soa.title;
      stepObj.desc = soa.desc;
      stepObj.position = soa.position;
      stepObjArray.push(stepObj);
    });
    // Define the steps for introduction
    driver.defineSteps(stepObjArray);

    // Start the introduction
    driver.start();
  },
};

export default guide;
